//react native components
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

// common components
import OtpUI from './OtpUI';
import {appsnackbar} from '../../common/functions/snackbar_actions';

// constants strings & URL's
import {services} from '../../services/axios/services';
import {URL} from '../../utils/constants/Urls';
import Strings from '../../utils/constants/Strings';

const OtpScreen = props => {
  const route = useRoute();
  const [state, setstate] = useState({
    otp: '',
    userId: '',
  });

  const [err, seterr] = useState({
    otpErr: false,
  });

  useEffect(() => {
    let msg = route.params.message;
    let userId = route.params.userId;
    appsnackbar.showSuccessMsg(msg);
  }, []);

  function handleChange(params, value) {
    setstate({
      ...state,
      [params]: value,
    });
  }

  function validate(params, val) {
    let valid = true;
    let err = {};
    if (params === 'otp' && val?.length < 6) {
      err.otpErr = 'Enter valid 6 digit OTP';
      valid = false;
      appsnackbar.showErrMsg(err.otpErr);
    }
    seterr(err);
    setTimeout(() => {
      seterr({});
    }, 2000);

    return valid;
  }

  async function handleSubmit(params, val) {
    let isValid = validate(params, val);
    // if (!isValid) return
    console.log('route.params', route.params);

    try {
      let resp = await services._post(URL.otp_verify, {
        otp: state.otp,
        userName: route?.params?.userName || '',
        byEmail: route?.params?.byEmail || false,
        byMobile: route?.params?.byMobile || false, // { userName: "***", byEmail: true || false, byMobile:false || false }
      });
      console.log('otp ==>', resp);
    
      if (resp && resp?.error_data) {
        appsnackbar.showErrMsg(resp?.error_data || resp?.verbose);
        seterr({pinErr: resp?.verbose});
        setTimeout(() => {
          seterr({pinErr: false});
        }, 3000);
      } else if (resp?.api_response) {
        // appsnackbar.showSuccessMsg(resp?.verbose);
        setTimeout(() => {
          props.navigation.navigate(Strings.NAVIGATION.create_profile);
        }, 2000);
      }
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong');
    }
  }

  return (
    <View style={{flex: 1}}>
      <OtpUI
        {...props}
        {...state}
        {...err}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default OtpScreen;
