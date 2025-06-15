import AsyncStore from '../../data/async/AsyncStore'
import { initiateFirebaseService } from '../../services/firebase'
import Strings from '../../utils/constants/Strings'
import HealthConnectService from './healthfunctions/HealthConnectService'
import { perform_login } from './login'

export const initiateApp = async () => {
  initiateFirebaseService()
  HealthConnectService.init()
  retrieve_offline_data()
}

export const retrieve_offline_data = async () => {
  const data = await AsyncStore.getData(Strings.ASYNC_KEY.offline)
  console.log('offline data --->', data)
  if (data) {
    await perform_login(data?.auth, data?.user, (restore_offline = true))
  }
}
