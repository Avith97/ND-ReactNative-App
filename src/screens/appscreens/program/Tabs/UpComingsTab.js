// react native components
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// constants utils
import {fontSize} from '../../../../utils/constants/Fonts';
import Colors from '../../../../utils/constants/Colors';

export default function UpComingsTab() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.noFoundTitle}>No Record Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noFoundTitle: {
    fontSize: fontSize.md,
    color: Colors.gray_06,
    textAlign: 'center',
  },
});
