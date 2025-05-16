import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import UnitSettingScreenUI from './UnitSettingScreenUI';
import Colors from '../../../utils/constants/Colors';

export default function UnitSettingsScreen() {
  const [state, setState] = useState({selectedUnit: 1});

  const [options] = useState({
    unitsConfig: [
      {id: 1, label: 'Metric System'},
      {id: 2, label: 'British System'},
    ],
  });

  const handleChange = unit => {
    setState(prev => ({...prev, selectedUnit: unit}));
  };
  return (
    <View style={{flex: 1 , padding:20 , background:Colors.white}}>
      <UnitSettingScreenUI
        {...options}
        {...state}
        handleChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
