import HealthConnect, {
  isAvailable,
  requestPermission,
  readRecords,
  getGrantedPermissions,
  deleteRecords,
} from 'react-native-health-connect';

const permissions = [
  {accessType: 'read', recordType: 'Steps'},
  {accessType: 'read', recordType: 'HeartRate'},
  {accessType: 'read', recordType: 'SleepSession'},
  {accessType: 'read', recordType: 'Distance'},
  {accessType: 'read', recordType: 'ActiveCaloriesBurned'},
];

const HealthConnectService = {
  /**
   * Check if Health Connect is available on the device
   */
  checkAvailability: async () => {
    try {
      return await isAvailable();
    } catch (error) {
      console.error('HealthConnect availability error:', error);
      return false;
    }
  },

  /**
   * Request required permissions from the user
   */
  requestPermissions: async () => {
    try {
      await requestPermission(permissions);
      return true;
    } catch (error) {
      console.error('HealthConnect permission error:', error);
      return false;
    }
  },

  /**
   * Get granted permissions
   */
  getGrantedPermissions: async () => {
    try {
      return await getGrantedPermissions();
    } catch (error) {
      console.error('HealthConnect getGrantedPermissions error:', error);
      return null;
    }
  },

  /**
   * Read Steps data
   */
  getSteps: async (startDate, endDate) => {
    try {
      const data = await readRecords('Steps', {
        startTime: startDate,
        endTime: endDate,
      });
      return data;
    } catch (error) {
      console.error('getSteps error:', error);
      return [];
    }
  },

  /**
   * Read Heart Rate data
   */
  getHeartRate: async (startDate, endDate) => {
    try {
      const data = await readRecords('HeartRate', {
        startTime: startDate,
        endTime: endDate,
      });
      return data;
    } catch (error) {
      console.error('getHeartRate error:', error);
      return [];
    }
  },

  /**
   * Read Sleep Session data
   */
  getSleepData: async (startDate, endDate) => {
    try {
      const data = await readRecords('SleepSession', {
        startTime: startDate,
        endTime: endDate,
      });
      return data;
    } catch (error) {
      console.error('getSleepData error:', error);
      return [];
    }
  },

  /**
   * Read Distance data
   */
  getDistance: async (startDate, endDate) => {
    try {
      const data = await readRecords('Distance', {
        startTime: startDate,
        endTime: endDate,
      });
      return data;
    } catch (error) {
      console.error('getDistance error:', error);
      return [];
    }
  },

  /**
   * Read Active Calories Burned
   */
  getActiveCaloriesBurned: async (startDate, endDate) => {
    try {
      const data = await readRecords('ActiveCaloriesBurned', {
        startTime: startDate,
        endTime: endDate,
      });
      return data;
    } catch (error) {
      console.error('getActiveCaloriesBurned error:', error);
      return [];
    }
  },

  /**
   * Optionally, delete records (useful for dev/test apps)
   */
  deleteRecordsByTimeRange: async (recordType, startDate, endDate) => {
    try {
      await deleteRecords(recordType, {
        startTime: startDate,
        endTime: endDate,
      });
      return true;
    } catch (error) {
      console.error('deleteRecords error:', error);
      return false;
    }
  },
};

export default HealthConnectService;
