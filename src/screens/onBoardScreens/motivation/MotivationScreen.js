import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Strings from '../../../utils/constants/Strings';
import MotivationScreenUI from './MotivationScreenUI';

export default function MotivationScreen(props) {
  const [state, setState] = useState({
    selectedMotivation: [],
  });

  const [options] = useState({
    options: [
      'Setting and achieving goals',
      'Social accountability',
      'Tracking progress',
      'Competing with others',
      'Enjoyment of the activity',
    ],
  });

  async function handleChange(params, item) {
    const {selectedMotivation} = state;
    let updatedExercises;

    if (selectedMotivation.includes(item)) {
      updatedExercises = selectedMotivation.filter(x => x !== item);
    } else {
      updatedExercises = [...selectedMotivation, item];
    }

    setState(prevState => ({
      ...prevState,
      selectedMotivation: updatedExercises,
    }));
  }

  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.finalOnboard);
  };
  return (
    <View style={styles.container}>
      <MotivationScreenUI
        {...props}
        {...state}
        {...options}
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
