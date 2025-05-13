import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProgramScreenUI from './ProgramScreenUI';
import Colors from '../../../utils/constants/Colors';
import {Images} from '../../../utils/constants/Images';
import Strings from '../../../utils/constants/Strings';

export default function ProgramScreen(props) {
  const [state, setState] = useState({
    selectedTab: 'My Programs',
  });

  const [options, setOptions] = useState({
    programs: [
      {
        title: 'Step Challenge',
        duration: '20 Min',
        calories: 432,
        image: Images.runner_bg_image,
        status: 'Ongoing',
        registered: true,
      },
    ],

    tabs: ['My Programs', 'Upcoming'],
  });

  const handleChange = tab => {
    setState(prev => ({...prev, selectedTab: tab}));
  };

  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
      IsRegistered: true,
    });
  };

  return (
    <View style={styles.container}>
      <ProgramScreenUI
        {...state}
        {...options}
        handleNavigate={handleNavigate}
        handleChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:20,
    backgroundColor: Colors.white,
  },
});
