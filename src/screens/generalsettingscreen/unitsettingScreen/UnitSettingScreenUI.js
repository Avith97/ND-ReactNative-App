import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../../utils/constants/Colors';
import { hp } from '../../../common/functions/dimensions';
import { fontSize } from '../../../utils/constants/Fonts';

export default function UnitSettingScreenUI(props) {

     const renderItem = ({item}) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.handleChange(item.id)}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.radioCircle}>
            {props.selectedUnit === item.id && (
              <View style={styles.selectedDot} />
            )}
          </View>
        </TouchableOpacity>
      );
  return (
    <View>
      <View style={{marginVertical: hp(1)}}>
        <Text style={{fontSize: fontSize.m, fontWeight: 700}}>Units Of Measure</Text>
        <Text style={{fontSize: fontSize.normal}}>
        After the unit is set successfully, it will be updated to the device synchronously
        </Text>
      </View>
      <FlatList
        data={props.unitsConfig}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  )
}

const styles = StyleSheet.create({ flatList: {
    // borderTopWidth: 1,
    // borderColor: '#eee',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    // borderBottomWidth: 1,
    // borderColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});