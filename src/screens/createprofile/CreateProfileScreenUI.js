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

export default function CreateProfileScreenUI(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <View>
        <View style={{marginVertical: hp(1)}}>
          <CustomTextInput
            name={'firstname'}
            label={'First Name'}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              // flex: 1,
              value: props.firstname,
              placeholder: 'Enter First Name',
            }}
          />
        </View>
        <View style={{marginVertical: hp(1)}}>
          <CustomTextInput
            name={'lastname'}
            label={'Last Name'}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              // flex: 1,
              value: props.lastname,
              placeholder: 'Enter Last Name',
            }}
          />
        </View>

        <View style={{marginVertical: hp(1)}}>
          <CustomTextInput
            name={'email'}
            label={'Email'}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              // flex: 1,
              value: props.email,
              placeholder: 'Enter Email Address',
            }}
          />
        </View>

        <View style={{marginVertical: hp(1)}}>
          <CustomDropdown
            name="country"
            title="Country"
            label="Select"
            mandatory
            data={[{country: 'India'}, {country: 'Australia'}]}
            onChangeText={props.handleChange}
            valueExtractor={item => item.country}
            labelExtractor={item => item.country}
          />
        </View>

        <View style={{marginVertical: hp(1.5)}}>
          <CustomTextInput
            name={'mobilenumber'}
            label={'Mobile Number'}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              // flex: 1,
              value: props.mobilenumber,
              placeholder: '+91 ******',
            }}
          />
        </View>
        <View style={{marginVertical: hp(1.5)}}>
          <CustomDateTimePicker
            label="Date of Birth"
            name="dob"
            mandatory={true}
            value={selectedDate}
            onChangeText={(name, value) => console.log(value, name)}
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
          // onValueChange={(setChecked)}
          tintColors={{true: '#4caf50', false: '#ccc'}}
        />
        <Text style={{width: wp(75)}}>Sign up for e-mails to get updates.</Text>
      </View>
      <View style={{marginTop: hp(0.5)}}>
        <CustomButton
          title={'Create Account'}
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
        <Text>By creating your account, you agree to the</Text>
        <Text style={{color: Colors.targetColor}}>Terms of Services </Text>
        <Text>and</Text>
        <Text style={{color: Colors.targetColor}}> Privacy Policy</Text>
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
    width: wp('90'), // Matches the text input width with the remaining space
    color: Colors.text_black,
  },
});
