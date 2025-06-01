// react core components + React Native components
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wp} from '../../../common/functions/dimensions';
import Icons from '../../../assets/icons/Icons';

// labels for the screen
import {en as labels} from '../../../utils/labels/en';

export default function ListMultiSelectScreenTabUI(props) {
  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {/* === Screen 1: Exercise Type === */}
        <Text style={styles.heading}>{labels.exerciseTypeHeading}</Text>
        {props?.exerciseOptions?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              props.selectedExercises.includes(item) && styles.optionSelected,
            ]}
            onPress={() => props.handleChange('selectedExercises', item)}>
            <View style={{width: wp(10), alignItems: 'center'}}>
              <Icons name={item.icon} size={30} color="#000" />
            </View>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContentContainer: {
    flex: 1,
    paddingTop: 20,
    // width: wp(100),
    // flexWrap: 'wrap',
  },
  heading: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  optionBox: {
    flexDirection: 'row',
    // width: wp(80),
    // flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
