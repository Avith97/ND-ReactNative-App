// react native components
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

// common components
import CustomButton from '../../common/components/buttons/CustomButton'
import OrContainerUI from '../../common/components/ORContainer/OrContainerUI'

//constants assets & dimensions
import Colors from '../../utils/constants/Colors'
import { hp, wp } from '../../common/functions/dimensions'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import { Images } from '../../utils/constants/Images'

// Labels object for all static text
import { en as labels } from '../../utils/labels/en'

const LoginUI = props => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* <CustomImageBackground> */}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ top: -hp(4), fontSize: fontSize.l, fontWeight: 600 }}>
          {labels?.joinCommunity}
        </Text>
        <View
          style={{
            width: wp(35),
            height: hp(15),
            // backgroundColor: 'pink',
            marginBottom: hp(2),
            top: -hp(4)
          }}>
          <Image
            source={Images.app_logo}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>

        <CustomButton
          title={labels?.signUpWithGoogle}
          name={'sign_in_google'}
          // onPress={props?.handleSubmit}
          // isLoading={store.getState().settings.isLoading}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 1,
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: `#1D1D1DB2`,
            borderRadius: 8
          }}
          btnTitleStyles={{
            ...styles.textStyle,
            marginLeft: wp(5)
          }}
          leftImg={{
            source: Images.google_logo,
            style: {
              height: hp(3),
              width: wp(6)
            }
          }}
        />

        <OrContainerUI />

        <CustomButton
          title={labels?.signUpWithEmail}
          name={'signup'}
          onPress={() => props?.handleNavigate('signup')}
          // isLoading={store.getState().settings.isLoading}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 1,
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: `#1D1D1DB2`,
            borderRadius: 8
          }}
          btnTitleStyles={{
            ...styles.textStyle,
            marginLeft: wp(5)
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <Text>{labels?.alreadyRegistered}</Text>{' '}
          <TouchableOpacity onPress={() => props?.handleNavigate('login')}>
            <Text style={{ color: Colors.targetColor }}> {labels?.login}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </CustomImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: fontSize.normal,
    elevation: 5,
    height: hp('6'),
    width: wp('90'), // Matches the text input width with the remaining space
    color: Colors.text_black
  },
  textStyle: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.medium,
    color: 'black'
  },
  loginBtn: {
    width: wp('90'),
    marginVertical: hp(2)
  },
  btnStyles: {
    width: wp('90'),
    marginVertical: hp(2)
  },
  btnTextStyle: {
    color: 'white'
  }
})

export default LoginUI
