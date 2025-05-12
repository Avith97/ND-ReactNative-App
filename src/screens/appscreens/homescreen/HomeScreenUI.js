import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import SessionCard from '../../../common/components/sessioncard/SessionCard';
import PieProgressBar from '../../../common/components/progressbar/PieProgressBar';
import {hp, wp} from '../../../common/functions/dimensions';
import {fontSize} from '../../../utils/constants/Fonts';
import HealthScreen from '../../../../Healthconnect';
import Colors from '../../../utils/constants/Colors';
import EventCard from '../../../common/components/eventcard/EventCard';
import ChallengeCard from '../../../common/components/challengecard/ChallengeCard';

export default function HomeScreenUI(props) {
  let {isLoggedIn} = props;

  const [loading, setloading] = useState(false);
  useEffect(() => {
    initHealthConnect();
    // setupBackgroundFetch(); // Initialize background fetch when the app loads

    // // Listen to app state changes (foreground or background)
    // const appStateListener = AppState.addEventListener("change", (state) => {
    //   if (state === "active") { // If the app comes to the foreground
    //     console.log("App in foreground, starting vibration.");
    //     startVibrationLoop(); // Start the vibration loop
    //   } else { // If the app moves to the background
    //     console.log("App in background, stopping vibration.");
    //     stopVibrationLoop(); // Stop the vibration loop
    //   }
    // });

    // // Cleanup the event listener when the component unmounts
    // return () => appStateListener.remove();
  }, []);

  const initHealthConnect = () => {
    setloading(true);
    // initialize()
    setTimeout(() => {
      setloading(false);
    }, 200);
  };

  function handleLoading(params) {
    setloading(params);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp(5)}}
      showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 5, marginBottom: hp(1)}}>
        <Text style={styles.title}>
          {isLoggedIn ? 'Welcome, Lakhan!' : 'Welcome!'}
        </Text>
        <Text style={styles.subTitle}>
          {isLoggedIn
            ? "You're doing good today!"
            : 'A step Towards Healthy Life !'}
        </Text>
      </View>
      {/* progress card */}
      <View style={styles.progress_card_wrapper}>
        <View>
          <Text style={{...styles.title, color: Colors.smoky_white}}>
            Your daily progress
          </Text>
          <Text style={styles.subTitle}>Wellness Program</Text>
          <Text
            style={{
              ...styles.subTitle,
              color: Colors.smoky_white,
              opacity: 0.5,
            }}>
            Accumulating daily report
          </Text>
          <Text style={styles.rangetitle}>From - 01/04/2025</Text>
          <Text style={styles.rangetitle}>To - 21/04/2025</Text>
        </View>
        <View>
          <PieProgressBar />
        </View>
      </View>

      {/* ongoing  events  */}
      <View style={{marginVertical: hp(1)}}>
        {props.Events.map((item, index) => (
          <EventCard
            key={index}
            {...item}
            handleNavigate={props.handleNavigate}
          />
        ))}
      </View>

      {/* ongoing challenges */}

      <View style={{marginVertical: hp(2)}}>
        {props.Challenges?.map((item, index) => (
          <ChallengeCard
            key={index}
            {...item}
            handleNavigate={props.handleNavigate}
          />
        ))}
      </View>

      <View style={{marginVertical: hp(1)}}>
        <Text style={styles.title}>Planning Diet for Weight Management</Text>
        {props.sessions.map((item, index) => (
          <SessionCard key={index} {...item}  />
        ))}
      </View>

      {/* session */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.m,
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  subTitle: {
    fontSize: fontSize.normal,
    color: '#94AE27',
    marginBottom: hp(1),
  },

  progress_card_wrapper: {
    backgroundColor: '#26281C',
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.5),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rangetitle: {
    color: '#ffffff',
    fontSize: fontSize.s,
    opacity: 0.8,
  },
});
