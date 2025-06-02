import {View} from 'react-native';
import React, {useState} from 'react';
import SignupUI from './SignupUI';
import {appsnackbar} from '../../common/functions/snackbar_actions';
import Strings from '../../utils/constants/Strings';
import {services} from '../../services/axios/services';
import {URL} from '../../utils/constants/Urls';

const SignUpScreen = props => {
  const {isSignup} = props.route.params || {};

  const [state, setState] = useState({
    userName: '',
  });

  function handleChange(params, val) {
    setState(prev => ({...prev, [params]: val}));
  }

  function validate() {
    let isValid = true;
    const value = state?.userName?.trim() || '';

    // Simple email regex

    const emailRegex = /^(?:\d{10}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    // const emailRegexOld = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // console.log('regex value ==========', emailRegexOld.test(value));

    if (!value.length) {
      isValid = false;
      appsnackbar.showErrMsg('Please enter Email or Mobile Number');
    } else if (!emailRegex.test(value)) {
      isValid = false;
      appsnackbar.showErrMsg('Please enter Email or Mobile Number');
    }

    return isValid;
  }

  async function signup() {
    //
    // props.navigation.navigate(Strings.NAVIGATION.create_profile);
    // return;
    try {
      console.log('signup called with state -->', state);
      const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let syncObj = {
        userName: state.userName,
        byEmail: checkEmail.test(state.userName),
        byMobile: !checkEmail.test(state.userName), // check only email
      };

      let resp = await services._post(URL.otp, syncObj); // send otp request

      if (resp.type !== 'success') return;
      if (resp.data.success.code === '200') {
        props.navigation.navigate(Strings.NAVIGATION.otp, {
          ...syncObj,
          message: resp?.data?.success?.verbose,
        });
      }
    } catch (error) {
      console.log('sent otp request error -->', error);
      appsnackbar.showErrMsg('Something went wrong, please try again later.');
    }
  }

  async function login() {
    // Implement login functionality here
  }

  async function handleSubmit(params) {
    let isValid = validate();
    if (!isValid) return;
    // return;
    // if isLogin page is false
    await signup();
    // if isLogin page is true
    // login();
  }

  return (
    <View style={{flex: 1}}>
      <SignupUI
        {...props}
        {...state}
        isSignup={isSignup}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default SignUpScreen;
