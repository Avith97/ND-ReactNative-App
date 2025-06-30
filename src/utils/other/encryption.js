// import CryptoJS from 'crypto-js';
import CryptoJS from 'react-native-crypto-js'

export const EncryptionService = {
  // Method to encrypt data using AES-256
  encrypt: data => {
    try {
      if (data) {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          EncryptionService.e_k,
          EncryptionService.Encryption_Config
        )?.toString()
        return encryptedData
      }
    } catch (error) {
      console.error('Error encrypting data:', error)
      return null
    }
  },

  // Method to decrypt data using AES-256
  decrypt: encryptedData => {
    try {
      if (encryptedData) {
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedData,
          EncryptionService.e_k,
          EncryptionService.Encryption_Config
        )?.toString(CryptoJS.enc.Utf8)
        return decryptedData
      }
    } catch (error) {
      console.error('Error decrypting data:', error)
      return null
    }
  },
  Encryption_Config: {
    keySize: 128 / 8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse('nda_@3%%^!!@2025')
  },
  e_k: CryptoJS.enc.Utf8.parse('_@3ndevil^!@2025')
}
