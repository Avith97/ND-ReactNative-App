import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProgramDashboardScreenUI from './ProgramDashboardScreenUI';
import Colors from '../../utils/constants/Colors';

export default function ProgramDashboardScreen(props) {
  const [options] = useState({
    daysData: [
      {dayTitle: 'day1', response: true},
      {dayTitle: 'day2', response: true},
      {dayTitle: 'day3', response: false},
      {dayTitle: 'day4', response: false},
      {dayTitle: 'day5', response: false},
      {dayTitle: 'day6', response: false},
      {dayTitle: 'day7', response: true},
    ],
    tabs:["5 Days" , "10 Days" , "10 Days"],
    DATA: [
        {
          id: '1',
          name: 'Dhiraj Bhasme',
          score: 1034,
          backgroundColor: '#E6F7FF', // light blue
          avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
        },
        {
          id: '2',
          name: 'Lakhan Nemane',
          score: 988,
          backgroundColor: '#FFECE6', // light orange
          avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
        },
        {
          id: '3',
          name: 'Avith Hegde',
          score: 900,
          backgroundColor: '#FFF7E6', // light yellow
          avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
        },
      ],
  });

  const handleChange=(tab)=>{
    setGestureState((prev)=>({...prev , selectedTab:tab}))
  }
  return <View style={styles.container}>
    <ProgramDashboardScreenUI {...props} {...options} handleChange={handleChange} />
  </View>;
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        padding:20
    }
});
