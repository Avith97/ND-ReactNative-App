// // FirebaseAnalyticsService.ts
// import analytics from '@react-native-firebase/analytics'

// const FirebaseAnalyticsService = {
//   // Initialize the service
//   init: () => {
//     FirebaseAnalyticsService.setAnalyticsCollectionEnabled()
//   },

//   // Enable or disable analytics data collection
//   setAnalyticsCollectionEnabled: (enabled = true) => {
//     analytics().setAnalyticsCollectionEnabled(enabled)
//     console.log('Analytics collection', enabled ? 'enabled' : 'disabled')
//   },

//   // Log an event
//   logEvent: async (eventName, params) => {
//     await analytics().logEvent(eventName, params)
//     console.log(`Logged event: ${eventName}`, params)
//   },
//   logScreen: (sClass, sName) => {
//     analytics().logScreenView({
//       screen_class: sClass,
//       screen_name: sName
//     })
//   },

//   // Set user properties
//   setUserProperty: async (name, value) => {
//     await analytics().setUserProperty(name, value)
//     console.log(`Set user property: ${name} = ${value}`)
//   },

//   // Set user ID
//   setUserId: async userId => {
//     await analytics().setUserId(userId)
//     console.log(`Set user ID: ${userId}`)
//   }
// }

// export default FirebaseAnalyticsService
