import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import {
  openHealthConnectDataManagement,
  openHealthConnectSettings
} from 'react-native-health-connect'

const AndroidPermissions = {
  requestPermission: async (permission, title) => {
    if (Platform.OS !== 'android') {
      return
    }
    try {
      const granted = await PermissionsAndroid.request(permission)
      console.log('permission result ===>', granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission} permission granted`)
        return true
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        await AndroidPermissions.requestAgain(permission, title)
      } else {
        console.log(`${permission} permission denied`)
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  },
  requestAgain: async (permission, title) => {
    if (Platform.OS !== 'android') {
      return
    }
    try {
      Alert.alert(
        'Permission Required',
        `This app requires ${title} permission to function properly.`,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Allow',
            onPress: async () => {
              if (permission === AndroidPermissions.HEALTH_CONNECT) {
                openHealthConnectSettings()
                // openHealthConnectDataManagement()
              } else {
                Linking.openSettings()
              }
            }
          }
        ]
      )
    } catch (err) {
      console.warn(err)
    }
  },
  HEALTH_CONNECT: PermissionsAndroid.PERMISSIONS.HEALTH_CONNECT,
  HEALTH_CONNECT_READ_BACKGROUND:
    'android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND',
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
