// react native + react core components
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import CustomTextInput from '../../../common/components/textInput/CustomTextInput';
import Colors from '../../../utils/constants/Colors';
import {fontSize} from '../../../utils/constants/Fonts';
import {hp, wp} from '../../../common/functions/dimensions';

// Centralized static labels
import {en as LABELS} from '../../../utils/labels/en';
import Icons from '../../../assets/icons/Icons';

export default function GenderScreenUI(props) {
  // UI

  let genderOptions = ['Male', 'Female'];
  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        <Text style={styles.title}>{LABELS?.more_about_title}</Text>
        <Text style={styles.subtitle}>{LABELS.more_about_subtitle}</Text>

        <Text style={styles.label}>{LABELS.more_about_genderLabel}</Text>
        <View style={styles.genderContainer}>
          {genderOptions.map(g => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genderBox,
                props?.gender === g && styles.genderSelected,
              ]}
              onPress={() => props?.handleChange('gender', g)}>
              <View>
                <Icons
                  name={g === 'Male' ? 'Male' : 'Female'}
                  size={40}
                  color="#000"
                />
              </View>
              <Text style={{paddingTop: 5}}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{LABELS.more_about_ageLabel}</Text>
        <View style={styles.row}>
          <CustomTextInput
            name={'age'}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props.handleChange}
            inputProps={{
              // flex: 1,
              value: props.age,
              placeholder: LABELS.more_about_agePlaceholder,
            }}
          />
        </View>

        <Text style={styles.label}>{LABELS.more_about_weightLabel}</Text>
        <View style={styles.row}>
          <CustomTextInput
            name={'weight'}
            inputStyle={{...styles.textInputStyle, width: wp(90)}}
            onChangeText={props?.handleChange}
            inputProps={{
              // flex: 1,
              value: props.weight,
              placeholder: LABELS.more_about_weightPlaceholder,
            }}
          />
        </View>

        <Text style={styles.label}>{LABELS.more_about_heightLabel}</Text>
        <View style={styles.row}>
          <CustomTextInput
            name={'height'}
            inputStyle={{...styles.textInputStyle, width: wp(90)}}
            onChangeText={props.handleChange}
            inputProps={{
              // flex: 1,
              value: props.height,
              placeholder: LABELS.more_about_heightPlaceholder,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 6},
  subtitle: {fontSize: 16, marginBottom: 20},
  label: {marginTop: 10, marginBottom: 5, fontWeight: '600'},
  genderContainer: {flexDirection: 'row', gap: 10},
  AgeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  genderBox: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    borderRadius: 8,
  },
  genderSelected: {borderColor: '#7CFC00', backgroundColor: '#E8FFE8'},
  textInputStyle: {
    fontSize: fontSize.normal,
    elevation: 5,
    height: hp('6'),
    width: wp('90'), // Matches the text input width with the remaining space
    color: Colors.text_black,
  },
  row: {flexDirection: 'row', alignItems: 'center', gap: 10},
  unitContainer: {
    flexDirection: 'row',
    gap: 5,
    border: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  unitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  unitSelected: {borderColor: '#7CFC00', backgroundColor: '#E8FFE8'},

  continueBtn: {
    marginTop: 30,
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    bottom: 1,
  },
  continueText: {fontWeight: 'bold'},
});
