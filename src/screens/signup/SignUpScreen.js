import {View} from 'react-native';
import React, {useState} from 'react';
import SignupUI from './SignupUI';
import {appsnackbar} from '../../common/functions/snackbar_actions';
import Strings from '../../utils/constants/Strings';
import {services} from '../../services/axios/services';
import {URL} from '../../utils/constants/Urls';

const SignUpScreen = props => {
  const [state, setState] = useState({
    userName: '',
    byEmail: false,
    byMobile: false,
  });

  function handleChange(params, val) {
    setState(prev => ({...prev, [params]: val}));
  }

  function validate() {
    let isValid = true;
    const value = state?.userName?.trim() || '';

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(state);

    if (!value.length) {
      isValid = false;
      appsnackbar.showErrMsg('Please enter Email or Mobile Number');
      setState(prev => ({...prev, byEmail: false, byMobile: false}));
    } else if (emailRegex.test(value)) {
      // Email detected
      setState(prev => ({...prev, byEmail: true, byMobile: false}));
    } else if (/^\d+$/.test(value)) {
      // Only digits, treat as contact number
      if (value.length < 9 || value.length > 12) {
        isValid = false;
        appsnackbar.showErrMsg('Please enter a valid contact number');
        setState(prev => ({...prev, byEmail: false, byMobile: false}));
      } else {
        setState(prev => ({...prev, byEmail: false, byMobile: true}));
      }
    } else {
      isValid = false;
      appsnackbar.showErrMsg('Please enter a valid Email or Mobile Number');
      setState(prev => ({...prev, byEmail: false, byMobile: false}));
    }

    return isValid;
  }

  async function handleSubmit(params) {
    let isValid = validate();
    if (!isValid) return;
    try {
      let resp = await services._post(URL.otp, {
        userName: state.userName,
        byEmail: true,
        byMobile: false,
      });
      if (resp.type !== 'success') return;
      if (resp.data.success.code === '200') {
        // appsnackbar.showSuccessMsg(resp?.data?.success?.verbose)
        props.navigation.navigate(Strings.NAVIGATION.otp, {
          userName: state.userName,
          byEmail: true,
          byMobile: false,
          message: resp?.data?.success?.verbose,
        });

      }
    } catch (error) {
      console.log('try err -->', error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <SignupUI
        {...props}
        {...state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default SignUpScreen;
