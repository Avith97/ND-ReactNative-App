import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp} from '../../../common/functions/dimensions';
import Colors from '../../../utils/constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import CalenderScreenUI from './CalenderScreenUI';

export default function CalenderScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp(5)}}
      showsVerticalScrollIndicator={false}>
      <CalenderScreenUI />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    paddingBottom: hp(10),
  },
});
