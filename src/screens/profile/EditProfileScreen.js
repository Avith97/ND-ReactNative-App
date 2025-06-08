import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EditProfileScreenUI from './EditProfileScreenUI';
import {useSelector} from 'react-redux';
import {TemplateService} from '../../services/templates/TemplateService';
import {URL} from '../../utils/constants/Urls';
import {services} from '../../services/axios/services';
import {appsnackbar} from '../../common/functions/snackbar_actions';
import moment from 'moment';

export default function EditProfileScreen(props) {
  const [err, seterr] = useState(null);

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    age: '',
    weight: '',
    gender: '',
    height: '',
    email: '',
    contactNumber: '',
  });

  // user detail
  const {auth} = useSelector(store => store);

  useEffect(() => {
    if (auth) {
      setFormState({
        firstName: auth.firstName || '',
        lastName: auth.lastName || '',
        dob: moment(auth.dateOfBirth).format('DD-MM-YYYY') || '',
        country: auth.country || '',
        age: auth.age?.toString() || '',
        weight: auth.weight?.toString() || '',
        gender: auth.gender || '',
        height: auth.height?.toString() || '',
        email: auth?.email || '',
        contactNumber: auth.contactNumber || '',
        countryCode: '91',
      });
    }
  }, []);

  function handleChange(params, val) {
    console.log('params', params);

    setFormState({
      ...formState,
      [params]: val,
    });
  }

  async function validation(params) {
    let isValid = true;

    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const nameRegex = /^[A-Za-z]+$/;

    if (!formState.firstName?.length || !nameRegex.test(formState.firstName)) {
      isValid = false;
      err = {firstNameErr: true};
      console.log('invalid');
      appsnackbar.showErrMsg('Please enter valid first name');
    } else if (
      !formState.lastName?.length ||
      !nameRegex.test(formState.lastName)
    ) {
      isValid = false;
      err = {lastNameErr: true};
      appsnackbar.showErrMsg('Please enter valid last name');
    } else if (!checkEmail.test(formState.email)) {
      isValid = false;
      err = {emailErr: true};
      appsnackbar.showErrMsg('Please enter valid email');
    } else if (!formState.country?.trim()?.length) {
      isValid = false;
      err = {countryErr: true};
      appsnackbar.showErrMsg('Please select country');
    } else if (!mobileRegex.test(formState.contactNumber)) {
      isValid = false;
      err = {contactNumberErr: true};
      appsnackbar.showErrMsg('Please enter valid contact number');
    } else if (!formState.dob) {
      isValid = false;
      err = {dobErr: true};
      appsnackbar.showErrMsg('Please select date of birth');
    }

    return isValid;
  }

  async function handleSubmit(params) {
    let isValid = validation();
    if (!isValid) return;

    try {
      let url = TemplateService._userId(URL.update_profile, auth?.id);
      let resp = await services._put(url, formState);

      if (resp?.status === 'success') {
        appsnackbar.showSuccessMsg('Profile Updated successfully');
      } else {
        appsnackbar.showSuccessMsg(
          resp?.data?.success?.verbose || 'User updated successfully.',
        );
      }
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong');
    }
  }

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
      <EditProfileScreenUI
        userDetail={auth}
        handleChange={handleChange}
        formState={formState}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
