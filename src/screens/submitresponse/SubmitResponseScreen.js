import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SubmitResponseScreenUI from './SubmitResponseScreenUI';
import Colors from '../../utils/constants/Colors';

export default function SubmitResponseScreen() {
  return (
    <View style={{flex:1, padding:20 , backgroundColor:Colors.white}}>
      <SubmitResponseScreenUI />
    </View>
  );
}

const styles = StyleSheet.create({});
