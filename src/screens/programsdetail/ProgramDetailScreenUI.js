import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Images} from '../../utils/constants/Images';
import {hp, wp} from '../../common/functions/dimensions';
import Colors from '../../utils/constants/Colors';
import Fonts, {fontSize} from '../../utils/constants/Fonts';
import CustomButton from '../../common/components/buttons/CustomButton';
import Icons, {iconType} from '../../assets/icons/Icons';

const ProgramDetailUI = props => {
  
  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.bannerWrapper}>
        <Image source={Images.program_banner} style={styles.banner} />
        <View style={styles.statusTag}>
          <Text style={styles.statusText}>Not Registered</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Intro */}
        <Text style={styles.title}>Weightloss Program</Text>
        <Text style={styles.description}>
          Our WeightLoss Program is designed to help you achieve your health and
          fitness goals through a comprehensive, personalized approach. We
          understand that each individual's weight loss journey is unique, which
          is why we offer tailored solutions that address your specific needs,
          preferences, and lifestyle.
        </Text>

        {/* Date */}
        <View style={styles.dateContainer}>
          <Icons
            name="calendar"
            type={iconType.feather}
            size={20}
            color="black"
          />
          <Text style={styles.dateText}> From 28-08-2025 To 30-08-2025</Text>
        </View>

        {/* Register Button */}
        <View style={styles.buttonContainer}>
          {props.IsRegistered ? (
            <CustomButton
              title="Submit Response"
              name="submit"
              btnStyles={styles.registerButton}
              onPress={props.handleNavigate}
            />
          ) : (
            <CustomButton
              title="Register Now"
              name="register"
              btnStyles={styles.registerButton}
              onPress={props.handleNavigate}
            />
          )}
        </View>

        {/* Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Challenges</Text>
          <Text
            style={{fontSize: fontSize.m, fontWeight: '700', marginBottom: 10}}>
            {' '}
            1. Zero Sugar Challenge{' '}
          </Text>
          <Text style={styles.description}>
            Introducing our 21-day Zero Sugar Challenge! This journey is divided
            into three manageable segments of 7 days each.
          </Text>
          <View style={styles.bulletList}>
            <Text>
              {'\u2022'} At first, for the initial 7 days, you eliminate all
              packaged foods from your diet. This means no processed snacks or
              ready-made meals..
            </Text>
            <Text>
              {'\u2022'} At first, for the initial 7 days, you eliminate all
              packaged foods from your diet. This means no processed snacks or
              ready-made meals.
            </Text>
          </View>

          <Text style={styles.description}>
            Get off to a strong start in the challenge right from day one. On
            day one resolve not to eat any packaged food, record your
            self-affirmation by responding to the question asked (about it)on
            day 2. Keep this up for the whole week. Now you can effectively
            track your progress and also follow the tips crafted by experts!
            Each step is designed to gradually reduce your sugar dependence and
            promote a healthier lifestyle. Embrace the change, feel the energy,
            and transform your life. Remember, a sugar-free life is a better
            life.
          </Text>

          {/* Challenge Cards */}
          {[1, 2].map(key => (
            <View key={key} style={styles.challengeCard}>
              <Text style={styles.challengeText}>
                • Understanding sugars: Natural vs. added sugars
              </Text>
              <TouchableOpacity>
                <Text style={styles.link}>Click here</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Organizer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organized By</Text>
          <View style={styles.organizerInfo}>
            <Image source={Images.company_logo} style={styles.logo} />
            <View>
              <Text style={styles.orgName}>Interface</Text>
              <Text>Some short text under the org name</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  bannerWrapper: {
    position: 'relative',
  },
  banner: {
    width: wp(100),
    height: hp(30),
  },
  statusTag: {
    position: 'absolute',
    top: hp(2),
    right: hp(2),
    backgroundColor: Colors.app_primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.s,
    fontFamily: Fonts.bold,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: fontSize.md,
    color: Colors.gray_02,
    marginBottom: hp(2),
  },
  dateContainer: {
    backgroundColor: Colors.backgroundLight,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    width: wp(56),
    marginBottom: hp(2),
  },
  dateText: {
    fontSize: fontSize.s,
    color: Colors.gray_02,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: hp(3),
  },
  registerButton: {
    width: wp(57),
    backgroundColor: Colors.primary,
    padding: 0,
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletList: {
    marginVertical: hp(1),
  },
  challengeCard: {
    backgroundColor: Colors.dayBackground,
    padding: hp(1),
    borderRadius: 6,
    marginVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  challengeText: {
    color: Colors.gray_02,
    fontSize: fontSize.normal,
    width: wp(60),
  },
  link: {
    color: Colors.targetColor,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: wp(22),
    height: hp(10),
    resizeMode: 'contain',
  },
  orgName: {
    fontWeight: 'bold',
    fontSize: fontSize.l,
  },
});

export default ProgramDetailUI;
