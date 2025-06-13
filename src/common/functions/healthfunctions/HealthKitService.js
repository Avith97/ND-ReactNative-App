// import AppleHealthKit from 'react-native-health';

// const PERMS = AppleHealthKit.Constants.Permissions;

// const healthKitOptions = {
//   permissions: {
//     read: [
//       PERMS.StepCount,
//       PERMS.HeartRate,
//       PERMS.SleepAnalysis,
//       PERMS.DistanceWalkingRunning,
//       PERMS.ActiveEnergyBurned,
//     ],
//     write: [],
//   },
// };

// const HealthKitService = {
//   /**
//    * Initialize HealthKit
//    */
//   init: () =>
//     new Promise((resolve, reject) => {
//       AppleHealthKit.initHealthKit(healthKitOptions, (err) => {
//         if (err) {
//           console.error('[HealthKit Init Error]:', err);
//           reject(err);
//         } else {
//           resolve(true);
//         }
//       });
//     }),

//   /**
//    * Get step count for a given date
//    */
//   getStepCount: async (date = new Date()) => {
//     const options = {
//       date: date.toISOString(),
//     };
//     return new Promise((resolve, reject) => {
//       AppleHealthKit.getStepCount(options, (err, results) => {
//         if (err) {
//           console.error('[getStepCount Error]:', err);
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   },

//   /**
//    * Get heart rate samples between dates
//    */
//   getHeartRate: async (startDate, endDate = new Date()) => {
//     const options = {
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     };
//     return new Promise((resolve, reject) => {
//       AppleHealthKit.getHeartRateSamples(options, (err, results) => {
//         if (err) {
//           console.error('[getHeartRate Error]:', err);
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   },

//   /**
//    * Get sleep data between dates
//    */
//   getSleepData: async (startDate, endDate = new Date()) => {
//     const options = {
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     };
//     return new Promise((resolve, reject) => {
//       AppleHealthKit.getSleepSamples(options, (err, results) => {
//         if (err) {
//           console.error('[getSleepData Error]:', err);
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   },

//   /**
//    * Get distance walked/run
//    */
//   getDistanceWalkingRunning: async (startDate, endDate = new Date()) => {
//     const options = {
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     };
//     return new Promise((resolve, reject) => {
//       AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
//         if (err) {
//           console.error('[getDistanceWalkingRunning Error]:', err);
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   },

//   /**
//    * Get active energy burned (calories)
//    */
//   getActiveEnergyBurned: async (startDate, endDate = new Date()) => {
//     const options = {
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     };
//     return new Promise((resolve, reject) => {
//       AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
//         if (err) {
//           console.error('[getActiveEnergyBurned Error]:', err);
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   },
// };

// export default HealthKitService;
