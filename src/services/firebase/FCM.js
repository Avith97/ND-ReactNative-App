// FirebasePushNotificationService.ts
import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'
// import Toast from 'react-native-toast-message'
// import { toast_success } from '../../common/components/toasts/handleToasts'
// import notifee, { AndroidStyle, EventType } from '@notifee/react-native'

const FirebasePushNotificationService = {
  // Initialize the service
  init: async () => {
    await FirebasePushNotificationService.checkPermission()
    FirebasePushNotificationService.createNotificationListeners()
  },

  // Check if the user has granted notification permissions
  checkPermission: async () => {
    const enabled = await messaging().hasPermission()
    if (enabled) {
      FirebasePushNotificationService.getToken()
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
      // await notifee.displayNotification({
      //   title: remoteMessage.notification?.title,
      //   body: remoteMessage.notification?.body,
      //   android: {
      //     channelId: 'your-channel-id',
      //     pressAction: {
      //       id: 'default',
      //     },
      //     actions: [
      //       {
      //         title: 'Watch Highlights',
      //         pressAction: { id: 'watch-highlights' },
      //       },
      //       {
      //         title: 'Dismiss',
      //         pressAction: { id: 'dismiss' },
      //       },
      //     ],
      //   },
      // });
      // Alert.alert('New Notification', remoteMessage.notification?.title || '');
      // toast_success({
      //   text1: remoteMessage.notification?.title || 'new notification !!',
      //   text2: remoteMessage.notification?.body || 'data of notification'
      // })
    })

    // Background and quit state notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
      // notifee.onBackgroundEvent
      // notifee.displayNotification({
      //   title: remoteMessage.notification.title,
      //   body: remoteMessage.notification.body,
      //   android: {
      //     channelId: 'your-channel-id',
      //     // smallIcon: "https://www.creativehatti.com/wp-content/uploads/edd/2022/06/Flyer-template-for-invest-in-mutual-funds-11-large.jpg",
      //     style: {
      //       type: AndroidStyle.BIGPICTURE,
      //       picture:
      //         'https://www.creativehatti.com/wp-content/uploads/edd/2022/06/Flyer-template-for-invest-in-mutual-funds-11-large.jpg'
      //     },
      //     actions: [
      //       {
      //         title: 'Watch Highlights',
      //         pressAction: { id: 'watch-highlights' }
      //       },
      //       {
      //         title: 'Dismiss',
      //         pressAction: { id: 'dismiss' }
      //       }
      //     ]
      //   }
      // })
    })
    // notifee.onBackgroundEvent(async e => {
    //   let remoteMessage = e.detail.notification
    //   notifee.displayNotification({
    //     title: 'Image uploaded',
    //     body: 'Your image has been successfully uploaded',
    //     android: {
    //       channelId,
    //       style: { type: AndroidStyle.BIGPICTURE, picture: 'https://my-cdn.com/user/123/upload/456.png' },
    //     },
    //   });
    //   // await notifee.displayNotification({
    //   //   title: remoteMessage.data?.title,
    //   //   body: remoteMessage.data?.body,
    //   //   // image: remoteMessage.data?.image,
    //   //   android: {
    //   //     channelId: 'your-channel-id',
    //   //     pressAction: {
    //   //       id: 'default',
    //   //     },
    //   //     style: {
    //   //       type: AndroidStyle.BIGPICTURE,
    //   //       picture: "https://www.creativehatti.com/wp-content/uploads/edd/2022/06/Flyer-template-for-invest-in-mutual-funds-11-large.jpg" // Full-width image

    //   //     },
    //   //     // largeIcon: remoteMessage?.data?.image,
    // actions: [
    //   {
    //     title: 'Watch Highlights',
    //     pressAction: { id: 'watch-highlights' },
    //   },
    //   {
    //     title: 'Dismiss',
    //     pressAction: { id: 'dismiss' },
    //   },
    // ],
    //   //   },
    //   // });
    // })

    // When a notification is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          )
        }
      })

    // When a notification is opened from the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background:',
          remoteMessage.notification
        )
      }
    })

    // await notifee.createChannel({
    //   id: 'your-channel-id',
    //   name: 'Default Channel'
    // })
  }
}

export default FirebasePushNotificationService
