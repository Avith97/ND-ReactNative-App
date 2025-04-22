import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActivitySyncScreenUI from './ActivitySyncScreenUI';

export default function ActivitySyncScreen() {
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
      <ActivitySyncScreenUI />
    </View>
  );
}

const styles = StyleSheet.create({});
