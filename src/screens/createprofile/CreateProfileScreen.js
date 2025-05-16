import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CreateProfileScreenUI from './CreateProfileScreenUI';
import Strings from '../../utils/constants/Strings';

export default function CreateProfileScreen(props) {
  const [state, setstate] = useState({
    FirstName: null,
    lastName: '',
    DOB: '',
    country: '',
  });

  const [options, setOptions] = useState({
    countryData: [
      {
        country: 'India',
        code: '+91',
      },
    ],
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

  const handleSubmit=()=>{
    props.navigation.navigate(Strings.NAVIGATION.onboard)
    
  }
  return (
    <View style={styles.container}>
      <CreateProfileScreenUI
        {...props}
        {...state}
        {...options}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
