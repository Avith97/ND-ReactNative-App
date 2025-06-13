import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CreateProfileScreenUI from './CreateProfileScreenUI'
import Strings from '../../utils/constants/Strings'
import moment from 'moment'
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { useSelector } from 'react-redux'

export default function CreateProfileScreen(props) {
  const { email, contactNumber } = useSelector(state => state.user)

  const [state, setstate] = useState({
    firstName: null,
    lastName: '',
    email: email || '',
    country: null,
    contactNumber: contactNumber || null,
    countryCode: null,
    DOB: null,
    isDatePickerVisible: false,
    emailUpdateCheck: false
  })

  const handleConfirm = date => {
    setstate({
      ...state,
      [params]: val
    })
  }

  const [options, setOptions] = useState({
    countryData: [
      {
        country: 'India',
        code: '+91'
      }
    ]
  })

  const [err, seterr] = useState(null)

  async function handleChange(params, val) {
    if (params === 'country') {
      setstate({
        ...state,
        country: val?.label?.trim(),
        countryCode: val?.value?.trim()
      })
    } else {
      setstate({
        ...state,
        [params]: val
      })
    }
  }

  function validate(params) {
    let err = {}
    let isValid = true

    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRegex = /^[6-9]\d{9}$/
    const nameRegex = /^[A-Za-z]+$/

    if (!state.firstName?.length || !nameRegex.test(state.firstName)) {
      isValid = false
      err = { firstNameErr: true }
      appsnackbar.showErrMsg('Please enter valid first name')
    } else if (!state.lastName?.length || !nameRegex.test(state.lastName)) {
      isValid = false
      err = { lastNameErr: true }
      appsnackbar.showErrMsg('Please enter valid last name')
    } else if (!checkEmail.test(state.email)) {
      isValid = false
      err = { emailErr: true }
      appsnackbar.showErrMsg('Please enter valid email')
    } else if (!state.country?.trim()?.length) {
      isValid = false
      err = { countryErr: true }
      appsnackbar.showErrMsg('Please select country')
    } else if (!mobileRegex.test(state.contactNumber)) {
      isValid = false
      err = { contactNumberErr: true }
      appsnackbar.showErrMsg('Please enter valid contact number')
    } else if (!state.DOB) {
      isValid = false
      err = { dobErr: true }
      appsnackbar.showErrMsg('Please select date of birth')
    }

    seterr(err)
    setTimeout(() => {
      seterr(null)
    }, 1000 * 5)

    return isValid
  }

  async function handleSubmit(params, value) {
    let isValid = validate()
    if (!isValid) return

    try {
      let syncObj = new FormData()
      let userObject = {
        userRequest: {
          firstName: state.firstName,
          lastName: state.lastName,
          gender: 'MALE',
          // pincode: '645732',
          country: state.country,
          otpVerified: true,
          dob: moment(state.DOB).format('DD-MM-yyyy'),
          email: state.email,
          contactNumber: state.contactNumber,
          countryCode: state.countryCode,
          timezone: 'Asia/Calcutta'
        },
        profilePicture: null // or a File object
      }

      // Append userRequest as a JSON string
      syncObj.append('userRequest', JSON.stringify(userObject.userRequest))

      // Optionally append file if it exists
      if (userObject.profilePicture) {
        syncObj.append('profilePicture', userObject.profilePicture)
      }

      let resp = await services._postFormData(URL.create_profile, syncObj)

      if (resp?.type !== 'success') {
        appsnackbar.showErrMsg(resp?.error_data || resp?.verbose)
        return
      } else if (resp?.type === 'success') {
        const successCode = resp?.data?.success?.code
        const message = resp?.data?.success?.verbose

        if (successCode === '409') {
          appsnackbar.showErrMsg(message || 'Something went wrong')
          return
        }
        props.navigation.navigate(Strings.NAVIGATION.onboard)
      }
    } catch (error) {
      console.log('Error in handleSubmit:', error)
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
