import AsyncStorage from '@react-native-async-storage/async-storage'
import { EncryptionService } from '../../utils/other/encryption'

const AsyncStore = {
  setData: async (key, value) => {
    try {
      // const jsonValue = JSON.stringify(value);
      const e_d = EncryptionService.encrypt(value)
      await AsyncStorage.setItem(key, e_d)
    } catch (error) {
      console.error('Error saving data:', error)
      // Handle errors here (e.g., show an alert)
    }
  },

  getData: async key => {
    try {
      let data = await AsyncStorage.getItem(key)
      data = EncryptionService.decrypt(data)
      return data != null ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error retrieving data:', error)
      // Handle errors here (e.g., show an alert)
    }
  },
  updateData: async (key, obj) => {
    try {
      let data = await AsyncStorage.getItem(key)
      data = EncryptionService.decrypt(data)
      data = JSON.parse(data)
      if (data) {
        data = { ...data, ...obj }
        await AsyncStore.setData(key, data)
      }
      return data != null ? true : false
    } catch (error) {
      console.error('Error retrieving data:', error)
      return false
      // Handle errors here (e.g., show an alert)
    }
  },

  clearData: async key => {
    await AsyncStorage.removeItem(key)
    // console.log(`Item with key ${key} removed`)
    return
  }
}

export default AsyncStore
