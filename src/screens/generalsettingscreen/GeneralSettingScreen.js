import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import GeneralSettingScreenUI from './GeneralSettingScreenUI';
import Colors from '../../utils/constants/Colors';
import Strings from '../../utils/constants/Strings';

export default function GeneralSettingScreen(props) {
  const [options] = useState({
    settingsData: [
      {
        id: '1',
        name: 'Units Of Measure',
        value: 'Metric System',
        options: ['cm', 'ft'],
      },
      {id: '2', name: 'Language', value: 'English', options: ['kg', 'lbs']},
    ],
  });

  const handleChange = name => {
    if (name === '1') {
      props.navigation.navigate(Strings.NAVIGATION.unitsettings);
    } else {
      props.navigation.navigate(Strings.NAVIGATION.languagesettings);
    }
  };
  return (
    <View style={styles.container}>
      <GeneralSettingScreenUI {...options} handleChange={handleChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
});
