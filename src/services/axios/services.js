import axios from 'axios';
import {store} from '../../redux/store';
import Snackbar from 'react-native-snackbar';
import Fonts from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import {handleSync} from '../../redux/actions/loading';
import Strings from '../../utils/constants/Strings';
import {BASE_URL} from '../../utils/constants/Urls';
import {environment} from '../../../settings';

const api = {
  //normal request
  _axios: axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
  }),

  //form request
  _axiosFormData: axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    timeout: 10000, // 10 seconds timeout
  }),

  refreshInstance: token => {
    console.log('access token --->', store.getState().auth.token);
    api._axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });
  },

  _redirectToLogin: _params => {
    global.navigation.reset({
      index: 0,
      routes: [{name: Strings.NAVIGATION.auth}],
    });
    global.ToastShort('Your session is expired. Please login again.');
  },

  _handleResponse: async response => {
    if (response.status === 204 && response.data === '') {
      return {
        type: 'other',
        data: response.data,
        api_response: {...response},
      };
    }
    return {
      type: 'success',
      data: response.data,
      api_response: {...response},
    };
  },

  _handleError: async error => {
    console.log('handle err called--->', error);

    const originalConfig = error.config;
    if (originalConfig && originalConfig._retry === undefined) {
      originalConfig._retry = false;
    }
    if (error.response) {
      if (
        JSON.parse(JSON.stringify(error)).status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        // return
        try {
          let oldRefreshToken = store.getState().auth.refresh_token;
          const refreshToken = await authenticationService.getRefreshToken({
            refreshToken: oldRefreshToken,
          });
          // console.log('new token from refreshed --->',refreshToken)
          const {accessToken} = refreshToken?.data || refreshToken;
          console.log('new token from refreshed --->', accessToken);

          // await update_token(accessToken) //update token at redux &asyncstore
          if (__DEV__) {
          }
          // Update the original request with the new token
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          api.refreshInstance(accessToken);

          const newResp = await axios(originalConfig); //recall same request

          if (newResp.status === 204 && newResp.data === '') {
            return {
              type: 'other',
              data: newResp.data,
              api_response: {...newResp},
            };
          }
          return {
            type: 'success',
            data: newResp.data,
            api_response: {...newResp},
          };
          // return axios(originalConfig) //recall same request
        } catch (_error) {
          // return Promise.reject(_error?.response || _error);
          return {
            type: 'error',
            error_data: error?.response?.data,
            error_config: {...error},
          };
        }
      } else if (
        JSON.parse(JSON.stringify(error)).status === 403 &&
        JSON.parse(JSON.stringify(error))?.config?.url ===
          'v1/auth/refreshtoken'
      ) {
        // show session timeout toast
        api._redirectToLogin(); // navigate to login page
        return {
          type: 'error',
          error_data: error?.response?.data,
          error_config: {...error},
        };
      }
    }
    if (JSON.parse(JSON.stringify(error)).status === 500) {
      console.log('handle err 500', error);

      return {
        type: 'error',
        error_data: error?.response?.data,
        error_config: {...error},
      };
    }
    if (error.response && error.response.data) {
      return {
        type: 'error',
        error_data: error?.response?.data,
        error_config: {...error},
      };
    }

    return {
      type: 'error',
      error_data: error?.response?.data,
      error_config: {...error},
    };
  },

  _handleDownload: async resp => {
    console.log('handle download', resp);
    if (resp.statusCode === 200) {
      Snackbar.show({
        text: 'Successfully downloaded',
        fontFamily: Fonts.regular,
        textColor: Colors.white,
        backgroundColor: Colors.SnackBarSuccess,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      Snackbar.show({
        text: 'Something went wrong...',
        fontFamily: Fonts.regular,
        textColor: Colors.white,
        backgroundColor: Colors.SnackBarErr,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    return resp.statusCode;
  },
  _handleDownloadErr: async resp => {
    console.log('_handleDownloadErr -->', JSON.parse(JSON.stringify(resp)));
    Snackbar.show({
      text: 'Something went wrong...',
      fontFamily: Fonts.regular,
      textColor: Colors.white,
      backgroundColor: Colors.SnackBarErr,
      duration: Snackbar.LENGTH_SHORT,
    });
    return resp.statusCode;
  },

  _get: async (url, config = {}) => {
    store.dispatch(handleSync(true));
    return api._axios
      .get(`${url}`, {...config})
      .then(api._handleResponse)
      .catch(api._handleError)
      .finally(() => store.dispatch(handleSync(false)));
  },

  _post: async (url, data = {}, config = {}) => {
    store.dispatch(handleSync(true));
    return api._axios
      .post(`${url}`, data, config)
      .then(api._handleResponse)
      .catch(api._handleError)
      .finally(() => store.dispatch(handleSync(false)));
  },

  _postFormData: async (url, data = {}, config = {}) => {
    store.dispatch(handleSync(true));
    return api._axiosFormData
      .post(`${url}`, data, config)
      .then(api._handleResponse)
      .catch(api._handleError)
      .finally(() => store.dispatch(handleSync(false)));
  },

  _put: async (url, data = {}) => {
    store.dispatch(handleSync(true));
    return api._axios
      .put(`${url}`, data)
      .then(api._handleResponse)
      .catch(api._handleError)
      .finally(() => store.dispatch(handleSync(false)));
  },

  _delete: async (url, payload = {}, config = {}) => {
    store.dispatch(handleSync(true));
    return api._axios
      .delete(url, {
        ...config,
        data: payload,
      })
      .then(api._handleResponse)
      .catch(api._handleError)
      .finally(() => store.dispatch(handleSync(false)));
  },
  _download: async ({endpoint = String, filename = String}) => {},
};

export {api as services};
