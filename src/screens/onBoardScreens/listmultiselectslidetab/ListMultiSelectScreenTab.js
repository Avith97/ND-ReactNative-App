// React Core + React Native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// Custom UI component for this screen
import ListMultiSelectScreenTabUI from './ListMultiSelectScreenTabUI';

// constants strings
import Strings from '../../../utils/constants/Strings';

export default function ListMultiSelectScreenTab(props) {
  const [state, setState] = useState({
    selectedExercises: [],
  });

  const [options] = useState({
    exerciseOptions: [
      {name: 'Strength Training', icon: 'Strwnght-training'},
      {name: 'Yoga or Pilates', icon: 'Yoga-1'},
      {name: 'Cardio (Running, Cycling)', icon: 'Cardio-1'},
      {name: 'HIIT (High-intensity interval training)', icon: 'Cardio-1'},
      {name: 'Other', icon: 'Other-icon'},
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
    props.navigation.navigate(Strings.NAVIGATION.checkboxScreen);
  };

  return (
    <View style={styles.container}>
      <ListMultiSelectScreenTabUI
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
