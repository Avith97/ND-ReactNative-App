// react core components + React Native components
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

// constants utils functions & assets
import { hp, wp } from '../../../common/functions/dimensions'
import { Images } from '../../../utils/constants/Images'

import { en as labels } from '../../../utils/labels/en'
export default function CardScreenTabUI(props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image Section */}
        <View>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
              height: hp(40),
              width: wp(100),
              position: 'absolute'
            }}
          />

          {props?.card_image_path && (
            <Image
              source={props?.card_image_path} // <-- Replace with your image path
              style={styles.image}
              // resizeMode="contain"
            />
          )}
        </View>

        {/* Title & Description */}
        <View style={styles.textContainer}>
          {props?.options && (
            <Text style={styles.title}>{props?.options?.[0]?.text}</Text>
          )}
          {props?.options && (
            <Text style={styles.description}>
              {props?.options?.[0]?.subText}
            </Text>
          )}
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: {
    flex: 1
  },
  image: {
    width: wp(100),
    height: hp(40),
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 20,
    resizeMode: 'cover',
    opacity: 1
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444'
  },
  buttonContainer: {
    padding: 20
  },
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  continueText: { fontWeight: 'bold' }
})
