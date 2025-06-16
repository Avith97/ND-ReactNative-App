import AsyncStore from '../../data/async/AsyncStore'
import { handleInit } from '../../redux/actions/loading'
import { store } from '../../redux/store'
import { initiateFirebaseService } from '../../services/firebase'
import Strings from '../../utils/constants/Strings'
import HealthConnectService from './healthfunctions/HealthConnectService'
import { perform_login } from './login'

export const initiateApp = async () => {
  store.dispatch(handleInit(true))
  await Promise.all([
    initiateFirebaseService(),
    HealthConnectService.init(),
    retrieve_offline_data()
  ])
  store.dispatch(handleInit(false))
}

export const retrieve_offline_data = async () => {
  const data = await AsyncStore.getData(Strings.ASYNC_KEY.offline)
  console.log('offline data --->', data)
  if (data) {
    await perform_login(data?.auth, data?.user, (restore_offline = true))
  }
  return
}
