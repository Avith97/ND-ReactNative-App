import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomImageBackground from '../../common/components/background/CustomImageBackground';
import {Images} from '../../utils/constants/Images';
import Colors from '../../utils/constants/Colors';
import {hp, wp} from '../../common/functions/dimensions';
import CustomButton from '../../common/components/buttons/CustomButton';

export default function EventStartedScreenUI(props) {
  return (
    <View style={styles.container}>
      <CustomImageBackground
        source={Images.runner_bg_image}
        style={styles.bgImage}>
        {/* Top Right Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Not Registered</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Overlay content */}
          <View style={styles.overlay}>
            <Text style={styles.title}>Step Challenge</Text>
            <Text style={styles.subtitle}>
              Walking once a day, keeps the doctor away!!. Indeed walking helps
              you in weight loss, relieving anxiety, fighting diabetes and so
              many other health-related things. Lets "step with a smile" for
              next seven days
            </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badgeContainer: {
    alignSelf: 'flex-end',
    margin: wp(4),
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
    gap: hp(5),
    paddingBottom: hp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp(5),
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  btnStyle: {
    width: wp(60),
  },
});
