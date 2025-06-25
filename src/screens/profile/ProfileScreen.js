// profile screen =================
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ProfileScreenUI from './ProfileScreenUI'
import Strings from '../../utils/constants/Strings'
import { services } from '../../services/axios/services'
import Loader from '../../common/components/loader/Loader'
import { TemplateService } from '../../services/templates/TemplateService'
import { useSelector } from 'react-redux'
import { URL } from '../../utils/constants/Urls'
import { store } from '../../redux/store'
import { set_user_details } from '../../redux/actions/login_action'
import {
  open_logout_bottom_sheet,
  show_web_view_toast
} from '../../common/components/toasts/handleToasts'
import { FilePicker } from '../../common/functions/FilePicker'
import { useIsFocused } from '@react-navigation/native'
import { guidGenerator } from '../../common/functions/helper'
import { perform_login } from '../../common/functions/login'
import LogoutBottomSheet from '../../common/components/bottomsheet/LogoutBottomSheet'
import ToastModal from '../../common/components/Modal/ToastModal'

export default function ProfileScreen(props) {
  const [state, setState] = React.useState({
    // Add any state variables you need here
    userDetails: null,
    AvatarURl: null
  })

  const [render, setRender] = useState(false)

  const auth = useSelector(store => store.auth)
  const actionRef = useRef(null)

  let isFocused = useIsFocused()

  useEffect(() => {
    // Fetch user details or any initial data here
    // Example: setState({ userDetails: fetchedData });
    if (isFocused) {
      initiateScreen()
    }
  }, [isFocused, state?.userDetails?.profilePictureLink, render])

  async function initiateScreen() {
    // Fetch user details or any initial data here
    let resp = await getDetails() // Replace with your API endpoint

    console.log(
      'user detail Profile%20Photos/runner_3675/profilePhoto-20250619_122059-1-.jpeg',
      resp
    )

    // Example: setState({ userDetails: fetchedData });

    if (resp) {
      setState(prevState => ({
        ...prevState,
        userDetails: resp
      }))
      // await set_data_storage(resp)
    } else {
      console.error('Failed to fetch user details')
    }
  }

  async function getDetails() {
    // Simulate an API call to fetch user details
    try {
      let url = TemplateService?._userId(URL?.get_profile, auth?.id)
      let resp = await services._get(url)

      console.log('user profile data', resp)

      if (resp?.api_response?.data) {
        store.dispatch(set_user_details(resp?.data?.user))
        setRender(false)
        return resp?.data
      } else {
        throw new Error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
      return null
    }
  }

  const handleNavigate = name => {
    if (name === 'logout') {
      // showActionItem()
      open_logout_bottom_sheet()
    }
    //  else if (name === 'ok') {
    //   show_web_view_toast(true, { url: 'https://necessarydevil.com/terms' })
    // }
    else if (name) {
      props.navigation.navigate(name, { userDetails: state.userDetails }) // list item navigation
    } else {
      props.navigation.navigate(Strings.NAVIGATION.bmi, {
        userDetails: state.userDetails
      }) // BMI navigation
    }
  }

  async function base64ToBlob(base64, mime = 'image/jpeg') {
    const byteChars = atob(base64)
    const byteArrays = []

    for (let offset = 0; offset < byteChars.length; offset += 512) {
      const slice = byteChars.slice(offset, offset + 512)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, { type: mime })
  }

  async function handleUploadImage() {
    let resp = await FilePicker.openPicker()

    // const blob = base64ToBlob(resp.data, resp.mime)

    const key = 'profileId_' + guidGenerator()

    const customParams = {
      file: {
        uri: Platform.OS === 'ios' ? resp.sourceURL : resp.path,
        name: 'profile.jpg', // or resp.filename if available
        type: resp.mime,
        key: key,
        id: key
      }
    }

    console.log('custom params', customParams)

    const formData = new FormData()
    formData.append('profilePicture', customParams.file)

    let url = TemplateService?._userId(URL?.user_profile_pic_upload, auth?.id)

    let res = await services?._postFormData(url, formData)

    if (res.type === 'success') {
      setRender(true)
    } else {
      console.log('some thing went wrong profile update')
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

  const showActionItem = () => {
    actionRef?.current?.show?.({
      // data: mockRequests,
      timeout: 1000 * 10
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* <Loader /> */}

      {/* <ToastModal ref={actionRef}>
        <LogoutBottomSheet />
      </ToastModal> */}
      <ProfileScreenUI
        {...state}
        handleNavigate={handleNavigate}
        handleUploadImage={handleUploadImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
