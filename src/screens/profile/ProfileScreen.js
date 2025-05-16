import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileScreenUI from './ProfileScreenUI';
import Strings from '../../utils/constants/Strings';

export default function ProfileScreen(props) {



  const handleNavigate = name => {
    if (name) {
      props.navigation.navigate(name); // list item navigation
    } else {
      props.navigation.navigate(Strings.NAVIGATION.bmi); // BMI navigation
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <ProfileScreenUI handleNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({});
