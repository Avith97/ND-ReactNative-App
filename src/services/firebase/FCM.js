// FirebasePushNotificationService.ts
import messaging, { requestPermission } from '@react-native-firebase/messaging'
import { Alert, Platform } from 'react-native'
import AndroidPermissions from '../../common/functions/permissions'
import { toast_success } from '../../common/components/toasts/handleToasts'
import { BackSync } from '../../common/functions/BackSync'

const FirebasePushNotificationService = {
  // Initialize the service
  init: async () => {
    globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
    await AndroidPermissions.requestPermission(AndroidPermissions.RECEIVE_PUSH_NOTIFICATIONS)
    await FirebasePushNotificationService.checkPermission()
    messaging().setOpenSettingsForNotificationsHandler()
    // FirebasePushNotificationService.createNotificationListeners()
  },

  // requestUserPermission: async () => {
  //   const authStatus = await messaging().hasPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Notification permission enabled');
  //   } else {
  //     console.log('Notification permission not granted');
  //     const authStatus = await messaging().requestPermission();
  //     console.log('Permission status:', authStatus);
  //   }
  // },   

  // Check if the user has granted notification permissions
  checkPermission: async () => {
    const authStatus = await messaging().hasPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      FirebasePushNotificationService.getToken()
      console.log('Notification permission enabled');
    } else {
      FirebasePushNotificationService.requestPermission()

    }
  },

  // Request notification permissions
  requestPermission: async () => {
    try {
      await messaging().requestPermission()
      FirebasePushNotificationService.getToken()
    } catch (error) {
      console.error('Permission denied:', error)
    }
  },

  // Get the device token
  getToken: async () => {
    const token = await messaging().getToken()
    global.fcm_token = token // Store the token globally if needed
    console.log('Device FCM Token:----> ', token)
    // Store or send this token to your server for push notifications
  },

  // Clear the device token
  clearToken: async () => {
    try {
      await messaging().deleteToken()
      console.log('FCM Token cleared')
    } catch (error) {
      console.error('Failed to clear FCM Token:', error)
    }
  },

  // Listen to incoming notifications
  createNotificationListeners: async () => {
    // Foreground notifications
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))

      toast_success({
        text1: remoteMessage.notification?.title || 'new notification !!',
        text2: remoteMessage.notification?.body || 'data of notification'
      })
    })

    // Background and quit state notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
      // You can handle background messages here
      BackSync.syncData(remoteMessage)
    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification: Notification caused app to open from quit state:',
            remoteMessage.notification
          )
        }
      })

    // When a notification is opened from the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: Notification caused app to open from background:',
          remoteMessage.notification
        )
        BackSync.syncData(remoteMessage)
        toast_success({
          text1: 'app open through notification click!!',
          text2: remoteMessage.notification?.body
        })
        // toast_success({
        //   text1: remoteMessage.notification?.title || 'app open through notification !!',
        //   text2: remoteMessage.notification?.body || 'data of notification'
        // })
      }
    })

    // await notifee.createChannel({
    //   id: 'your-channel-id',
    //   name: 'Default Channel'
    // })
  }
}

export default FirebasePushNotificationService
