// react core components + React Native components
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {hp, wp} from '../../../common/functions/dimensions';
import Icons from '../../../assets/icons/Icons';

// Centralized labels object
import {en as labels} from '../../../utils/labels/en';

export default function ListSlideTabUI(props) {
  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {/* === Activity Level Section === */}
        <Text style={styles.heading}>{labels.activityLevelHeading}</Text>
        <Text style={styles.subText}>{labels.activityLevelSubText}</Text>

        {props?.activityOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.activityBox,
              props.selectedActivity?.title === option.title &&
                styles.activitySelected,
            ]}
            onPress={() => props.handleChange('selectedActivity', option)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: wp(100),
                gap: 10,
              }}>
              <Icons name={option.iconName} size={30} color="#000" />
              <View>
                <Text style={styles.activityTitle}>{option.title}</Text>
                <Text style={styles.activityDesc}>{option.description}</Text>
              </View>
            </View>
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
  },
  heading: {fontSize: 20, fontWeight: 'bold', marginTop: 20},
  subText: {fontSize: 14, color: '#666', marginBottom: 15},
  activityBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: 10,
  },
  activitySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
  activityTitle: {fontWeight: 'bold', fontSize: 16},
  activityDesc: {fontSize: 14, color: '#666', marginTop: 5},
});
