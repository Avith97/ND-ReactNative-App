import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Images } from '../../utils/constants/Images'
import Icons, { iconType } from '../../assets/icons/Icons'
import CustomButton from '../../common/components/buttons/CustomButton'
import { hp, wp } from '../../common/functions/dimensions'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import {
  getFullEventBgImageUrl,
  getFullImageUrl,
  parseHtmlDescription
} from '../../common/functions/helper'

export default function EventDetailScreenUI(props) {
  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.white, position: 'relative' }}>
      {/* Image with Badge */}
      <View>
        <Image
          source={
            props?.eventData?.image?.url
              ? { uri: getFullEventBgImageUrl(props?.eventData?.image?.url) }
              : Images.program_card_bg_image
          }
          resizeMode="cover"
          style={styles.bannerImage}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          {props?.eventData?.name || props?.eventData?.title}
        </Text>
        <Text style={styles.description}>
          {props?.eventData?.description &&
            parseHtmlDescription(props?.eventData?.description)}
        </Text>

        {/* Date Section */}
        <View style={styles.dateRangeContainer}>
          <Icons
            name="calendar"
            type={iconType.feather}
            size={15}
            color="black"
          />
          <Text style={styles.dateText}>
            {' '}
            {props?.eventData?.eventLocalStartDate} -{' '}
            {props?.eventData?.eventLocalEndDate}{' '}
          </Text>
        </View>

        {/* Organizer Section */}
        {props?.eventData?.organizers?.length && (
          <View>
            <Text style={[styles.title, { marginTop: hp(2) }]}>
              Organized By
            </Text>
            {props?.eventData?.organizers?.map(organizer => {
              // removed first slash
              let organizerURL =
                organizer?.organizerLogo &&
                organizer?.organizerLogo?.startsWith('/')
                  ? organizer?.organizerLogo?.slice(1)
                  : organizer?.organizerLogo

              return (
                <View style={styles.orgContainer}>
                  <Image
                    source={{ uri: getFullImageUrl(organizerURL) }} // <-- Replace with organizer logo
                    style={styles.orgLogo}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1, marginLeft: wp(3) }}>
                    <Text style={styles.orgName}>
                      {parseHtmlDescription(organizer?.name)}
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
        )}
      </ScrollView>
      {/* <View style={styles?.viewResultBtnContainer}>
        <CustomButton
          title={'View Result'}
          name={'navigate'}
          onPress={() => props?.handleNavigate()}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
            backgroundColor: Colors.primary
            // width:wp(40)
          }}
          btnTitleStyles={{
            ...styles.textStyle,
            color: Colors.gray_01
          }}
        />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  bannerImage: {
    width: wp(100),
    height: hp(30),
    opacity: 0.6
  },
  badgeContainer: {
    position: 'absolute',
    top: hp(2),
    right: wp(4),
    backgroundColor: 'orange',
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
    padding: wp(5),
    paddingBottom: hp(12) // space for floating button
  },
  title: {
    fontSize: fontSize.m,
    fontFamily: Fonts.SemiBold,
    marginBottom: hp(1)
  },
  description: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular,
    color: '#444',
    marginBottom: hp(2)
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.app_primary,
    padding: hp(1.5),
    borderRadius: 10,
    width: wp(55)
  },
  dateText: {
    marginLeft: wp(3),
    fontSize: fontSize.s,
    fontFamily: Fonts.Medium
  },
  orgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: hp(0.2),
    elevation: 2
  },
  orgLogo: {
    width: wp(19),
    height: hp(7),
    backgroundColor: '#f2f2f2',
    borderRadius: 2
  },
  orgName: {
    fontSize: fontSize.m,
    fontFamily: Fonts.Regular,
    fontWeight: '600'
  },
  orgSubtitle: {
    fontSize: fontSize.s,
    fontFamily: Fonts.Regular,
    color: '#666'
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: hp(3),
    left: wp(30)
  },
  viewResultBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: wp(20),
    right: wp(20),
    padding: 16,
    // backgroundColor: 'red', // Optional: make background white if button overlaps content
    // borderTopWidth: 1,
    borderColor: '#ddd'
  },
  btnStyles: {
    paddingVertical: hp(1),
    borderRadius: 15
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
