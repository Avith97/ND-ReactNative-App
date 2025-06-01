// react + react native core components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

//  Custom UI component for this screen
import ListSlideTabUI from './ListSlideTabUI';

// string constants
import Strings from '../../../utils/constants/Strings';

export default function ListSlideTab(props) {
  async function handleChange(params, item) {
    return;
  }
  const handleSubmit = () => {
    console.log('Selected Activity:', state);
    props.navigation.navigate(Strings.NAVIGATION.imagesSlideTab);
  };

  return (
    <View style={styles.container}>
      <ListSlideTabUI
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
