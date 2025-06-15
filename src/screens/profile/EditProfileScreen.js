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
  const auth = useSelector(store => store?.auth)

  useEffect(() => {
    if (auth) {
      const countryObj = {
        label: auth.country,
        value: ` ${auth.countryCode}`,
        code: auth.country?.slice(0, 2).toUpperCase() || ''
      }

      console.log('date of birth', auth)

      setFormState({
        firstName: auth.firstName || '',
        lastName: auth.lastName || '',
        dob: auth?.dateOfBirth
          ? moment(auth?.dateOfBirth, 'YYYY-MM-DD').toDate()
          : null,
        country: countryObj || '',
        age: auth.age?.toString() || '',
        weight: auth.weight?.toString() || '',
        gender: { label: auth.gender, value: auth.gender } || '',
        height: auth.height?.toString() || '',
        email: auth?.email || '',
        contactNumber: auth.contactNumber || ''
      })
    }
  }, [])

  async function getDetails() {
    // Simulate an API call to fetch user details
    try {
      let url = TemplateService?._userId(URL?.get_profile, auth?.id)
      let resp = await services?._get(url)

      if (resp?.api_response?.data) {
        store.dispatch(set_user_details(resp?.data))
        return resp?.data
      } else {
        throw new Error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
      return null
    }
  }

  function handleChange(params, val) {
    console.log('params', params)

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
      console.log('invalid')
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
      let url = TemplateService._userId(URL.update_profile, auth?.id)

      let resp = await services._put(url, {
        ...formState,
        country: formState?.country?.label,
        countryCode: formState?.country?.value,
        gender: formState?.gender?.value,
        dob: moment(formState.dob).format('DD-MM-yyyy')
      })

      console.log(formState?.dob, 'datr')

      console.log('payload', {
        ...formState,
        country: formState?.country?.label,
        countryCode: formState?.country?.value,
        gender: formState?.gender?.value,
        dob: formState?.dob
      })

      console.log(resp)

      if (resp?.status === 'success') {
        appsnackbar.showSuccessMsg('Profile Updated successfully')
        await getDetails()
      } else {
        await getDetails()
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
        userDetail={auth}
        handleChange={handleChange}
        formState={formState}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
