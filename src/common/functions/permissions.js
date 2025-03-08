import { PermissionsAndroid } from 'react-native'

const AndroidPermissions = {
  requestPermission: async permission => {
    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: `${permission} Permission`,
        message: `This app needs access to your ${permission.toLowerCase()}.`,
        buttonPositive: 'OK'
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission} permission granted`)
        return true
      } else {
        console.log(`${permission} permission denied`)
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  },
  HEALTH_CONNECT: PermissionsAndroid.PERMISSIONS.HEALTH_CONNECT,
  // READ_STEPS: PermissionsAndroid.PERMISSIONS.health.READ_STEPS,

  CAMERA: PermissionsAndroid.PERMISSIONS.CAMERA,
  WRITE_EXTERNAL_STORAGE: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  READ_EXTERNAL_STORAGE: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  ACCESS_FINE_LOCATION: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ACCESS_COARSE_LOCATION: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  RECORD_AUDIO: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  READ_CONTACTS: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  WRITE_CONTACTS: PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
  READ_CALENDAR: PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
  WRITE_CALENDAR: PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
  // Add more permissions as needed
  RECEIVE_PUSH_NOTIFICATIONS: PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, // Assuming RECEIVE_WAP_PUSH is used for push notifications
  READ_MEDIA_IMAGES: PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
}

export default AndroidPermissions
