import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../functions/dimensions'
import { Image } from 'react-native'
import { Images } from '../../../utils/constants/Images'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { colors } from 'react-native-elements'

export default function NoDataFound(props) {
  return (
    <View
      style={{
        flex: 1,
        width: wp(90),
        height: hp(60),
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
        source={Images.no_data}
        style={styles.nodataImage}
        // resizeMode="contain"
      />
      <Text style={styles.title}>No Data Found</Text>
      <Text style={{ ...styles.subtitle }}>
        {props?.subTitle
          ? props?.subTitle
          : "It seems like you haven't tracked any activities yet. Start your fitness journey by recording your activities."}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    fontFamily: Fonts.Medium,
    color: colors.grey4,
    paddingTop: hp(0.8)
  },
  subtitle: {
    textAlign: 'center',
    color: colors.grey4,
    fontSize: fontSize.s,
    fontFamily: Fonts.Regular
  },
  nodataImage: {
    width: wp(45),
    height: hp(15)
  }
})
