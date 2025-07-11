import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EditProfileScreenUI from './EditProfileScreenUI'
import { useSelector } from 'react-redux'
import { TemplateService } from '../../services/templates/TemplateService'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'

export default function EditProfileScreen(props) {
  const [err, setErr] = useState(null)
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

  const user = useSelector(store => store?.user)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (user && isFocused) {
      const countryObj = {
        label: user.country,
        value: ` ${user.countryCode?.trim()}` || '',
        code: user.country?.slice(0, 2).toUpperCase() || ''
      }
      setFormState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dob: user?.dateOfBirth
          ? moment(user?.dateOfBirth, 'YYYY-MM-DD').toDate()
          : null,
        country: countryObj,
        age: user.age?.toString() || '',
        weight: user.weight?.toString() || '',
        gender: user.gender ? { label: user.gender, value: user.gender } : '',
        height: user.height?.toString() || '',
        email: user?.email || '',
        contactNumber: user.contactNumber || ''
      })
      setErr(null)
    }
  }, [user, isFocused])

  function handleChange(field, value) {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }))
    setErr(null)
  }

  function validate(form) {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRegex = /^[6-9]\d{9}$/
    const nameRegex = /^[A-Za-z]+$/

    if (!form.firstName?.length || !nameRegex.test(form.firstName)) {
      setErr({ firstNameErr: true })
      appsnackbar.showErrMsg('Please enter valid first name')
      return false
    }
    if (!form.lastName?.length || !nameRegex.test(form.lastName)) {
      setErr({ lastNameErr: true })
      appsnackbar.showErrMsg('Please enter valid last name')
      return false
    }
    if (!checkEmail.test(form.email)) {
      setErr({ emailErr: true })
      appsnackbar.showErrMsg('Please enter valid email')
      return false
    }
    if (!form.country?.label?.trim()?.length) {
      setErr({ countryErr: true })
      appsnackbar.showErrMsg('Please select country')
      return false
    }
    if (!form.gender?.label?.trim()?.length) {
      setErr({ genderErr: true })
      appsnackbar.showErrMsg('Please select gender')
      return false
    }

    if (!form.dob) {
      setErr({ dobErr: true })
      appsnackbar.showErrMsg('Please select date of birth')
      return false
    }
    if (moment().diff(moment(form.dob), 'years') < 16) {
      setErr({ dobErr: true })
      appsnackbar.showErrMsg('You must be at least 16 years old')
      return false
    }
    if (
      !form.height ||
      isNaN(form.height) ||
      Number(form.height) < 50 ||
      Number(form.height) > 300
    ) {
      setErr({ heightErr: true })
      appsnackbar.showErrMsg('Please enter a valid height in cm (50 - 300)')
      return false
    }
    if (
      !form.weight ||
      isNaN(form.weight) ||
      Number(form.weight) < 10 ||
      Number(form.weight) > 500
    ) {
      setErr({ weightErr: true })
      appsnackbar.showErrMsg('Please enter a valid weight in kg (10 - 500)')
      return false
    }
    setErr(null)
    return true
  }

  async function handleSubmit() {
    if (!validate(formState)) return

    try {
      const url = TemplateService._userId(URL.update_profile, user?.id)
      const resp = await services._put(url, {
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
        err={err}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
