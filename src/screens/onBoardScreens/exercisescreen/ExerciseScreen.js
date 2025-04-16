import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ExerciseTypeScreenUI from './ExerciseTypeScreenUI';
import Strings from '../../../utils/constants/Strings';

export default function ExerciseScreen(props) {
  const [state, setState] = useState({
    selectedExercises: [],
  });

  const [options] = useState({
    exerciseOptions: [
      'Strength Training',
      'Yoga or Pilates',
      'Cardio (Running, Cycling)',
      'HIIT (High-intensity interval training)',
      'Other',
    ],
  });

  async function handleChange(params, item) {
    const {selectedExercises} = state;
    let updatedExercises;

    if (selectedExercises.includes(item)) {
      updatedExercises = selectedExercises.filter(x => x !== item);
    } else {
      updatedExercises = [...selectedExercises, item];
    }

    setState(prevState => ({
      ...prevState,
      selectedExercises: updatedExercises,
    }));
  }

  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.motivation);
  };

  return (
    <View style={styles.container}>
      <ExerciseTypeScreenUI
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
  container: {flex: 1},
});
