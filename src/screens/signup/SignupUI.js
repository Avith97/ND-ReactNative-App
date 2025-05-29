// react-native components
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// common components
import CustomButton from '../../common/components/buttons/CustomButton';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';

// constants assets & dimensions
import {hp, wp} from '../../common/functions/dimensions';
import Fonts, {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';

// Labels object
import {en as labels} from '../../utils/labels/en';

const SignupUI = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{labels.title}</Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View>
          <CustomTextInput
            name={'userName'}
            label={labels.emailOrMobileLabel}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={props?.handleChange}
            inputProps={{
              editable: props.showOtp ? false : true,
              value: props.userName,
              placeholder: labels.emailOrMobilePlaceholder,
            }}
          />
        </View>

        <CustomButton
          title={labels.sendOtp}
          name={'sendOTP'}
          onPress={props?.handleSubmit}
          btnStyles={styles.btnStyles}
          btnTitleStyles={{
            ...styles.textStyle,
            ...styles.btnTextStyle,
          }}
        />
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
    width: wp('90'),
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
