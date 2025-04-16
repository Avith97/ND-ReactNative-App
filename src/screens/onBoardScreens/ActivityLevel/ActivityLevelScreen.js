import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ActivityLevelScreenUI from './ActivityLevelScreenUI';

export default function ActivityLevelScreen(props) {
  const [state, setState] = useState({
    selectedActivity:{}
  });

  const [options] = useState({
    activityOptions: [
      {
        title: 'Sedentary',
        description: 'Little to almost no exercise',
      },
      {
        title: 'Slightly Active',
        description: 'Exercise up to 2 hours in a week',
      },
      {
        title: 'Moderately Active',
        description: 'Exercise up to 4 hours in a week',
      },
      {
        title: 'Very Active',
        description: 'Exercise for 4+ hours in a week',
      },
    ],
  });

  async function handleChange(params, val) {
    setState({
      ...state,
      [params]: val,
    });
  }
  const handleSubmit = () => {
    console.log('Selected Activity:', state);
    props.navigation.navigate(Strings.NAVIGATION.bellyCondition);
  };

  return (
    <View style={styles.container}>
      <ActivityLevelScreenUI {...props} {...state} {...options} handleChange={handleChange} handleSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
