import BackgroundFetch from "react-native-background-fetch";
// import { fetchHealthData } from "./healthService";

export const setupBackgroundSync = async () => {
    await BackgroundFetch.configure(
        {
            minimumFetchInterval: 15, // Runs every 15 mins
            stopOnTerminate: false, // Keep running after app kill
            startOnBoot: true, // Restart after device reboot
            enableHeadless: true, // Allow execution in background even if app is closed
            forceAlarmManager: true, // Ensures reliable scheduling on Android
        },
        async () => {
            console.log("Background Fetch triggered");
            // await fetchHealthData();
            BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        },
        (error) => {
            console.error("Background Fetch failed", error);
        }
    );

    BackgroundFetch.start();
};
