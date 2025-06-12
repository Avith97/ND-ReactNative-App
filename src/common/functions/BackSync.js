import { services } from "../../services/axios/services";
import Strings from "../../utils/constants/Strings";
import { URL } from "../../utils/constants/Urls";

export const BackSync = {
    // Function to sync data with the backend
    syncData: async (params) => {
        try {
            // Simulate a network request to sync data
            console.log('before syncing data:', params?.data);
            if (params?.data?.action === 'trigger') {
                if (params.data?.action_type === 'POST_HEALTH_DATA') {
                    console.log('Syncing data with backend:', params.data);
                    await healthConnectSync();
                    console.log('Synced with backend:');
                }
            }
            else if (params?.data?.action === 'navigate') {
                navigateTo(params?.data?.screen)
            }
        } catch (error) {
            console.error('Failed to sync data:', error)
        }
    },

    // Function to clear local cache or state
    clearCache: async () => {
        try {
            console.log('Clearing local cache...')
        } catch (error) {
            console.error('Failed to clear local cache:', error)
        }
    }
}

export const healthConnectSync = async (params) => {
    try {
        let resp = await services._post(URL.otp, {
            userName: "vinit@anssoft.in",
            byEmail: true,
            byMobile: false,
        });
        console.log('resp in background--->', resp);
    } catch (error) {
        console.error('Failed to sync health data:===>', error)
    }
}

export const navigateTo = async (params) => {
    console.log('navigation in background--->', global.navigation);
    if (global.navigation) {
        global.navigation?.navigate(Strings.NAVIGATION.signup)
    } else {
        global.navigateTo = () => {
            global.navigation?.navigate(Strings.NAVIGATION.signup)
        }
    }
    return
}