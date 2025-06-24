import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Images } from '../../utils/constants/Images'
import Colors from '../../utils/constants/Colors'
import { hp, wp } from '../../common/functions/dimensions'
import { fontSize } from '../../utils/constants/Fonts'
import MovingObject from '../../common/components/progressbar/InfiniteProgressBar'

const SplashUI = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Image source={Images.app_logo} style={styles.SplashLogoImage} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: wp(100),
          height: hp(10)
          // backgroundColor: 'cyan'
        }}>
        <MovingObject />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  text: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginBottom: hp(0)
  },
  SplashLogoImage: {
    height: 130,
    width: 130,
    resizeMode: 'contain'
  }
})

export default SplashUI
