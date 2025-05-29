//React Native Imports
import React, {useState} from 'react';
import {View} from 'react-native';

//  common functions
import {appsnackbar} from '../../common/functions/snackbar_actions';

//  Constants string
import Strings from '../../utils/constants/Strings';

// UI Components
import LoginUI from './LoginUI';

const LoginScreen = props => {
  const [state, setstate] = useState({
    userId: null,
  });

  const [err, seterr] = useState(null);

  async function handleChange(params, val) {
    setstate({
      ...state,
      [params]: val,
    });
  }

  function validate(params) {
    let err = {};
    let isValid = true;
    if (!state.userId) {
      isValid = false;
      err = {userIdErr: true};
      console.log('invalid');
      appsnackbar.showErrMsg('Please enter valid email or mobile number');
    }

    seterr(err);
    setTimeout(() => {
      seterr(null);
    }, 1000 * 5);

    return isValid;
  }

  async function handleNavigate(params, val) {
    props.navigation.navigate(Strings.NAVIGATION.signup);
  }

  async function handleSubmit(params) {
    if (params === 'signup') {
      props.navigation.navigate(Strings.NAVIGATION.signup);
      return;
    }
    props.navigation.navigate(Strings.NAVIGATION.signup);

    let isValid = validate();
    if (!isValid) return;

    // console.log(state)
  }

  return (
    <View style={{flex: 1}}>
      <LoginUI
        {...props}
        {...state}
        handleChange={handleChange}
        handleNavigate={handleNavigate}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default LoginScreen;
