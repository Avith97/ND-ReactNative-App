import { Text, View } from 'react-native'
import { BaseToast, ErrorToast } from 'react-native-toast-message'
import { fontSize } from '../../../utils/constants/Fonts'
import CustomBottomSheet from '../bottomsheet/CustomBottomSheet'
import LogoutBottomSheet from '../bottomsheet/LogoutBottomSheet'
import WebViewToast from '../policy/WebViewToast'
import { hp, wp } from '../../functions/dimensions'
import { ToastComponent } from './ToastComponent'
import ExitAppBottomSheet from '../bottomsheet/ExitAppBottomSheet'

export const toast_config = {
  success: props => <ToastComponent type={'success'} {...props} />,
  error: props => <ToastComponent type={'error'} {...props} />,

  info: props => <ToastComponent type={'info'} {...props} />,

  // custom toast
  // tomato_toast: ({ text1, props }) => (
  //   <View style={{ height: 60, width: '90%', backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // ),

  bottom_sheet: props => <CustomBottomSheet {...props} />,

  logout_bottomsheet: props => <LogoutBottomSheet {...props} />,

  web_view: props => <WebViewToast {...props} />,

  transparent_layer: props => (
    <View
      style={{
        height: hp(100),
        width: wp(100),
        backgroundColor: 'rgba(0,0,0,0.01)'
      }}
    />
  ),

  exit_bottom_sheet: props => <ExitAppBottomSheet {...props} />
}
