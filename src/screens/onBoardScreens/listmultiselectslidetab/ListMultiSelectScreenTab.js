// React Core + React Native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// Custom UI component for this screen
import ListMultiSelectScreenTabUI from './ListMultiSelectScreenTabUI';

// constants strings
import Strings from '../../../utils/constants/Strings';

export default function ListMultiSelectScreenTab(props) {
  async function handleChange(params, item) {
    return;
  }

  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.checkboxScreen);
  };

  return (
    <View style={styles.container}>
      <ListMultiSelectScreenTabUI
        {...props}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
