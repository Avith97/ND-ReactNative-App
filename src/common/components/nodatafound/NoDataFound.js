import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../functions/dimensions'
import { Image } from 'react-native'
import { Images } from '../../../utils/constants/Images'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { colors } from 'react-native-elements'

export default function NoDataFound() {
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
        It seems like you haven't tracked any activities yet. Start your fitness
        journey by recording your Active.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: fontSize.m,
    fontFamily: Fonts.Bold,
    color: colors.grey4,
    padding: hp(0.5)
  },
  subtitle: {
    textAlign: 'center',
    color: colors.grey4,
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular
  },
  nodataImage: {
    width: wp(90),
    height: hp(25)
  }
})
