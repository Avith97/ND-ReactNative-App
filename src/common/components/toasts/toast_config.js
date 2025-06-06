import { Text, View } from 'react-native'
import { BaseToast, ErrorToast } from 'react-native-toast-message'
import { fontSize } from '../../../utils/constants/Fonts'
import CustomBottomSheet from '../bottomsheet/CustomBottomSheet'
import LogoutBottomSheet from '../bottomsheet/LogoutBottomSheet'

export const toast_config = {
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'lightgreen' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: fontSize.m
        // fontWeight: '400'
      }}
      text2Style={{
        fontSize: fontSize.normal
        // fontWeight: '400'
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  // custom toast
  tomato_toast: ({ text1, props }) => (
    <View style={{ height: 60, width: '90%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),

  bottom_sheet: props => <CustomBottomSheet {...props} />,

  logout_bottomsheet: props => <LogoutBottomSheet {...props} />
}
