import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProgramDetailUI from './ProgramDetailScreenUI';
import Strings from '../../utils/constants/Strings';

export default function ProgramDetailScreen(props) {
  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.submitresponse);
  };
  return (
    <View style={{flex: 1}}>
      <ProgramDetailUI handleNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({});
