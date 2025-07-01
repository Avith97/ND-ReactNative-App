import { View, Text, StyleSheet, BackHandler } from 'react-native'
import React from 'react'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import CustomButton from '../buttons/CustomButton'
import Icons, { iconType } from '../../../assets/icons/Icons'
import { hp, wp } from '../../functions/dimensions'
import { show_exit_bottom_sheet } from '../toasts/handleToasts'
import Colors from '../../../utils/constants/Colors'
import Strings from '../../../utils/constants/Strings'

const ExitAppBottomSheet = props => {
  const handleExit = params => {
    if (params === 'exit') {
      BackHandler.exitApp()
    } else if (params === 'home') {
      // Navigate to Home Page
      global.navigation.reset({
        index: 0,
        routes: [{ name: Strings.NAVIGATION.home }]
      })
    }
    show_exit_bottom_sheet(true)
  }
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: hp(2),
            marginBottom: hp(1)
          }}>
          <Icons
            type={iconType.fa5}
            name={'door-open'}
            size={hp(6)}
            color={Colors.primary}
          />
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.semiBold,
              color: '#535353',
              fontSize: fontSize.m
            }}>
            Exit App
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.semiBold,
              color: '#535353',
              fontSize: fontSize.normal,
              marginTop: hp(5)
            }}>
            Do you want to exit app ?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            // width: wp(100),
            // position: 'absolute',
            // bottom: hp(4),
            // backgroundColor: 'pink',
            // alignItems: 'center',
            gap: hp(1),
            paddingVertical: hp(1),
            justifyContent: 'space-around'
          }}>
          <CustomButton
            title={'Yes'}
            onPress={() => handleExit('exit')}
            btnStyles={{
              height: hp(6),
              backgroundColor: Colors.primary,
              elevation: 2
            }}
            btnTitleStyles={{
              color: Colors.gray_01,
              fontFamily: Fonts.SemiBold,
              fontSize: fontSize.normal
            }}
          />

          <CustomButton
            title={'Go To Home Page'}
            onPress={() => handleExit('home')}
            btnStyles={{
              height: hp(6),
              backgroundColor: 'white'
              // elevation: 5
            }}
            btnTitleStyles={{
              color: Colors.primary,
              fontFamily: Fonts.semiBold,
              fontSize: fontSize.normal
            }}
          />

          <CustomButton
            title={'Cancel'}
            onPress={() => handleExit('cancel')}
            btnStyles={{
              height: hp(6),
              backgroundColor: 'white'
              // elevation: 5
            }}
            btnTitleStyles={{
              color: Colors.primary,
              fontFamily: Fonts.semiBold,
              fontSize: fontSize.normal
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default ExitAppBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: hp('2.7'),
    width: wp(100),
    height: hp(100),
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden'
    // zIndex:10
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    height: hp(45),
    // padding: 5,
    backgroundColor: 'white'
  }
})
