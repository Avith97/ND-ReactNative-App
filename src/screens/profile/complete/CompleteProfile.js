import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CompleteProfileUI from './CompleteProfileUI'
import { TemplateService } from '../../../services/templates/TemplateService'
import { URL } from '../../../utils/constants/Urls'
import { services } from '../../../services/axios/services'
import { appsnackbar } from '../../../common/functions/snackbar_actions'
import { useFocusEffect } from '@react-navigation/native'
import { hp, wp } from '../../../common/functions/dimensions'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { en as labels } from '../../../utils/labels/en'
import Strings from '../../../utils/constants/Strings'
import { perform_login } from '../../../common/functions/login'

export default function CompleteProfile(props) {
  let InCompleteGoogleResponse = props?.route?.params?.InCompleteGoogleResponse

  let user = useSelector(store => store.user)
  let eventData = useSelector(store => store.eventData)

  const [state, setState] = useState({
    userId: null,
    email: null,
    country: null,
    dob: null,
    gender: null,
    height: null,
    weight: null,
    contactNumber: null,
    manualEditedContact: null
  })

  useEffect(() => {
    if (InCompleteGoogleResponse) {
      const countryObj = {
        label: InCompleteGoogleResponse.country || '',
        value: ` ${InCompleteGoogleResponse.countryCode?.trim()}`,
        code: InCompleteGoogleResponse.country?.slice(0, 2).toUpperCase() || ''
      }
      setState({
        ...state,
        email: InCompleteGoogleResponse?.email,
        userId:
          InCompleteGoogleResponse?.runnerId || InCompleteGoogleResponse?.id,
        firstName: InCompleteGoogleResponse?.firstName,
        lastName: InCompleteGoogleResponse?.lastName,
        contactNumber: InCompleteGoogleResponse?.contactNumber,
        gender:
          {
            label: InCompleteGoogleResponse.gender,
            value: InCompleteGoogleResponse.gender
          } || '',
        dob: InCompleteGoogleResponse?.dateOfBirth
          ? moment(InCompleteGoogleResponse?.dateOfBirth, 'YYYY-MM-DD').toDate()
          : null,
        country: countryObj || {}
      })
    }
  }, [InCompleteGoogleResponse])

  async function handleChange(params, val) {
    if (params === 'contactNumber') {
      setState({
        ...state,
        manualEditedContact: val
      })
    }

    setState({
      ...state,
      [params]: val
    })
  }

  function validate(params) {
    let err = {}
    let isValid = true

    const mobileRegex = /^[6-9]\d{9}$/
    if (
      state.manualEditedContact?.length > 0 &&
      !mobileRegex.test(state.manualEditedContact)
    ) {
      isValid = false
      err = { contactNumberErr: true }
      appsnackbar.showErrMsg('Please enter valid contact number')
    } else if (!state.gender?.label?.trim()?.length) {
      isValid = false
      err = { genderErr: true }
      appsnackbar.showErrMsg('Please select gender')
    } else if (!state.dob) {
      isValid = false
      err = { dobErr: true }
      appsnackbar.showErrMsg('Please select date of birth')
    } else if (moment().diff(moment(state.dob), 'years') < 16) {
      isValid = false
      err = { dobErr: true }
      appsnackbar.showErrMsg('You must be at least 18 years old')
    } else if (!state.country?.label?.trim()?.length) {
      isValid = false
      err = { countryErr: true }
      appsnackbar.showErrMsg('Please select country')
    } else if (
      !state.height ||
      isNaN(state.height) ||
      Number(state.height) < 50 ||
      Number(state.height) > 300
    ) {
      isValid = false
      err = { heightErr: true }
      appsnackbar.showErrMsg('Please enter a valid height in cm (50 - 300)')
    } else if (
      !state.weight ||
      isNaN(state.weight) ||
      Number(state.weight) < 10 ||
      Number(state.weight) > 500
    ) {
      isValid = false
      err = { weightErr: true }
      appsnackbar.showErrMsg('Please enter a valid weight in kg (10 - 500)')
    }

    return isValid
  }

  async function handleSubmit(params) {
    let isValid = validate()
    if (!isValid) return

    let syncObj = {
      firstName: state?.firstName,
      lastName: state?.lastName,
      email: state?.email,
      country: state?.country?.label,
      countryCode: state?.country?.value,
      gender: state?.gender?.value,
      dob: moment(state?.dob).format('DD-MM-yyyy'),
      contactNumber: state?.contactNumber,
      height: state?.height,
      weight: state?.weight
    }

    let url = TemplateService._userId(URL.update_profile, user?.id)

    let resp = await services._put(url, syncObj)

    if (resp?.type === 'success') {
      let getUserURl = TemplateService._userId(URL.get_profile, user?.id)
      let userProfile = await services._get(getUserURl)

      const isEventPresent = !!eventData?.id

      if (userProfile?.data?.user) {
        await set_data_storage(userProfile?.data?.user)
      }

      handleNavigate()

      appsnackbar?.showSuccessMsg(
        resp.data?.success.verbose || 'User updated successfully.'
      )
    } else {
      appsnackbar?.showErrMsg(labels.some_thing_went_wrong)
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
      isAuthorized: data?.isAuthorized,
      googleSource: true
    }
    return auth
  }

  async function set_data_storage(data) {
    // use to set data in storage

    services?.refreshInstance(data?.token)
    const auth = await data_separation(data)
    await perform_login(auth, (user = { ...data }))
  }

  const handleNavigate = () => {
    const isEventPresent = !!eventData?.id
    if (user?.token && isEventPresent) {
      props.navigation.replace(Strings.NAVIGATION.eventstarted, {
        isLoggedIn: true
      })
    } else {
      props.navigation.replace(Strings.NAVIGATION.home, { isLoggedIn: true })
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: wp(5),
        paddingVertical: hp(3),
        backgroundColor: 'white'
      }}>
      <CompleteProfileUI
        {...state}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
