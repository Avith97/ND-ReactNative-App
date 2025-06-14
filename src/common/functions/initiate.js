import { initiateFirebaseService } from '../../services/firebase'
import HealthConnectService from './healthfunctions/HealthConnectService'

export const initiateApp = async () => {
  initiateFirebaseService()
  HealthConnectService.init()
}
