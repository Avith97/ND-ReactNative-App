import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Alert, FlatList, Clipboard, Dimensions, Platform } from 'react-native';
import { aggregateGroupByDuration, aggregateRecord, initialize, insertRecords, readRecords, requestPermission } from 'react-native-health-connect';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icons, { iconType } from './src/assets/icons/Icons';
import { wp } from './src/common/functions/dimensions';


const HealthScreen = (props) => {
    const [steps, setSteps] = useState(null);
    const [t_steps, setT_Steps] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [chartData, setchartData] = useState([])
    const [heartRate, setHeartRate] = useState(null);
    const [sleepData, setSleepData] = useState(null);
    // const [loading, setLoading] = useState(false);
    const [allData, setallData] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment().toDate());

    useEffect(() => {
        requestHealthPermissions();
    }, []);

    const setLoading = (val) => {
        props?.handleLoading &&
            props?.handleLoading(val)
    }

    // Request Health Permissions
    const requestHealthPermissions = async () => {
        if (Platform.OS === 'ios') {
            return
        }
        await initialize()
        try {
            const granted = await requestPermission([
                { accessType: 'read', recordType: 'Steps' },
                { accessType: 'read', recordType: 'Weight' },
                { accessType: 'read', recordType: 'Height' }
            ])

            // const Steps = await readRecords('Steps', {
            //     timeRangeFilter: {
            //         operator: "between",  // Can be "after", "before", or "between"
            //         startTime: moment().startOf('day').subtract(1, 'days').toISOString(), // 7 days ago
            //         // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            //         endTime: moment().endOf('day').subtract(1, 'days').toISOString(),
            //         // startTime: new Date().toISOString(), // Current time
            //         // endTime: new Date().toISOString(), // Current time
            //     }
            // });
            // const formattedData = Steps?.records?.map((record, index) => ({
            //     x: moment(record.startTime).format('HH:mm'), // Format time as HH:mm
            //     y: record.count, // Number of steps
            // }));
            // setchartData(formattedData)
            await fetchSteps(selectedDate)
            // console.log('steps 11 ===>', Steps?.records)
            const Height = await readRecords('Height', {
                timeRangeFilter: {
                    operator: "before",  // Can be "after", "before", or "between"
                    // startTime: moment().startOf('day').subtract(1, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().endOf('day').toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });
            setHeight(Height?.records[0]?.height.inFeet)
            console.log('height ===>', Height?.records)
            const Weight = await readRecords('Weight', {
                timeRangeFilter: {
                    operator: "before",  // Can be "after", "before", or "between"
                    // startTime: moment().startOf('day').subtract(1, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().endOf('day').toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });
            setWeight(Weight?.records[0]?.weight?.inKilograms)
            // const granted = await requestPermission([
            //     { 'accessType': 'read', 'recordType': 'Steps' },
            // ])
            // console.log('Permissions granted:', { granted });
        } catch (error) {
            console.error('Permission error:', error);
            // const url = "package:com.google.android.apps.healthdata"; // Health Connect package name
            // Linking.openSettings();
            // Linking.openURL('androidx.health.connect.action.HEALTH_CONNECT_SETTINGS')
            // openHealthConnectSettings()
            // const { HealthConnectModule } = NativeModules;
            // HealthConnectModule.requestPermissions()
            // HealthConnectModule.openHealthConnectSettings();
            // HealthConnectModule.openHealthConnectPermissions();
            // HealthConnectModule.openHealthConnectPage();
            // HealthConnectModule.requestHealthConnectPermissions();

            // Linking.openURL("android-app://com.google.android.apps.healthdata")
            // Linking.openURL("android.settings.HEALTH_CONNECT_SETTINGS");
            //             // Alert.alert(
            //     'Kindly Allow the Health Connect Permissions',
            //     [
            //         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            //         { text: 'Allow', onPress: () => { Linking.openSettings() } }
            //     ]
            // );
            // Linking.openURL('android.settings.HEALTH_CONNECT_SETTINGS')
            // openHealthConnectSettings()
            // Linking.openSettings()
            // Alert.alert('Error', 'Failed to get health permissions');
        }
    };

    // Fetch Steps
    const getSteps = async () => {
        try {
            // await requestHealthPermissions()
            setLoading(true);
            // const response = await readRecords('Steps');
            const response = await readRecords('Steps', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });
            console.log('steps ===>', response.records)
            // const response = await readRecords({
            //     recordType: 'Steps',
            //     timeRangeFilter: {
            //         operator: 'between',
            //         startTime: new Date(new Date().setHours(0, 0, 0, 0)), // Start of the day
            //         endTime: new Date(),
            //     },
            // });
            if (response?.records) {
                const maxCount = Math.max(...response.records.map(record => record.count));
                setSteps(maxCount);
            }

        } catch (error) {
            console.error('Error fetching steps:', error);
            Alert.alert('Error', 'Failed to fetch steps data');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Heart Rate
    const getHeartRate = async () => {
        try {
            setLoading(true);
            const response = await readRecords('Weight', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(1, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });
            console.log('heart rate -->', response.records[0]?.weight?.inKilograms)
            setHeartRate(response ? response.records[0]?.weight.inKilograms : 'No Data');
        } catch (error) {
            console.error('Error fetching heart rate:', error);
            Alert.alert('Error', 'Failed to fetch heart rate data');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Sleep Data
    const getSleepData = async () => {
        try {
            setLoading(true);
            const response = await readRecords('SleepSession', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: moment().subtract(1, 'days').toISOString(), // Start of the day
                    endTime: moment().toISOString()
                },
            });
            // const response = await readRecords('SleepSession', {
            //     timeRangeFilter: {
            //         operator: 'between',
            //         startTime: moment().subtract(1, 'days').toISOString(), // Start of the day
            //         endTime: moment().toISOString()
            //     },
            // });
            console.log('sleep sleep data -->', JSON.stringify(response))
            setSleepData({
                startTime: response?.records[0]?.startTime,
                endTime: response?.records[0]?.endTime
            })
            // setSleepData(response.length > 0 ? response[0].duration / 3600000 : 'No Data'); // Convert ms to hours
        } catch (error) {
            console.error('Error fetching sleep data:', error);
            Alert.alert('Error', 'Failed to fetch sleep data');
        } finally {
            setLoading(false);
        }
    };

    const getAllData = async () => {
        setLoading(true)
        try {
            const stepsResponse = await readRecords('Steps', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });

            const heartRateResponse = await readRecords('HeartRate', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });

            const sleepDataResponse = await readRecords('SleepSession', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });

            const weightResponse = await readRecords('Weight', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    // startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                    // startTime: new Date().toISOString(), // Current time
                    // endTime: new Date().toISOString(), // Current time
                }
            });

            const heightResponse = await readRecords('Height', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                }
            });

            const bodyFatResponse = await readRecords('BodyFat', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                }
            });

            const calorieResponse = await readRecords('TotalCaloriesBurned', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                }
            });

            const distanceResponse = await readRecords('Distance', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                }
            });

            const speedResponse = await readRecords('Speed', {
                timeRangeFilter: {
                    operator: "between",  // Can be "after", "before", or "between"
                    startTime: moment().subtract(7, 'days').toISOString(), // 7 days ago
                    endTime: moment().toISOString(),
                }
            });

            const obj = {
                steps: stepsResponse?.records,
                heartRate: heartRateResponse?.records[0]?.samples[0]?.beatsPerMinute,
                sleepData: sleepDataResponse?.records[0]?.startTime ? moment(sleepDataResponse?.records[0]?.startTime).format('DD/MM/YYYY hh:mm:ss A') + moment(sleepDataResponse?.records[0]?.endTime).format('DD/MM/YYYY hh:mm:ss A') : 'No Data',
                weight: weightResponse?.records[0]?.weight?.inKilograms,
                height: heightResponse?.records[0]?.height?.inFeet,
                bodyFat: bodyFatResponse?.records[0]?.percentage,
                calorie: calorieResponse?.records,
                distance: distanceResponse?.records,
                speed: speedResponse?.records
            }
            setallData({ ...obj })
            // const obj = {
            //     steps: stepsResponse?.records[0]?.count,
            //     heartRate: heartRateResponse?.records[0]?.samples[0]?.beatsPerMinute,
            //     sleepData: sleepDataResponse?.records[0]?.startTime ? moment(sleepDataResponse?.records[0]?.startTime).format('DD/MM/YYYY hh:mm:ss A') + moment(sleepDataResponse?.records[0]?.endTime).format('DD/MM/YYYY hh:mm:ss A') : 'No Data',
            //     weight: weightResponse?.records[0]?.weight?.inKilograms,
            //     height: heightResponse?.records[0]?.height?.inFeet,
            //     bodyFat: bodyFatResponse?.records[0]?.percentage,
            //     calorie: calorieResponse?.records[0]?.energy?.inCalories,
            //     distance: distanceResponse?.records[0]?.distance?.inMeters,
            //     speed: speedResponse?.records[0]?.samples[0]?.speed?.inMilesPerHour
            // }

            const { steps, ...restData } = obj; // Exclude 'steps' from obj
            // Alert.alert('All Data', JSON.stringify(restData));
            Alert.alert(
                'All Data',
                JSON.stringify(restData),
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'Copy', onPress: () => Clipboard.setString(JSON.stringify(restData)) }
                ]
            );


            console.log('all data -->',
                // JSON.stringify(stepsResponse.records),
                //     heartRateResponse.records[0]?.samples[0]?.beatsPerMinute,
                //     sleepDataResponse.records[0].startTime,
                //     weightResponse.records[0].weight.inKilograms,
                //     heightResponse.records[0].height.inFeet,
                //     bodyFatResponse.records[0].percentage,
                //     calorieResponse.records[0].energy.inCalories,
                //     distanceResponse.records[0].distance.inMeters,
                //     speedResponse.records[0].samples[0].speed.inMilesPerHour
            )



        } catch (error) {
            console.log('getAllData Error ===>', error)
            Alert.alert('Error', 'Failed to fetch all data')
        } finally {
            setLoading(false)
        }
    }

    const renderSteps = ({ item, i }) => {
        // console.log('item -->', item)
        return (
            <View style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'red',
                padding: 2
            }}>
                {/* <Text>{i}</Text> */}
                <Text>Steps: {item.count}</Text>
                <Text>startTime: {moment(item.startTime).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                <Text>endTime: {moment(item.endTime).format('DD/MM/YYYY hh:mm:ss A')}</Text>
            </View>
        )
    }

    const fetchSteps = async (date) => {
        if (Platform.OS === 'ios') {
            return
        }
        setLoading(true);
        try {
            const response = await readRecords('Steps', {
                timeRangeFilter: {
                    operator: "between",
                    startTime: moment(date).startOf('day').toISOString(),
                    endTime: moment(date).endOf('day').toISOString(),
                }
            });

            const agv = await aggregateRecord({
                recordType: 'Steps',
                timeRangeFilter: {
                    operator: 'between',
                    startTime: moment(date).startOf('day').toISOString(),
                    endTime: moment(date).endOf('day').toISOString(),
                },
                timeRangeSlicer: {
                    duration: 'DAYS',
                    length: 1,
                },
            })
            setT_Steps(agv)
            console.log('step resp -->', JSON.stringify(agv))
            // Group steps per hour
            const hourlySteps = {};

            response?.records?.forEach((record) => {
                const hour = moment(record.startTime).format('HH:00'); // Round to the hour
                hourlySteps[hour] = (hourlySteps[hour] || 0) + record.count;
            });

            // Convert grouped data to an array for the chart
            const formattedData = Object.keys(hourlySteps).map((hour) => ({
                x: hour,
                y: hourlySteps[hour],
            }));

            setchartData(formattedData);
        } catch (error) {
            console.error('Error fetching steps:', error);
            Alert.alert('Error', 'Failed to fetch steps data');
        } finally {
            setLoading(false);
        }
    };


    const writeStepsData = async (stepsCount) => {
        if (Platform.OS === 'ios') {
            return
        }
        try {
            const endTime = moment().toDate().toISOString(); // Current time
            const startTime = moment().subtract(30, 'seconds').toDate().toISOString(); // 30 min ago

            const stepData =
            {
                count: '1100',
                startTime,
                endTime
            }


            // await insertRecords([{
            //     recordType: 'Steps',

            //     startTime,
            //     endTime
            // }]);
            await insertRecords([{
                recordType: 'Steps',
                count: 1100,
                startTime: startTime,
                endTime: endTime
            }])
            // await insertRecords('Steps', stepData);
            console.log(`Successfully wrote ${stepsCount} steps to Health Connect.`);
        } catch (error) {
            console.error('Error writing steps data:', error);
        }
    };

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date) => {
        setSelectedDate(date);
        fetchSteps(date);
        hideDatePicker();
    };

    const fetchStepsByDate = async (date) => {
        setLoading(true);
        try {
            const response = await readRecords('Steps', {
                timeRangeFilter: {
                    operator: "before",
                    endTime: moment(date).endOf('day').toISOString(),
                }
            });

            // Group steps by date
            const stepsByDate = response?.records?.reduce((acc, record) => {
                const recordDate = moment(record.startTime).format('DD-MM-YYYY'); // Extract date
                if (!acc[recordDate]) {
                    acc[recordDate] = 0;
                }
                acc[recordDate] += record.count; // Sum steps for that date
                return acc;
            }, {});

            // Convert grouped data into an array sorted by date
            const formattedData = Object.keys(stepsByDate)
                .sort((a, b) => moment(b).valueOf() - moment(a).valueOf()) // Sort by latest date first
                .map((date) => ({
                    date,
                    totalSteps: stepsByDate[date],
                }));

            setSteps(formattedData); // Store in state
        } catch (error) {
            console.error('Error fetching steps:', error);
            Alert.alert('Error', 'Failed to fetch steps data');
        } finally {
            setLoading(false);
        }
    };



    return (
        <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Health Data</Text>

            {/* {loading ? <ActivityIndicator size="large" color="blue" /> : null} */}

            {/* <Button title="Fetch Steps" onPress={getSteps} />
            <Text style={{ marginVertical: 10, fontSize: 18 }}>Steps: {steps !== null ? steps : 'Press button'}</Text>

            <Button title="Fetch Weight" onPress={getHeartRate} />
            <Text style={{ marginVertical: 10, fontSize: 18 }}>Weight: {heartRate !== null ? heartRate + ' Kgs' : 'Press button'}</Text>

            <Button title="Fetch Sleep Data" onPress={getSleepData} />
            <Text style={{ marginVertical: 10, fontSize: 18, textAlign: 'center' }}>Sleep:
                {sleepData ? moment(sleepData.startTime).format('DD/MM/YYYY hh:mm:ss A') + '\nTo\n ' + moment(sleepData.endTime).format('DD/MM/YYYY hh:mm:ss A')
                    : 'Press button'}
            </Text>*/}
            {/* <Button title="Fetch All Data" onPress={getAllData} />  */}
            {/* <Button title="Fetch All Data" onPress={fetchStepsByDate} />  */}
            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }} >
                <View>
                    <Text style={{ borderWidth: 0.2, padding: 6 }}>Weight :</Text>
                    <Text style={{ borderWidth: 0.2, borderTopWidth: 0, padding: 6 }}>Height :</Text>
                </View>
                <View>
                    <Text style={{ borderWidth: 0.2, borderStartWidth: 0, padding: 6 }}>{`${weight} Kg` || 'Not Available'}</Text>
                    <Text style={{ borderWidth: 0.2, borderStartWidth: 0, borderTopWidth: 0, padding: 6 }}>{`${height} ft` || 'Not Available'}</Text>
                </View>
            </View>
            <Button title="Add 1100 steps" onPress={writeStepsData} />
            <View style={{ marginVertical: 6 }}>
                <Text onPress={showDatePicker}
                    style={{ textAlign: 'center', borderWidth: 0.9, borderColor: 'red', borderRadius: 10, marginVertical: 5, padding: 10, fontSize: 12 }}
                >
                    Selected Date: {moment(selectedDate).format('DD/MM/YYYY')}
                </Text>
                {/* <Icons type={iconType.fa5} name={'walking'} size={24} /> */}
                <Button title="Select Date" onPress={showDatePicker} />
                <DateTimePicker
                    date={selectedDate}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <Text
                style={{ textAlign: 'center', borderWidth: 0.5, borderColor: 'green', borderRadius: 10, marginVertical: 5, padding: 10, fontSize: 12 }}
            >
                Total Steps: {t_steps?.COUNT_TOTAL || "Not Available"}
            </Text>
            <RenderChart chartData={chartData} />

            {/* {allData && allData?.steps &&
                <FlatList
                    // data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}
                    data={allData?.steps}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSteps}
                    ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
                />
            } */}
            {chartData &&
                <FlatList
                    data={chartData}
                    keyExtractor={(_, i) => i}
                    ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', borderRadius: 5, elevation: 4, padding: 10, width: Dimensions.get('screen').width - 90, backgroundColor: '#f3f3f3' }}>
                            <View style={{ borderRadius: 100, height: wp(10), width: wp(10), marginRight: wp(3), backgroundColor: 'rgba(132, 140, 207,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                                <Icons type={iconType.fa5} name={'walking'} size={18} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment(selectedDate).format('ddd DD-MMM-YY  ') + item.x}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icons type={iconType.materialCommunity} name={'shoe-sneaker'} size={20} style={{ transform: [{ rotate: '-20deg' }] }} />
                                    <Text style={{
                                        marginLeft: wp(1),
                                        fontSize: 13, color: 'gray', textAlignVertical: 'center',

                                    }}>
                                        {item.y}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 15
                    }}
                    style={{
                        flex: 1,
                        // backgroundColor: 'green',
                        paddingVertical: 5,
                        paddingBottom: 13
                    }}
                />
            }

        </ScrollView>
    );
};

export default HealthScreen;

const RenderChart = ({ chartData }) => {
    return (
        <VictoryChart domainPadding={{ x: 20 }} theme={VictoryTheme.material} >
            {/* X-axis for time labels */}
            <VictoryAxis tickFormat={(tick) => tick} />

            {/* Y-axis for step count */}
            <VictoryAxis dependentAxis />

            {/* Bar chart */}
            <VictoryBar
                // animate={{ easing: 'linear' }}
                animate={{ duration: 1000, }}
                data={chartData}
                barWidth={3}
                // animate={}
                style={{
                    data: {
                        fill: ({ datum }) => datum.y > 100 ? '#3498db' : datum.y > 30 ? 'orange' : 'red',
                        stroke: '#000',
                        colorScheme: 'cyan'
                        // strokeWidth: 1, // Adds a border
                    },
                }}
            />
        </VictoryChart>
    )
}
