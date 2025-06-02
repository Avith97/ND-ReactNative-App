// react core components + React Native components
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// Custom UI component
import CardScreenTabUI from './CardScreenTabUI';

//  constants strings
import Strings from '../../../utils/constants/Strings';

export default function CardScreenTab(props) {
  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.app, {
      isLoggedIn: true,
    });
  };
  return (
    <View style={styles.container}>
      <CardScreenTabUI {...props} handleSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
