import ImagePicker from 'react-native-image-crop-picker'
import { toast_error } from '../components/toasts/handleToasts'
import { appsnackbar } from './snackbar_actions'

export const FilePicker = {
  openCamera: async params => {
    try {
      let resp = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: false,
        mediaType: 'photo'
      })
      if (['image/jpeg', 'image/png', 'image/jpg'].includes(resp.mime)) {
        // cropImageUpload(image.path, image.data)
        return resp
      } else {
        appsnackbar.showErrMsg('File type not supported')
      }
    } catch (error) {
      // console.log('Camera cancelled-->', error)
      toast_error('Camera Closed')
    }

    // return resp;
  },
  openPicker: async params => {
    try {
      let resp = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: false,
        mediaType: 'photo'
      })
      if (['image/jpeg', 'image/png', 'image/jpg'].includes(resp.mime)) {
        // cropImageUpload(image.path, image.data)
        return resp
      } else {
        appsnackbar.showErrMsg('File type not supported')
      }
    } catch (error) {
      console.log('Picker cancelled-->', error)
      // toast_error('Image picker cancelled')
    }

    // return resp;
  },
  openPickerVideo: async params => {
    try {
      let resp = await ImagePicker.openPicker({
        mediaType: 'video',
        includeBase64: true
      })
      if (['video/mp4', 'video/quicktime'].includes(resp.mime)) {
        // handleVideoUpload(resp.path, resp.data)
        return resp
      }
    } catch (error) {
      // console.log('Picker Video cancelled-->', error)
      toast_error('Video picker cancelled')
    }
  },
  openCameraVideo: async params => {
    try {
      let resp = await ImagePicker.openCamera({
        mediaType: 'video',
        includeBase64: true
      })
      if (['video/mp4', 'video/quicktime'].includes(resp.mime)) {
        // handleVideoUpload(resp.path, resp.data)
        return resp
      }
    } catch (error) {
      // console.log('Camera Video cancelled-->', error)
      toast_error('Camera Video Closed')
    }
  }
}
