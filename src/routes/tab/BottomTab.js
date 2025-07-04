import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icons, { iconType } from '../../assets/icons/Icons'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import Strings from '../../utils/constants/Strings'
import Colors from '../../utils/constants/Colors'
import Fonts, { fontSize } from '../../utils/constants/Fonts'

export default function CustomBottomTab({ state, descriptors }) {
  const navigation = useNavigation()
  const CURRENT_ROUTE = useRoute()

  const CURRENT_ROUTE_IS_FOCUSED = useIsFocused()
  const TAB_OPTIONS = [
    {
      name: Strings.NAVIGATION.home,
      title: 'Home',
      type: iconType.material,
      icon: 'home',
      iconFocused: 'home'
    },
    {
      name: Strings.NAVIGATION.program,
      title: 'Program',
      type: iconType.feather,
      icon: 'align-justify',
      iconFocused: 'stats-chart'
    },
    {
      name: Strings.NAVIGATION.dashboard,
      title: 'Dashboard',
      type: iconType.material,
      icon: 'dashboard',
      iconFocused: 'grid'
    },
    {
      name: Strings.NAVIGATION.about_us,
      title: 'About Us',
      type: iconType.material,
      icon: 'perm-device-info',
      iconFocused: 'information-circle'
    }
  ]
  return (
    <View style={styles.container}>
      {TAB_OPTIONS.map((route, index) => {
        const isFocused = state.index === index

        const title = route.title

        // const icon = options.tabBarIcon ?? route.tabBarIcon

        const onPress = () => {
          navigation.navigate(Strings.NAVIGATION.home_tab_bottom_nav, {
            screen: route.name
          })
          // const event = navigation.emit({
          //   type: 'tabPress',
          //   target: route.key,
          //   canPreventDefault: true
          // })

          // if (!isFocused && !event.defaultPrevented) {
          //   navigation.navigate(route.name)
          // }
        }

        // Get icon info from TAB_OPTIONS
        const tabData = TAB_OPTIONS.find(tab => tab.name === route.name)

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}>
            <Icons
              name={route.icon}
              type={route.type}
              size={24}
              color={isFocused ? Colors.primary : '#555'}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {title}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    // borderTopWidth: 3,
    // borderTopColor: Colors.primary,
  },
  label: {
    color: '#555',
    fontFamily: Fonts.Regular,
    fontSize: fontSize.s,
    marginTop: 2
  },
  activeLabel: {
    color: Colors.primary,
    fontFamily: Fonts.Regular
  }
})
