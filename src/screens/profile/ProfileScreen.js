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

export default function ProfileScreen(props) {
  const [state, setState] = React.useState({
    // Add any state variables you need here
    userDetails: null,
    AvatarURl: null
  })

  const { auth } = useSelector(store => store)

  useEffect(() => {
    // Fetch user details or any initial data here
    // Example: setState({ userDetails: fetchedData });
    initiateScreen()
  }, [])

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

  async function base64ToBlob(base64, contentType = 'image/jpeg') {
    const byteCharacters = atob(base64.split(',')[1]) // remove base64 header

    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512)
      const byteNumbers = new Array(slice.length)
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    console.log()

    return new Blob(byteArrays, { type: contentType })
  }

  async function handleUploadImage() {
    let resp = await FilePicker.openPicker()

    const file = new File(
      [`data:image/jpeg;base64,${resp?.data}`],
      'profile.jpg',
      {
        type: 'image/jpeg'
      }
    )

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
