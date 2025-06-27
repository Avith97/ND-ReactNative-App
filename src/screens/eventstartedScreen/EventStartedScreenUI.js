import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomImageBackground from '../../common/components/background/CustomImageBackground'
import { Images } from '../../utils/constants/Images'
import { hp, wp } from '../../common/functions/dimensions'
import CustomButton from '../../common/components/buttons/CustomButton'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import { parseHtmlDescription } from '../../common/functions/helper'

export default function EventStartedScreenUI(props) {
  console.log(props)

  return (
    <View style={styles.container}>
      <CustomImageBackground
        source={Images.runner_bg_image}
        style={styles.bgImage}>
        {/* Top Right Badge */}
        <View style={styles.badgeContainer}>
          {/* <Text style={styles.badgeText}>Not Registered</Text> */}
        </View>

        {/* Overlay content */}
        <View style={styles.contentContainer}>
          {/* name */}
          <View style={styles.overlay}>
            {props?.eventDetail && (
              <Text style={styles.title}>
                {props?.eventDetail?.name || props?.eventDetail?.title}
              </Text>
            )}

            {/* description */}
            {(props?.eventDetail?.program ||
              props?.eventDetail?.description) && (
              <Text style={styles.subtitle}>
                {parseHtmlDescription(props?.eventDetail?.description) ||
                  parseHtmlDescription(props?.eventDetail?.description)}
              </Text>
            )}
          </View>

          {/* Get Started Button */}
          <CustomButton
            title="Get Started"
            btnStyles={styles.btnStyle}
            onPress={props.handleNavigate}
          />
        </View>
      </CustomImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    justifyContent: 'space-between'
  },
  badgeContainer: {
    alignSelf: 'flex-end',
    margin: wp(4),
    // backgroundColor: 'orange',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 15
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  contentContainer: {
    gap: hp(5),
    paddingBottom: hp(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp(5)
  },
  title: {
    color: 'white',
    fontSize: fontSize.m,
    // fontWeight: 'bold',
    fontFamily: Fonts.SemiBold,
    textAlign: 'center',
    marginBottom: hp(1)
  },
  subtitle: {
    color: 'white',
    fontSize: fontSize.normal,
    textAlign: 'center',
    fontFamily: Fonts.Regular
  },
  btnStyle: {
    width: wp(60)
  }
})
