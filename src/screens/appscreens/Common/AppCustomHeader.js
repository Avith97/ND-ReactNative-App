import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native' // ✅ Add this
import { Images } from '../../../utils/constants/Images'
import { hp, wp } from '../../../common/functions/dimensions'
import Icons, { iconType } from '../../../assets/icons/Icons'
import Strings from '../../../utils/constants/Strings'
import CustomButton from '../../../common/components/buttons/CustomButton'
import Colors from '../../../utils/constants/Colors'
import { toast_success } from '../../../common/components/toasts/handleToasts'
import Toast from 'react-native-toast-message'
import moment from 'moment'
import { BackSync } from '../../../common/functions/BackSync'

export default function AppCustomHeader(props) {
  const navigation = useNavigation() // ✅ Access navigation

  const [isLoading, setIsLoading] = useState(false)

  // let isLoading = true

  const { isLoggedIn } = props.isLoggedIn

  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let animation

    if (isLoading) {
      animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000, // 1 rotation per second
          easing: Easing.linear,
          useNativeDriver: true
        })
      )
      animation.start()
    } else {
      rotateAnim.stopAnimation()
      rotateAnim.setValue(0)
    }

    return () => {
      if (animation) animation.stop()
    }
  }, [isLoading, global.ongoingEvents?.length])

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const handleNavigate = name => {
    navigation.navigate(name)
  }

  async function handleSyncData() {
    setIsLoading(true)
    Toast.show({
      type: 'transparent_layer',
      autoHide: false,
      topOffset: 0
    })
    //  console.log(global.ongoingEvents);
    //   let resp = await BackSync.health_data_sync({
    //     startDate: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    //     format: 'YYYY-MM-DD HH:mm:ss'
    //   },"active")
    if (global.ongoingEvents?.length) {
      for (const event of global.ongoingEvents) {
        try {
          const response = await BackSync.health_data_sync({
            startDate: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            format: 'YYYY-MM-DD HH:mm:ss'
            // eventId: event.id // optional: if your API needs event ID
          })
          setIsLoading(false)
          Toast.hide()
          console.log(`Synced event `, response)
        } catch (error) {
          console.error(`Error syncing event ${event.id}:`, error)
        }
      }
    }
    console.log('syncyn', resp)

    // // call health connect data sync api
    // setTimeout(() => {
    //   setIsLoading(false)
    //   Toast.hide()
    // }, 3000)
  }

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <TouchableOpacity onPress={() => handleNavigate(Strings?.NAVIGATION.app)}>
        <Image
          source={Images.app_logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {!isLoggedIn ? (
        <CustomButton
          title={'Sign up'}
          name={Strings.NAVIGATION.auth}
          onPress={handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 1
          }}
          btnTitleStyles={{
            ...styles.textStyle
          }}
        />
      ) : (
        <View style={styles.rightIcons}>
          {/* <TouchableOpacity
            onPress={() => handleNavigate(Strings.NAVIGATION.notificationlist)}>
            <Icons name="bell" type={iconType.feather} size={20} />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => handleSyncData()}>
            <Icons name="bell" type={iconType.feather} size={20} />
            <Text>Sync Data</Text>
          </TouchableOpacity> */}
          {global.ongoingEvents?.length && (
            <TouchableOpacity
              onPress={() => handleSyncData()}
              disabled={isLoading}
              activeOpacity={0.6}
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Animated.View
                style={{ transform: [{ rotate: rotateInterpolate }] }}>
                <Icons
                  name="sync"
                  type={iconType.ant}
                  size={isLoading ? 24 : 20}
                  color={isLoading ? Colors.primary : Colors.gray_04}
                />
              </Animated.View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => handleNavigate(Strings.NAVIGATION.profile)}>
            <Icons name="user" type={iconType.feather} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2
  },
  logo: {
    width: wp(15),
    height: 40
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  btnStyles: {
    // width: wp(2),
    height: hp(4.5),
    borderRadius: 8
  }
})
