import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EditProfileScreenUI from './EditProfileScreenUI'
import { useSelector } from 'react-redux'
import { TemplateService } from '../../services/templates/TemplateService'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import moment from 'moment'
import { store } from '../../redux/store'
import { useIsFocused } from '@react-navigation/native'
import Strings from '../../utils/constants/Strings'

export default function EditProfileScreen(props) {
  const [err, seterr] = useState(null)

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    dob: null,
    country: '',
    age: '',
    weight: '',
    gender: '',
    height: '',
    email: '',
    contactNumber: ''
  })

  // user detail
  const user = useSelector(store => store?.user)

  let isFocused = useIsFocused()

  useEffect(() => {
    if (user || isFocused) {
      const countryObj = {
        label: user.country,
        value: ` ${user.countryCode}`,
        code: user.country?.slice(0, 2).toUpperCase() || ''
      }

      setFormState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dob: user?.dateOfBirth
          ? moment(user?.dateOfBirth, 'YYYY-MM-DD').toDate()
          : null,
        country: countryObj || '',
        age: user.age?.toString() || '',
        weight: user.weight?.toString() || '',
        gender: { label: user.gender, value: user.gender } || '',
        height: user.height?.toString() || '',
        email: user?.email || '',
        contactNumber: user.contactNumber || ''
      })
    }
  }, [isFocused])

  function handleChange(params, val) {
    setFormState({
      ...formState,
      [params]: val
    })
  }

  async function validation(params) {
    let isValid = true

    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRegex = /^[6-9]\d{9}$/
    const nameRegex = /^[A-Za-z]+$/

    if (!formState.firstName?.length || !nameRegex.test(formState.firstName)) {
      isValid = false
      err = { firstNameErr: true }
      appsnackbar.showErrMsg('Please enter valid first name')
    } else if (
      !formState.lastName?.length ||
      !nameRegex.test(formState.lastName)
    ) {
      isValid = false
      err = { lastNameErr: true }
      appsnackbar.showErrMsg('Please enter valid last name')
    } else if (!checkEmail.test(formState.email)) {
      isValid = false
      err = { emailErr: true }
      appsnackbar.showErrMsg('Please enter valid email')
    } else if (!formState.country?.label?.trim()?.length) {
      isValid = false
      err = { countryErr: true }
      appsnackbar.showErrMsg('Please select country')
    } else if (!formState.gender?.label?.trim()?.length) {
      isValid = false
      err = { countryErr: true }
      appsnackbar.showErrMsg('Please select country')
    } else if (!mobileRegex.test(formState.contactNumber)) {
      isValid = false
      err = { contactNumberErr: true }
      appsnackbar.showErrMsg('Please enter valid contact number')
    } else if (!formState.dob) {
      isValid = false
      err = { dobErr: true }
      appsnackbar.showErrMsg('Please select date of birth')
    }

    return isValid
  }

  async function handleSubmit(params) {
    let isValid = validation()
    if (!isValid) return

    try {
      let url = TemplateService._userId(URL.update_profile, user?.id)

      let resp = await services._put(url, {
        ...formState,
        country: formState?.country?.label,
        countryCode: formState?.country?.value,
        gender: formState?.gender?.value,
        dob: moment(formState.dob).format('DD-MM-yyyy')
      })

      if (resp?.type === 'success') {
        appsnackbar.showSuccessMsg('Profile Updated successfully')
        props.navigation.goBack()
      } else {
        props.navigation.goBack()
        appsnackbar.showSuccessMsg(
          resp?.data?.success?.verbose || 'User updated successfully.'
        )
      }
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <EditProfileScreenUI
        userDetail={user}
        handleChange={handleChange}
        formState={formState}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
