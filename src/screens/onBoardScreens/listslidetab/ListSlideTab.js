// react + react native core components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

//  Custom UI component for this screen
import ListSlideTabUI from './ListSlideTabUI';

// string constants
import Strings from '../../../utils/constants/Strings';

export default function ListSlideTab(props) {
  const [state, setState] = useState({
    selectedActivity: {},
  });

  const [options] = useState({
    activityOptions: [
      {
        iconName: 'SEDENTARY',
        title: 'Sedentary',
        description: 'Little to almost no exercise',
      },
      {
        iconName: 'sLIGHTLY-ACTIVE', // Assuming you have an icon for this
        title: 'Slightly Active',
        description: 'Exercise up to 2 hours in a week',
      },
      {
        iconName: 'Moderatly-active',
        title: 'Moderately Active',
        description: 'Exercise up to 4 hours in a week',
      },
      {
        iconName: 'very-active',
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
    props.navigation.navigate(Strings.NAVIGATION.imagesSlideTab);
  };

  return (
    <View style={styles.container}>
      <ListSlideTabUI
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
