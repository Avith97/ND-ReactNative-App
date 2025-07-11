import Toast from 'react-native-toast-message'
import { toast_types } from './toast_types'
import { toast_styles } from './toast_styles'
import { hp } from '../../functions/dimensions'

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
    visibilityTime: 1000 * 10,
    position: 'bottom',
    bottomOffset: -hp(0),
    topOffset: 0,
    swipeable: false
  })
}

export const show_web_view_toast = (show, params = {}) => {
  if (!show) {
    Toast.hide()
    return
  }

  Toast.show({
    props: { ...params },
    type: toast_types.web_view,
    autoHide: true,
    visibilityTime: 10 * 1000,
    // position: 'top',
    bottomOffset: 20,
    topOffset: 0
  })
}

export const show_exit_bottom_sheet = hide => {
  console.log('exit_bottom_sheet called', hide)

  if (hide) {
    Toast.hide()
    return
  }
  Toast.show({
    type: toast_types.exit_bottom_sheet,
    // type: 'success',
    autoHide: true,
    visibilityTime: 1000 * 10,
    position: 'bottom',
    bottomOffset: -hp(0),
    topOffset: 0,
    swipeable: false
  })
}
