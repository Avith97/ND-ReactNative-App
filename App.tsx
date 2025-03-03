// import React, { useEffect } from "react";
// import { View, Text, Platform } from "react-native";
// import RNForegroundService from "react-native-foreground-service";
// import {  fetchHealthData, initHealthConnect } from "./healthService";
// import { setupBackgroundSync } from "./backgroundSync";

// const App = () => {
//   useEffect(() => {
//     // Start Foreground Service (Only for Android)
//     if (Platform .OS === "android") {
//       // RNForegroundService.start({
//       //   id: 1,
//       //   title: "Health Sync Running",
//       //   message: "Syncing data in background...",
//       // });
//     }

//     initHealthConnect();
//     setupBackgroundSync();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Health Sync App</Text>
//       <Text>Running in Background...</Text>
//     </View>
//   );
// };

// export default App;


import React, { useEffect } from "react";
import { View, Text, AppState, Platform, Vibration, Button, Alert } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import BackgroundTimer from "react-native-background-timer";
// import HealthConnect,{ initialize, openHealthConnectDataManagement, readRecord, readRecords, requestPermission, SdkAvailabilityStatus } from "react-native-health-connect";

import { 
  initialize, 
  getSdkStatus, 
  requestPermission, 
  readRecords, 
  openHealthConnectDataManagement, 
  openHealthConnectSettings
} from "react-native-health-connect";
import HealthScreen from "./Healthconnect";
// Define a vibration pattern: vibrate for 500ms, pause for 1 second, then vibrate for 500ms again
const VIBRATION_PATTERN = [500, 1000, 500]; 

// Function to start vibration loop when the app is running in the foreground
const startVibrationLoop = () => {
  if (Platform.OS === "android") {  // Ensure this runs only on Android
    BackgroundTimer.runBackgroundTimer(() => {
      Vibration.vibrate(VIBRATION_PATTERN); // Trigger vibration based on the defined pattern
      console.log("Vibrating...");
    }, 30000); // Repeat every 30 seconds
  }
};

// Function to stop the vibration loop
const stopVibrationLoop = () => {
  BackgroundTimer.stopBackgroundTimer(); // Stops the background timer
};

// Function to set up background fetch for running tasks in the background
const setupBackgroundFetch = async () => {
  await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // Set background fetch interval to 1 minute (may vary based on OS behavior)
      stopOnTerminate: false, // Ensures background fetch runs even if the app is terminated
      startOnBoot: true, // Ensures background fetch starts when the device boots up
      enableHeadless: true, // Allows background tasks to run even if the app is not active
    },
    async (taskId) => {
      console.log("Background fetch executed:", taskId); // Log when background fetch is executed
      Vibration.vibrate(VIBRATION_PATTERN); // Trigger vibration when the background fetch executes
      BackgroundFetch.finish(taskId); // Notify the system that the background task is complete
    },
    async (taskId) => {
      console.log("Background fetch timeout:", taskId); // Log if the task times out
      BackgroundFetch.finish(taskId); // Mark the background task as finished
    }
  );
};

// Function to trigger vibration manually when the button is pressed
// const vibrate = async() => {
//   Vibration.vibrate(VIBRATION_PATTERN);
 
//   // await initialize().catch(e=>console.log('errir err--->',e))
// // openHealthConnectDataManagement()

//   try {
// const isAvailable = await HealthConnect.hea.isAvailable();
//     const granted = await requestPermission([
//             "steps",
//             "heart_rate",
//         ]);

//         if (!granted) {
//             console.log("Health Connect permission denied");
//             return;
//         } else {

          
//           const stepsData = await readRecords("Steps", { timeRangeFilter: 'last24Hours' });
//           console.log('steps data -->',stepsData)
//         }
//   } catch (error) {
//     console.log('health err--->',error)
//   }
  
  
// };


const vibrate = async () => {
  try {
    Vibration.vibrate(VIBRATION_PATTERN);
    
try {
        const sdkStatus = await getSdkStatus();
        console.log("Health Connect SDK Status -->", sdkStatus);

        switch (sdkStatus) {
            case 0:
                console.log("✅ Health Connect is available!");
                break;
            case 1:
                console.log("⚠️ Health Connect is not installed.");
                openHealthConnectSettings();
                return;
            case 2:
                console.log("⚠️ Health Connect is not up to date.");
                openHealthConnectSettings();
                return;
            case 3:
                console.log("🚨 No permission to use Health Connect.");
                return;
            case 4:
                console.log("⚠️ Health Connect not supported on this device.");
                return;
            default:
                console.log("❌ Unknown Health Connect status.");
                return;
        }

        // Initialize Health Connect
        const initialized = await initialize();
        console.log("Health Connect Initialized:", initialized);
    } catch (error) {
        console.error("Error checking Health Connect:", error);
    }
    // ✅ Check SDK Status
    // const sdkStatus = await getSdkStatus();
    // console.log('sdk status -->',sdkStatus)
    // if (sdkStatus !== 0) { // Adjust this condition based on the correct status codes
    //   console.log("Health Connect is not available or needs installation.");
    //   openHealthConnectDataManagement(); // Opens Health Connect data settings
    //   return;
    // }

    // ✅ Initialize Health Connect
    const isInitialized = await initialize();
    if (!isInitialized) {
      console.log("Health Connect initialization failed.");
      return;
    }

    // ✅ Request necessary permissions
    const grantedPermissions = await requestPermission(["steps", "heart_rate"]);
    if (grantedPermissions.length === 0) {
      console.log("Health Connect permission denied.");
      return;
    }

    // ✅ Define a valid time range (Last 24 Hours)
    const endTime = new Date(); // Current time
    const startTime = new Date();
    startTime.setDate(endTime.getDate() - 1); // 24 hours ago

    // ✅ Read Step Data
    const stepsData = await readRecords("Steps", {
      timeRangeFilter: { startTime, endTime },
    });
Alert.alert('msg',JSON.stringify(stepsData))
    console.log("Steps Data:", stepsData);

  } catch (error) {
    console.log("Health Connect Error --->", error);
  }
};


// Main app component
const App = () => {
  useEffect(() => {
    initialize()
    // setupBackgroundFetch(); // Initialize background fetch when the app loads

    // // Listen to app state changes (foreground or background)
    // const appStateListener = AppState.addEventListener("change", (state) => {
    //   if (state === "active") { // If the app comes to the foreground
    //     console.log("App in foreground, starting vibration.");
    //     startVibrationLoop(); // Start the vibration loop
    //   } else { // If the app moves to the background
    //     console.log("App in background, stopping vibration.");
    //     stopVibrationLoop(); // Stop the vibration loop
    //   }
    // });

    // // Cleanup the event listener when the component unmounts
    // return () => appStateListener.remove();
  }, []);

  return (
    <View>
      {/* <Text>Vibration Service Running</Text>
      <Button title="Vibration" onPress={vibrate} /> */}
      <HealthScreen/>
    </View>
  );
};

export default App;
