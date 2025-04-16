import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomImageBackground from '../../common/components/background/CustomImageBackground';
import {hp, wp} from '../../common/functions/dimensions';
import CustomButton from '../../common/components/buttons/CustomButton';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import Fonts, {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import {Images} from '../../utils/constants/Images';

const SignupUI = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      {/* <Text>Login UI</Text> */}
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{}}>
          <CustomTextInput
            name={'userId'}
            label="Enter Email or Mobile Number"
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              // flex: 1,
              editable: props.showOtp ? false : true,
              value: props.userId,
              placeholder: 'Enter Email/Mobile Number',
            }}
          />
        </View>

        <CustomButton
          title={'Send OTP'}
          name={'sendOTP'}
          onPress={props?.handleSubmit}
          // isLoading={store.getState().settings.isLoading}
          btnStyles={styles.btnStyles}
          btnTitleStyles={{
            ...styles.textStyle,
            ...styles.btnTextStyle,
          }}
        />

        <Text>Already registered ? Login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  textInputStyle: {
    fontSize: fontSize.normal,
    elevation: 5,
    height: hp('6'),
    width: wp('90'), // Matches the text input width with the remaining space
    color: Colors.text_black,
  },
  title: {
    marginBottom: 20,
    fontSize: fontSize.l,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.medium,
    color: 'black',
  },
  btnStyles: {
    width: wp('90'),
    marginVertical: hp(2),
  },
  btnTextStyle: {
    color: 'white',
  },
});

export default SignupUI;
