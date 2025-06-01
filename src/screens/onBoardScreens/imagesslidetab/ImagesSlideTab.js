// react core + react native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// Custom UI component for this screen
import ImagesSlideTabUI from './ImagesSlideTabUI';

// string constants
import Strings from '../../../utils/constants/Strings';
import {Images} from '../../../utils/constants/Images';

export default function ImagesSlideTab(props) {
  async function handleChange(params, val) {
    return;
    setState({
      ...state,
      [params]: val,
    });
  }
  const handleSubmit = () => {
    console.log('Selected Activity:', state);
    props.navigation.navigate(Strings.NAVIGATION.listMultiSelectScreen);
  };

  return (
    <View style={styles.container}>
      <ImagesSlideTabUI
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
