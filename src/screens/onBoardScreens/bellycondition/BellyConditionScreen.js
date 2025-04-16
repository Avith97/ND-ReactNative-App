import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BellyConditionScreenUI from './BellyConditionScreenUI';
import Strings from '../../../utils/constants/Strings';
import {Images} from '../../../utils/constants/Images';

export default function BellyConditionScreen(props) {
  const [state, setState] = useState({
    selectedBelly: '',
  });

  const [options] = useState({
    bellyOptions: [
      {title: 'Belly 1', ImageUrl: Images.belly1},
      {title: 'Belly 2', ImageUrl: Images.belly2},
      {title: 'Belly 3', ImageUrl: Images.belly3},
      {title: 'Belly 4', ImageUrl: Images.belly4},
      {title: 'Belly 5', ImageUrl: Images.belly5},
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
    props.navigation.navigate(Strings.NAVIGATION.exerciseType);
  };

  return (
    <View style={styles.container}>
      <BellyConditionScreenUI
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
