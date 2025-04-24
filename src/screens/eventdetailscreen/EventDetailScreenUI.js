import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Images} from '../../utils/constants/Images';
import Icons, {iconType} from '../../assets/icons/Icons';
import CustomButton from '../../common/components/buttons/CustomButton';
import {hp, wp} from '../../common/functions/dimensions';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';

export default function EventDetailScreenUI(props) {
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {/* Image with Badge */}
      <View>
        <Image
          source={Images.runner_bg_image}
          resizeMode="cover"
          style={styles.bannerImage}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Not Registered</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        {/* Date Section */}
        <View style={styles.dateRangeContainer}>
          <Icons
            name="calendar"
            type={iconType.feather}
            size={20}
            color="black"
          />
          <Text style={styles.dateText}> From 26-01-2025 To 30-02-2025</Text>
        </View>

        {/* Organizer Section */}
        <Text style={[styles.title, {marginTop: hp(2)}]}>Organized By</Text>
        <View style={styles.orgContainer}>
          <Image
            source={Images.app_logo} // <-- Replace with organizer logo
            style={styles.orgLogo}
            resizeMode="contain"
          />
          <View style={{flex: 1, marginLeft: wp(3)}}>
            <Text style={styles.orgName}>Lorem ipsum</Text>
            <Text style={styles.orgSubtitle}>
              Lorem ipsum dolor sit amet, consectetur
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <View style={styles.buttonWrapper}>
        <CustomButton
          title={'Register Now'}
          btnStyles={styles.btnStyle}
          onPress={props.handleNavigate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: hp(35),
    opacity: 0.6,
  },
  badgeContainer: {
    position: 'absolute',
    top: hp(2),
    right: wp(4),
    backgroundColor: 'orange',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 15,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  contentContainer: {
    padding: wp(5),
    paddingBottom: hp(12), // space for floating button
  },
  title: {
    fontSize: fontSize.l,
    fontWeight: '600',
    marginBottom: hp(1),
  },
  description: {
    fontSize: fontSize.normal,
    color: '#444',
    marginBottom: hp(2),
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.app_primary,
    padding: hp(1.5),
    borderRadius: 10,
    width: wp(65),
  },
  dateText: {
    marginLeft: wp(3),
    fontSize: fontSize.normal,
  },
  orgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  orgLogo: {
    width: wp(15),
    height: hp(6),
  },
  orgName: {
    fontSize: fontSize.m,
    fontWeight: '600',
  },
  orgSubtitle: {
    fontSize: fontSize.s,
    color: '#666',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: hp(3),
    left: wp(30),
  },
  btnStyle: {
    width: wp(40),
    paddingVertical: hp(1.5),
    backgroundColor: '#C3E458',
    borderRadius: 10,
  },
});
