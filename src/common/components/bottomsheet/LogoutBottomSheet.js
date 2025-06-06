import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import CustomButton from '../buttons/CustomButton'
import Icons, { iconType } from '../../../assets/icons/Icons'
import { open_logout_bottom_sheet } from '../toasts/handleToasts'
import { hp, wp } from '../../functions/dimensions'

const LogoutBottomSheet = props => {
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
            color={'#CF352E'}
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
            Logout
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
            Do you want to logout ?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: wp(100),
            position: 'absolute',
            bottom: hp(4),
            // backgroundColor: 'pink',
            // alignItems: 'center',
            justifyContent: 'space-around'
          }}>
          <CustomButton
            title={'Yes'}
            onPress={() => console.log('logged out --->')}
            btnStyles={{
              height: hp(6),
              backgroundColor: '#CF352E',
              elevation: 5
            }}
            btnTitleStyles={{
              // color: '#CF352E',
              fontFamily: Fonts.semiBold,
              fontSize: fontSize.normal
            }}
          />

          <CustomButton
            title={'Cancel'}
            onPress={() => open_logout_bottom_sheet((hide = true))}
            btnStyles={{
              height: hp(6),
              backgroundColor: 'white'
              // elevation: 5
            }}
            btnTitleStyles={{
              color: '#CF352E',
              fontFamily: Fonts.semiBold,
              fontSize: fontSize.normal
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default LogoutBottomSheet

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    top: hp('2.2'),
    width: wp(100),
    height: hp(100),
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden'
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    height: hp(35),
    padding: 5,
    backgroundColor: 'white'
  }
})
