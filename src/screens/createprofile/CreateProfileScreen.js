import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CreateProfileScreenUI from './CreateProfileScreenUI';
import Strings from '../../utils/constants/Strings';
import moment from 'moment';
import {services} from '../../services/axios/services';
import {URL} from '../../utils/constants/Urls';
import { appsnackbar } from '../../common/functions/snackbar_actions';

export default function CreateProfileScreen(props) {
  const [state, setstate] = useState({
    firstName: null,
    lastName: '',
    email: '',
    country: '',
    contactNumber: '',
    DOB: moment().toDate(),
    isDatePickerVisible: false,
  });

  const handleConfirm = date => {
    setstate({
      ...state,
      [params]: val,
    });
  };

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
    console.log('handleChange-->', params, val);
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

  async function handleSubmit(params, value) {
    try {
      let Obj = new FormData();
      let userObject = {
        userRequest: {
          firstName: state.firstName,
          lastName: state.lastName,
          gender: 'MALE',
          pincode: '645732',
          country: state.country,
          otpVerified: true,
          dob: moment(state.DOB).format('DD-MM-yyyy'),
          email: state.email,
          contactNumber: state.contactNumber,
          countryCode: '91',
          timezone: 'Asia/Calcutta',
        },
        profilePicture: null, // or a File object
      };

      // Append userRequest as a JSON string
      Obj.append('userRequest', JSON.stringify(userObject.userRequest));

      // Optionally append file if it exists
      if (userObject.profilePicture) {
        Obj.append('profilePicture', userObject.profilePicture);
      }

      let resp = await services._postFormData(URL.create_profile, Obj);

      if (resp.data?.type !== 'success') {
        appsnackbar.showErrMsg(resp?.error_data || resp?.verbose);
        return;
      } else {
        props.navigation.navigate(Strings.NAVIGATION.onboard);
      }
    } catch (error) {
      console.log('Error in handleSubmit:', error);
    }
  }
  return (
    <View style={styles.container}>
      <CreateProfileScreenUI
        {...props}
        {...state}
        {...options}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
