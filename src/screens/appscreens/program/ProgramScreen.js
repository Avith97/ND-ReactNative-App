import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// constants utils & assets
import Colors from '../../../utils/constants/Colors';
import {Images} from '../../../utils/constants/Images';
import Strings from '../../../utils/constants/Strings';

// UI component
import ProgramScreenUI from './ProgramScreenUI';

export default function ProgramScreen(props) {
  const [state, setState] = useState({
    selectedTabID: 0,
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

    tabs: [
      {id: 0, title: 'My Programs'},
      {id: 1, title: 'Upcoming'},
    ],
  });

  const handleChange = tab => {

    setState(prev => ({...prev, selectedTabID: tab?.id}));
  };

  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.dashboard);
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
