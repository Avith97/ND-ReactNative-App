import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import HomeScreenUI from './HomeScreenUI';
import { Images } from '../../../utils/constants/Images';
import { hp } from '../../../common/functions/dimensions';
import ConsentScreen from '../../consentscreen/ConsentScreen';
import Strings from '../../../utils/constants/Strings';
import HealthScreen from '../../../../Healthconnect';
import { initialize, requestPermission } from 'react-native-health-connect';
import useHealthConnectData from '../../../common/functions/CustomHooks/HealthConnectData';

export default function HomeScreen(props) {
  const { isLoggedIn } = props.route.params;

  const [loading, setLoading] = useState(false);



// Custom hook to fetch health connect data
  const  {healthConnectData , fetchAllData} = useHealthConnectData();

// Initialize Health Connect and request permissions
  const requestHealthPermissions = useCallback(async () => {
    if (Platform.OS === 'ios') return;
    await initialize();
    try {
      await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'Distance' },
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      ]);
      await fetchAllData();
    } catch (error) {
      console.error('Permission error:', error);
    }
  }, []);

  const handleNavigate = (isProgram, registered) => {
    if (!registered) {
      props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
        IsRegistered: registered,
      });
    } else {
      if (isProgram === Strings.NAVIGATION.submitresponse) {
        props.navigation.navigate(Strings.NAVIGATION.submitresponse);
      } else if (isProgram) {
        props.navigation.navigate(Strings.NAVIGATION.programdetail, {
          IsRegistered: registered,
        });
      } else {
        props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
          IsRegistered: registered,
        });
      }
    }
  };

  // constant data
  const [options] = useState({
    ongoingEvents: true,
    //  notResponding:true,
    Challenges: [
      {
        title: 'Zero Sugar Challenge',
        points: 180,
        badge: 2,
        responseReceived: [{}],
      },
    ],
    Events: [
      {
        title: 'Step Challenge',
        image: Images.runner_bg_image,
        todayStepsCount: 1487,
        yesterdayStepsCount: 1677,
        weeklyStepsCount: 23477,
        totalCalories: 1086,
        distance: 12,
        completionTime: 204,
        registered: false,
        started: false,
        eventType: 'Public',
        isEventEnd: false,

      },
    ],
    sessions: [
      {
        time: ' 3:00 pm  to 4:00 pm',
        facultyName: 'Dr.Jatin Shah',
        mode: 'Online',
        status: 'Yet to be started',
      },
    ],
  });

  function handleLoading(params) {
    setLoading(params)
  }


  useEffect(() => {
    requestHealthPermissions();
  }, [requestHealthPermissions]);


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: hp(5) }}
      showsVerticalScrollIndicator={false}>
      {/* <HealthScreen handleLoading={handleLoading} /> */}
      <HomeScreenUI
        {...options}
        isLoggedIn={isLoggedIn}
        handleNavigate={handleNavigate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    paddingBottom: hp(10),
  },
});
