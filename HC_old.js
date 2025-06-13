// import {
//     readRecord,
//     initialize,
//     requestPermission,


// } from "react-native-health-connect";
// // import axios from "axios";

// const healthConnect = new HealthConnect();

// export const initHealthConnect = async () => {
//     try {
// const granted = await requestPermission([
//     "steps",
//     "heart_rate",
// ]);

// if (!granted) {
//     console.log("Health Connect permission denied");
//     return;
// }

//         console.log("Health Connect initialized");
//     } catch (error) {
//         console.error("Health Connect init error:", error);
//     }
// };

// export const fetchHealthData = async () => {
//     try {
// const stepsData = await readRecord({
//     recordType: "steps",
//     timeRangeFilter: {
//         startTime: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
//         endTime: new Date().toISOString(),
//     },
// });

//         const heartRateData = await healthConnect.getRecords({
//             recordType: "heart_rate",
//             timeRangeFilter: {
//                 startTime: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
//                 endTime: new Date().toISOString(),
//             },
//         });

//         const steps = stepsData.records.map((r) => ({
//             count: r.count,
//             timestamp: r.startTime,
//         }));

//         const heartRate = heartRateData.records.map((r) => ({
//             bpm: r.beatsPerMinute,
//             timestamp: r.startTime,
//         }));

//         // Send to private server
//         // await axios.post("https://your-private-server.com/api/sync", {
//         //     steps,
//         //     heartRate,
//         // });

//         console.log("Health data synced successfully");
//     } catch (error) {
//         console.error("Error fetching Health Connect data:", error);
//     }
// };
