import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MoreAboutYouUI from './MoreAboutYouUI';
import Strings from '../../../utils/constants/Strings';

export default function MoreAboutScreen(props) {
  // Logic (State Management)
  const [state, setState] = useState({
    gender: '',
    age: null,
    weight: null,
    height: null,
    weightUnit: 'KG',
    heightUnit: 'CM',
  });

  async function handleChange(params, val) {
    setState({
      ...state,
      [params]: val,
    });
  }

  const handleSubmit = () => {
    console.log(state);
    props.navigation.navigate(Strings.NAVIGATION.activityLevel);
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
    // padding: 20,
  },
});
