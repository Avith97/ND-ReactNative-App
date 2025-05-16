import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {hp} from '../../../common/functions/dimensions';
import Colors from '../../../utils/constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import CalenderScreenUI from './CalenderScreenUI';

export default function CalenderScreen(props) {

  const [state , setState] = useState({
    selectedTab:"Day"
  })
  const [options] = useState({
    tabs: ['Day', 'Week', 'Month'],
    challengeData: [
      {
        id: '1',
        title: 'Zero Sugar Challenge',
        time: '10:00-13:00',
        fromDate: '06/05/2025',
        toDate: '12/05/2025',
        color: '#1ABC9C',
        bgColor: '#84BAFF',
        borderColor: 'transparent',
        button2: 'Submit Response',
      },

      {
        id: '3',
        title: 'Yoga Challenge',
        time: '10:00-13:00',
        fromDate: '20/05/2025',
        toDate: '26/05/2025',
        color: '#3498DB',
        bgColor: '#85E3FF',
        borderColor: 'transparent',
        button2: 'Submit Response',
      },
    ],
  });


  const handleChange =(tab)=>{
    setState((prev)=>({...prev , selectedTab:tab}))
  }

  //api call 
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp(5)}}
      showsVerticalScrollIndicator={false}>
      <CalenderScreenUI {...state} {...options} {...props} handleChange={handleChange} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: Colors.white,
    paddingBottom: hp(10),
  },
});
