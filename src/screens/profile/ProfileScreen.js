import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileScreenUI from './ProfileScreenUI';

export default function ProfileScreen() {
  return (
    <View style={{flex:1 , backgroundColor:"#fff" , padding:20}}>
      <ProfileScreenUI />
    </View>
  );
}

const styles = StyleSheet.create({});
