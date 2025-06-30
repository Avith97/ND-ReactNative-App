// // FirebaseCrashlyticsService.ts
// import crashlytics from '@react-native-firebase/crashlytics'

// const FirebaseCrashlyticsService = {
//   // Initialize the service
//   init: () => {
//     crashlytics().setCrashlyticsCollectionEnabled(true)
//     console.log('Crashlytics initialized')
//   },

//   // Set up Crashlytics configuration
//   // setUpCrashlytics: function (): void {

//   // },

//   // Log a custom error message
//   logError: message => {
//     crashlytics().log(message)
//     console.log('Logged error message:', message)
//   },

//   // Record a non-fatal error (exception)
//   recordError: error => {
//     crashlytics().recordError(error)
//     console.log('Recorded non-fatal error:', error.message)
//   },

//   // Force a crash for testing purposes
//   forceCrash: () => {
//     crashlytics().crash()
//   }
// }

// export default FirebaseCrashlyticsService
