import Toast from 'react-native-toast-message'
import { toast_types } from './toast_types'
import { toast_styles } from './toast_styles'


export const toast_success = params => {
  Toast.show({
    type: 'success',
    text1: 'Done', //header
    text2: 'sample test', //info
    text1Style: { ...toast_styles.header },
    text2Style: { ...toast_styles.info },
    ...params
  })
}

export const toast_error = params => {
  Toast.show({
    type: 'error',
    text1: 'Something went wrong !!', //header
    // text2: "sample test",//info,
    text1Style: { ...toast_styles.header },
    text2Style: { ...toast_styles.info },
    ...params
  })
}

export const toast_info = params => {
  Toast.show({
    type: 'info',
    // text1: '', //header
    // text2: "sample test",//info,
    text1Style: { ...toast_styles.header },
    text2Style: { ...toast_styles.info },
    ...params
  })
}

export const indicate_session_timeout = () => {
  Toast.show({
    type: 'error',
    text1: 'Session timeout!!', //header
    text2: "'Your session is expired !!'", //info,
    autoHide: false,
    swipeable: true,
    position: 'bottom'
  })
}

export const handle_bottom_sheet = ({ show, ...props }) => {
  if (show) {
    Toast.show({
      type: toast_types.bottom_sheet,
      position: 'bottom',
      bottomOffset: 0,
      swipeable: false,
      // autoHide: false,
      visibilityTime: 1000 * 8,
      props: { ...props }
    })
  } else {
    Toast.hide()
  }
}

export const open_logout_bottom_sheet = hide => {
  if (hide) {
    Toast.hide()
    return
  }
  Toast.show({
    type: toast_types.logout_bottomsheet,
    autoHide: true,
    position: 'bottom',
    bottomOffset: 20,
    topOffset: 0
  })
}
