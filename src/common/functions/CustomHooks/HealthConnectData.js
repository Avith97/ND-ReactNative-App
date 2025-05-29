import moment from 'moment';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { aggregateRecord, readRecords } from 'react-native-health-connect';

export default function useHealthConnectData() {
    const [healthConnectData, setHealthConnectData] = useState({
        todaySteps: null,
        yesterdaySteps: null,
        weekSteps: null,
        todayDistance: null,
        todayBurnedCalories: null,
    });

    const fetchTodaySteps = useCallback(async () => {
        if (Platform.OS === 'ios') return;
        try {
            const today = moment();
            const agv = await aggregateRecord({
                recordType: 'Steps',
                timeRangeFilter: {
                    operator: 'between',
                    startTime: today.startOf('day').toISOString(),
                    endTime: today.endOf('day').toISOString(),
                },
                timeRangeSlicer: { duration: 'DAYS', length: 1 },
            });
            setHealthConnectData(prev => ({
                ...prev,
                todaySteps: agv,
            }));
        } catch (error) {
            console.error('Error fetching today steps:', error);
        }
    }, []);

    const fetchYesterdaySteps = useCallback(async () => {
        if (Platform.OS === 'ios') return;
        try {
            const yesterday = moment().subtract(1, 'day');
            const agv = await aggregateRecord({
                recordType: 'Steps',
                timeRangeFilter: {
                    operator: 'between',
                    startTime: yesterday.startOf('day').toISOString(),
                    endTime: yesterday.endOf('day').toISOString(),
                },
                timeRangeSlicer: { duration: 'DAYS', length: 1 },
            });
            setHealthConnectData(prev => ({
                ...prev,
                yesterdaySteps: agv,
            }));
        } catch (error) {
            console.error('Error fetching yesterday steps:', error);
        }
    }, []);

    const fetchWeekSteps = useCallback(async () => {
        if (Platform.OS === 'ios') return;
        try {
            const start = moment().subtract(6, 'days').startOf('day');
            const end = moment().endOf('day');
            const agv = await aggregateRecord({
                recordType: 'Steps',
                timeRangeFilter: {
                    operator: 'between',
                    startTime: start.toISOString(),
                    endTime: end.toISOString(),
                },
                timeRangeSlicer: { duration: 'DAYS', length: 7 },
            });
            setHealthConnectData(prev => ({
                ...prev,
                weekSteps: agv,
            }));
        } catch (error) {
            console.error('Error fetching week steps:', error);
        }
    }, []);

    const fetchTodayDistance = useCallback(async () => {
        if (Platform.OS === 'ios') return;
        try {
            const today = moment();
            const agv = await aggregateRecord({
                recordType: 'Distance',
                timeRangeFilter: {
                    operator: 'between',
                    startTime: today.startOf('day').toISOString(),
                    endTime: today.endOf('day').toISOString(),
                },
                timeRangeSlicer: { duration: 'DAYS', length: 1 },
            });

            const records = await readRecords('Distance', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: today.startOf('day').toISOString(),
                    endTime: today.endOf('day').toISOString(),
                },
            });

            let totalDurationMinutes = 0;
            records?.records?.forEach(record => {
                if (record.startTime && record.endTime) {
                    totalDurationMinutes += moment(record.endTime).diff(moment(record.startTime), 'minutes');
                }
            });

            setHealthConnectData(prev => ({
                ...prev,
                todayDistance: {
                    ...agv,
                    totalDurationMinutes,
                },
            }));
        } catch (error) {
            console.error('Error fetching today distance:', error);
        }
    }, []);

    const fetchTodayBurnedCalories = useCallback(async () => {
        if (Platform.OS === 'ios') return;
        try {
            const today = moment();
            let avg = await aggregateRecord({
                recordType: 'ActiveCaloriesBurned',
                timeRangeFilter: {
                    operator: 'between',
                    startTime: today.startOf('day').toISOString(),
                    endTime: today.endOf('day').toISOString(),
                },
                timeRangeSlicer: { duration: 'DAYS', length: 1 },
            });
            setHealthConnectData(prev => ({
                ...prev,
                todayBurnedCalories: avg,
            }));
        } catch (error) {
            console.error('Error fetching today burned calories:', error);
        }
    }, []);

    const fetchAllData = useCallback(async () => {
        await Promise.all([
            fetchTodaySteps(),
            fetchYesterdaySteps(),
            fetchWeekSteps(),
            fetchTodayDistance(),
            fetchTodayBurnedCalories(),
        ]);
    }, [
        fetchTodaySteps,
        fetchYesterdaySteps,
        fetchWeekSteps,
        fetchTodayDistance,
        fetchTodayBurnedCalories,
    ]);

    return { fetchAllData, healthConnectData };
}
