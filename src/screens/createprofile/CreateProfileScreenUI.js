import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../common/components/buttons/CustomButton';
import {hp, wp} from '../../common/functions/dimensions';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import moment from 'moment';
import CustomDateTimePicker from '../../common/components/textInput/CustomDateTimePicker';
import {CheckBox} from 'react-native-elements';
import CustomDropdown from '../../common/components/dropdown/CustomDropdown';
import { countryList } from '../../data/ConstantsData';

// Labels object
import {en as LABELS} from '../../utils/labels/en';

export default function CreateProfileScreenUI(props) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{LABELS.createProfile}</Text>
      <View>
        <View style={{marginVertical: hp(1)}}>
          <CustomTextInput
            name={'firstName'}
            label={LABELS.firstName}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              value: props.firstName,
              placeholder: LABELS.firstNamePlaceholder,
            }}
          />
        </View>
        <View style={{marginVertical: hp(1)}}>
          <CustomTextInput
            name={'lastName'}
            label={LABELS.lastName}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              value: props.lastName,
              placeholder: LABELS.lastNamePlaceholder,
            }}
          />
        </View>

        <View style={{marginVertical: hp(1)}}>
          <CustomTextInput
            name={'email'}
            label={LABELS.email}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              value: props.email,
              placeholder: LABELS.emailPlaceholder,
            }}
          />
        </View>

        <View style={{marginVertical: hp(1)}}>
          <CustomDropdown
            name="country"
            title={LABELS.country}
            label={LABELS.select}
            mandatory
            data={countryList}
            onChangeText={props.handleChange}
            valueExtractor={item => item.label}
            labelExtractor={item => item.label}
          />
        </View>

        <View style={{marginVertical: hp(1.5)}}>
          <CustomTextInput
            name={'mobilenumber'}
            label={LABELS.mobileNumber}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              value: props.mobilenumber,
              placeholder: LABELS.mobilePlaceholder,
            }}
          />
        </View>
        <View style={{marginVertical: hp(1.5)}}>
          <CustomDateTimePicker
            label={LABELS.dob}
            name="DOB"
            mandatory={true}
            value={props.DOB}
            onChangeText={(name, value) => props.handleChange(name , value)}
          />
        </View>
      </View>

      <View
        style={{
          marginVertical: hp(0.5),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckBox
          value={true}
          tintColors={{true: '#4caf50', false: '#ccc'}}
        />
        <Text style={{width: wp(75)}}>{LABELS.signUpEmail}</Text>
      </View>
      <View style={{marginTop: hp(0.5)}}>
        <CustomButton
          title={LABELS.createAccount}
          name={''}
          onPress={props?.handleSubmit}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
            marginLeft: wp(2.5),
          }}
        />
      </View>

      <View
        style={{
          marginVertical: hp(1.5),
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Text>{LABELS.termsPrefix}</Text>
        <Text style={{color: Colors.targetColor}}>{LABELS.terms}</Text>
        <Text>{LABELS.and}</Text>
        <Text style={{color: Colors.targetColor}}>{LABELS.privacy}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 10,
    fontSize: fontSize.l,
    fontWeight: 'bold',
  },
  textInputStyle: {
    fontSize: fontSize.normal,
    elevation: 5,
    height: hp('5'),
    width: wp('90'),
    color: Colors.text_black,
  },
});
