import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function DashboardScreenUI() {
  return (
    <View style={styles.container}>
      <Text>DashboardScreenUI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
