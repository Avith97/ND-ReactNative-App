import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {hp} from '../../../common/functions/dimensions';
import Colors from '../../../utils/constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import CalenderScreenUI from './CalenderScreenUI';

export default function CalenderScreen() {

    const [options] = useState({
        
 challengeData : [
    {
      id: '1',
      title: 'Zero Sugar Challenge',
      time: '10:00-13:00',
      fromDate: '01/04/2025',
      toDate: '21/04/2025',
      color: '#1ABC9C',
      bgColor: '#F7FDEB',
      borderColor: 'transparent',
      button2: 'Submit Response',
    },
    {
      id: '2',
      title: 'Step Challenge',
      time: '10:00-13:00',
      fromDate: '01/04/2025',
      toDate: '21/04/2025',
      color: '#8E44AD',
      bgColor: '#F6F3FF',
      borderColor: 'transparent',
      button2: 'Show Result',
    },
    {
      id: '3',
      title: 'Yoga Challenge',
      time: '10:00-13:00',
      fromDate: '01/04/2025',
      toDate: '21/04/2025',
      color: '#3498DB',
      bgColor: '#E7F7FF',
      borderColor: 'transparent',
      button2: 'Submit Response',
    },
  ],
  
    })
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp(5)}}
      showsVerticalScrollIndicator={false}>
      <CalenderScreenUI {...options} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    paddingBottom: hp(10),
  },
});
