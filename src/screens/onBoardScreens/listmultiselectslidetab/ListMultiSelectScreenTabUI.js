// react core components + React Native components
import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wp} from '../../../common/functions/dimensions';
import Icons from '../../../assets/icons/Icons';

// labels for the screen
import {en as labels} from '../../../utils/labels/en';
import { useSelector } from 'react-redux';

export default function ListMultiSelectScreenTabUI(props) {
  const onboard = useSelector(state => state.onboard)

  function onClick(item) {
    props.handleChange("list-multiselect", item)
  }

  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {/* === Screen 1: Exercise Type === */}
        {props?.question && (
          <Text style={styles.heading}>{props?.question}</Text>
        )}
        {props?.sub_text && (
          <Text style={styles.subText}>{props?.sub_text}</Text>
        )}
        {props?.options &&
          props?.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionBox,
                // props.selectedExercises.includes(item) && styles.optionSelected,
                onboard?.["list-multiselect"]?.id === option.id && styles.optionSelected,
              ]}
              onPress={() => onClick(option)}
            >
              {/* left icon */}
              {option?.icon && option?.iconPosition === 'left' && (
                <View style={{width: wp(10)}}>
                  <Icons name={option.icon} size={30} color="#000" />
                </View>
              )}

              {/* content */}
              <View style={{width: wp(55)}}>
                {option?.text && (
                  <Text numberOfLines={2} style={styles.activityTitle}>
                    {option?.text}
                  </Text>
                )}
                {option?.subText && (
                  <Text numberOfLines={2} style={styles.activityDesc}>
                    {option?.subText}
                  </Text>
                )}
              </View>

              {/* right icon */}
              {option?.icon && option?.iconPosition === 'right' && (
                <View style={{width: wp(10), marginLeft: wp(10)}}>
                  <Icons name={option.icon} size={30} color="#000" />
                </View>
              )}
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
