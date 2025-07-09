import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native'
import React from 'react'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import Icons from '../../../assets/icons/Icons'
import { wp, hp } from '../../functions/dimensions'
import Colors from '../../../utils/constants/Colors'

const CustomButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props?.isLoading || props?.disabled}
      onPress={e => props?.onPress(props.name, e)}
      style={{
        ...styles.btnStyles,
        ...props?.btnStyles,
        minWidth: props.minWidth ? props.minWidth : wp('40')
      }}
      {...props.btnProps}>
      {props.leftIcon && (
        <View
          style={{
            marginLeft: wp('4'),
            position: 'absolute',
            left: 0
          }}>
          <Icons {...props.leftIcon} />
        </View>
      )}
      {props.leftImg && (
        <View
          style={{
            // backgroundColor: 'pink',
            // width: wp('100'),
            marginLeft: wp('4'),
            position: 'absolute',
            left: 0
          }}>
          <Image {...props.leftImg} />
        </View>
      )}
      <View
        style={{
          flex: 1
        }}>
        {props.isLoading ? (
          <ActivityIndicator
            color={props.isLadingColor ? props.isLadingColor : Colors.white}
            size={hp(3.4)}
            visible={true}
          />
        ) : (
          <Text
            style={{ ...styles.btnTitle, ...props?.btnTitleStyles }}
            {...props.btnTitleProps}>
            {props?.title}
          </Text>
        )}
      </View>
      {props.rightIcon && (
        <View
          style={{
            marginRight: wp('4'),
            position: 'absolute',
            right: 0
          }}>
          <Icons {...props.rightIcon} />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnStyles: {
    flexDirection: 'row',
    backgroundColor: Colors.app_primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1'),
    // width:wp('70'),
    height: hp('6'),
    borderRadius: 10
  },
  btnTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: fontSize.md,
    fontFamily: Fonts.Medium
    // fontWeight: '700',
  }
})

export default CustomButton
