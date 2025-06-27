import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CreateProfileScreenUI from './CreateProfileScreenUI'
import Strings from '../../utils/constants/Strings'
import moment from 'moment'
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { useSelector } from 'react-redux'
import { perform_login } from '../../common/functions/login'

export default function CreateProfileScreen(props) {
  let { userName, byEmail, byMobile } = props?.route?.params
  const { email, contactNumber } = useSelector(state => state.user)

  let eventData = useSelector(store => store.eventData)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const [state, setstate] = useState({
    firstName: null,
    lastName: '',
    email: email || '',
    country: null,
    contactNumber: contactNumber || null,
    countryCode: null,
    DOB: null,
    isDatePickerVisible: false,
    emailUpdateCheck: false,
    height: null,
    weight: null,
    gender: null
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
    ],
    genderOptions: [
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' },
      { label: 'Other', value: 'OTHER' }
    ]
  })

  const [err, seterr] = useState(null)

  useEffect(() => {
    if (byEmail) {
      setstate({ ...state, email: userName })
    } else {
      setstate({ ...state, contactNumber: userName })
    }
  }, [userName])

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
    } else if (moment().diff(moment(state.DOB), 'years') < 16) {
      isValid = false
      err = { dobErr: true }
      appsnackbar.showErrMsg('You must be at least 16 years old')
    } else if (!state.gender) {
      isValid = false
      err = { genderErr: true }
      appsnackbar.showErrMsg('Please select gender')
    } else if (!state.height || isNaN(state.height) || state.height <= 0) {
      isValid = false
      err = { heightErr: true }
      appsnackbar.showErrMsg('Please enter valid height')
    } else if (!state.weight || isNaN(state.weight) || state.weight <= 0) {
      isValid = false
      err = { weightErr: true }
      appsnackbar.showErrMsg('Please enter valid weight')
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
          timezone: 'Asia/Calcutta',
          height: parseFloat(state.height).toFixed(1),
          weight: parseFloat(state.weight).toFixed(1),
          gender: state.gender,
          fcmToken: global.fcm_token,
          deviceId: null
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
      console.log(resp, 'resp')

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

        // checking event data is present or not
        const isEventPresent = !!eventData?.id

        if (isEventPresent) {
          handleNavigate({
            screen: Strings.NAVIGATION.eventstarted
          })
        } else {
          handleNavigate({
            screen: Strings.NAVIGATION.home,
            params: { isLoggedIn: true }
          })
        }
        await set_data_storage(resp?.data)
      }
    } catch (error) {
      console.log('Error in handleSubmit:', error)
    }
  }

  async function data_separation(data) {
    let auth = {
      token: data?.token,
      isLoggedIn: true,
      contactNumber: data?.contactNumber,
      email: data?.email,
      user_id: data?.id,
      runnerId: data?.runnerId,
      isAuthorized: data?.isAuthorized
    }
    return auth
  }

  async function set_data_storage(data) {
    // use to set data in storage
    services?.refreshInstance(data?.token)
    const auth = await data_separation(data)
    await perform_login(auth, (user = { ...data }))
  }

  function handleNavigate(params) {
    if (isLoggedIn) {
      props.navigation.replace(Strings.NAVIGATION.app, params)
    } else {
      props.navigation.replace(Strings.NAVIGATION.app, params)
    }
  }

  console.log(byMobile, byEmail, 'event')

  return (
    <View style={styles.container}>
      <CreateProfileScreenUI
        {...props}
        {...state}
        {...options}
        byEmail={byEmail}
        byMobile={byMobile}
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
