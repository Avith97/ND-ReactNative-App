// import FirebaseAnalyticsService from './analytics'
// import FirebaseCrashlyticsService from './crashylytics'
import FirebasePushNotificationService from './FCM'

export const initiateFirebaseService = () => {
  FirebasePushNotificationService.init()
  // FirebaseAnalyticsService.init()
  // FirebaseCrashlyticsService.init()
}
