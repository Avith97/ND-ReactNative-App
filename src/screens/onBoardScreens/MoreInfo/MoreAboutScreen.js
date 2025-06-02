// React core components + React Native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
// Custom UI component for this screen
import MoreAboutYouUI from './MoreAboutYouUI';
// string constants
import Strings from '../../../utils/constants/Strings';

export default function MoreAboutScreen(props) {
  //  user input
  const [state, setState] = useState({
    gender: '',
    age: null,
    weight: null,
    height: null,
    weightUnit: 'KG',
    heightUnit: 'CM',
  });

  // Handles changes in input fields
  async function handleChange(params, val) {
    setState({
      ...state,
      [params]: val,
    });
  }

  // Handles form submission
  const handleSubmit = () => {
    console.log(state);
    props.navigation.navigate(Strings.NAVIGATION.listSlideTab);
  };

  return (
    <View style={styles.container}>
      <MoreAboutYouUI
        {...props}
        {...state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
