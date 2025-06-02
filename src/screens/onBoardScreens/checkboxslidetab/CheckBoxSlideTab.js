// react core + react native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// constants strings
import Strings from '../../../utils/constants/Strings';

// Custom UI component for this screen
import CheckBoxSlideTabUI from './CheckBoxSlideTabUI';
import { store } from '../../../redux/store';

export default function CheckBoxSlideTab(props) {
  async function handleChange(params, item) {
    global.OnboardingData = {
      ...global.OnboardingData,
      [params]: item,
    }

    store.dispatch({
      type: 'SET_ONBOARDING_DATA',
      payload: global.OnboardingData
    })
    return;
    const {selectedMotivation} = state;
    let updatedExercises;

    if (selectedMotivation.includes(item)) {
      updatedExercises = selectedMotivation.filter(x => x !== item);
    } else {
      updatedExercises = [...selectedMotivation, item];
    }
  }

  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.cardSlideScreen);
  };

  return (
    <View style={styles.container}>
      <CheckBoxSlideTabUI
        {...props}
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
