import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EditProfileScreenUI from './EditProfileScreenUI';

export default function EditProfileScreen() {
  return (
    <View style={{flex: 1, padding: 20 , backgroundColor:"#fff"}}>
      <EditProfileScreenUI />
    </View>
  );
}

const styles = StyleSheet.create({});
