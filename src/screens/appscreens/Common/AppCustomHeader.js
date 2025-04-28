import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native'; // ✅ Add this
import {Images} from '../../../utils/constants/Images';
import {wp} from '../../../common/functions/dimensions';
import Icons, {iconType} from '../../../assets/icons/Icons';
import Strings from '../../../utils/constants/Strings';

export default function AppCustomHeader({}) {
  const navigation = useNavigation(); // ✅ Access navigation

  const onAvatarPress = () => {
    navigation.navigate(Strings.NAVIGATION.profile); // ✅ Now works!
  };

  const onBellPress = () => {
    navigation.navigate(Strings.NAVIGATION.notificationlist);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <Image
        source={Images.app_logo}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onBellPress}>
          <Icons name="bell" type={iconType.feather} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAvatarPress}>
          <Icons name="user" type={iconType.feather} size={20} />
        </TouchableOpacity>
      </View>
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
});
