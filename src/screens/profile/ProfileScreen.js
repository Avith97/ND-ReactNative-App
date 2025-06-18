// profile screen =================
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ProfileScreenUI from './ProfileScreenUI'
import Strings from '../../utils/constants/Strings'
import { services } from '../../services/axios/services'
import Loader from '../../common/components/loader/Loader'
import { TemplateService } from '../../services/templates/TemplateService'
import { useSelector } from 'react-redux'
import { URL } from '../../utils/constants/Urls'
import { store } from '../../redux/store'
import { set_user_details } from '../../redux/actions/login_action'
import { show_web_view_toast } from '../../common/components/toasts/handleToasts'
import { FilePicker } from '../../common/functions/FilePicker'
import { useIsFocused } from '@react-navigation/native'

export default function ProfileScreen(props) {
  const [state, setState] = React.useState({
    // Add any state variables you need here
    userDetails: null,
    AvatarURl: null
  })

  const { auth } = useSelector(store => store)

  let isFocused = useIsFocused()

  useEffect(() => {
    // Fetch user details or any initial data here
    // Example: setState({ userDetails: fetchedData });
    initiateScreen()
  }, [isFocused])

  async function initiateScreen() {
    // Fetch user details or any initial data here
    let resp = await getDetails() // Replace with your API endpoint
    // Example: setState({ userDetails: fetchedData });

    if (resp) {
      setState(prevState => ({
        ...prevState,
        userDetails: resp
      }))
    } else {
      console.error('Failed to fetch user details')
    }
  }

  async function getDetails() {
    // Simulate an API call to fetch user details
    try {
      let url = TemplateService?._userId(URL?.get_profile, auth?.id)
      let resp = await services?._get(url)

      if (resp?.api_response?.data) {
        store.dispatch(set_user_details(resp?.data?.user))
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
    if (name === 'ok') {
      show_web_view_toast(true, { url: 'https://necessarydevil.com/terms' })
    } else if (name) {
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

    const blob = base64ToBlob(resp.data, resp.mime)

    const file = new File([blob], resultFromPicker.filename, {
      type: resultFromPicker.mime
    })

    return
    setState({ ...state, AvatarURl: `data:image/jpeg;base64,${resp?.data}` })

    let requestParams = { file: file }
    let formData = new FormData()

    formData.append(profilePicture, requestParams.file)

    let url = TemplateService?._userId(URL?.user_profile_pic_upload, auth?.id)

    let res = await services?._postFormData(url, formData)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Loader />
      <ProfileScreenUI
        {...state}
        handleNavigate={handleNavigate}
        handleUploadImage={handleUploadImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
