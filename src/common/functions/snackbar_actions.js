import Snackbar from 'react-native-snackbar'
import Colors from '../../utils/constants/Colors'

export const appsnackbar = {
  showErrMsg: (msg = String, ...props) => {
    Snackbar.show({
      text: msg,
      textColor: Colors.white,
      backgroundColor: Colors.SnackBarErr,
      duration: Snackbar.LENGTH_SHORT,
      ...props
      // fontFamily: Fonts.medium
    })
  },
  showSuccessMsg: (msg = String, ...props) => {
    Snackbar.show({
      text: msg,
      textColor: Colors.white,
      backgroundColor: Colors.SnackBarSuccess,
      duration: Snackbar.LENGTH_SHORT,
      ...props
      // fontFamily: Fonts.medium
    })
  },
  showWarningMsg: (msg = String, ...props) => {
    Snackbar.show({
      text: msg,
      textColor: Colors.white,
      backgroundColor: Colors.SnackBarWarn,
      duration: Snackbar.LENGTH_SHORT,
      ...props
      // fontFamily: Fonts.medium
    })
  },
  showInfoMsg: (msg = String, ...props) => {
    Snackbar.show({
      text: msg,
      textColor: Colors.white,
      backgroundColor: Colors.SnackBarInfo,
      duration: Snackbar.LENGTH_SHORT,
      ...props
      // fontFamily: Fonts.medium
    })
  },
  showWithAction: (msg = String, action = Function, ...props) => {}
}
