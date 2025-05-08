import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProgramDashboardScreenUI from './ProgramDashboardScreenUI';
import Colors from '../../utils/constants/Colors';
import Strings from '../../utils/constants/Strings';
import {useNavigation} from '@react-navigation/native';

export default function ProgramDashboardScreen(props) {
  const navigation = useNavigation();
  // const []
  const [options] = useState({
    daysData: [
      {id: 1, dayTitle: 'day1', response: false},
      {id: 2, dayTitle: 'day2', response: true},
      {id: 3, dayTitle: 'day3', response: false},
      {id: 4, dayTitle: 'day4', response: false},
      {id: 5, dayTitle: 'day5', response: false},
      {id: 6, dayTitle: 'day6', response: false},
      {id: 7, dayTitle: 'day7', response: true},
    ],
   
  });

 

  const handleNavigate = () => {

    navigation.navigate(Strings.NAVIGATION.programleaderboard);
  };
  return (
    <View style={styles.container}>
      <ProgramDashboardScreenUI
        {...props}
        {...options}
        handleNavigate={handleNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
});
