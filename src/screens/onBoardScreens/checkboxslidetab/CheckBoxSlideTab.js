// react core + react native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// constants strings
import Strings from '../../../utils/constants/Strings';

// Custom UI component for this screen
import CheckBoxSlideTabUI from './CheckBoxSlideTabUI';

export default function CheckBoxSlideTab(props) {
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
    props.navigation.navigate(Strings.NAVIGATION.cardSlideScreen);
  };

  return (
    <View style={styles.container}>
      <CheckBoxSlideTabUI
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
