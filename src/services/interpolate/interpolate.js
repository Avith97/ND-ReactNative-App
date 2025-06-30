import { BASE_URL } from '../../utils/constants/Urls'

export const interPolate = {
  base_url: endpoint => {
    return BASE_URL.replace('/api/v1/', '/') + endpoint
  }
}
