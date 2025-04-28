import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native'; // ✅ Add this
import {Images} from '../../../utils/constants/Images';
import {hp, wp} from '../../../common/functions/dimensions';
import Icons, {iconType} from '../../../assets/icons/Icons';
import Strings from '../../../utils/constants/Strings';
import CustomButton from '../../../common/components/buttons/CustomButton';

export default function AppCustomHeader(props) {
  const navigation = useNavigation(); // ✅ Access navigation

  const {isLoggedIn} = props.isLoggedIn;

  const handleNavigate = name => {
    navigation.navigate(name);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <Image
        source={Images.app_logo}
        style={styles.logo}
        resizeMode="contain"
      />

      {!isLoggedIn ? (
        <CustomButton
          title={'Sign up'}
          name={Strings.NAVIGATION.auth}
          onPress={handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 1,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
          }}
        />
      ) : (
        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => handleNavigate(Strings.NAVIGATION.notificationlist)}>
            <Icons name="bell" type={iconType.feather} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigate(Strings.NAVIGATION.profile)}>
            <Icons name="user" type={iconType.feather} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  logo: {
    width: wp(15),
    height: 40,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  btnStyles: {
    // width: wp(2),
    height: hp(4.5),
    borderRadius: 8,
  },
});
