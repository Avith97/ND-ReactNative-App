import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Strings from '../../utils/constants/Strings'
import Colors from '../../utils/constants/Colors'
import { useSelector } from 'react-redux'
import HomeScreen from '../../screens/appscreens/homescreen/HomeScreen'
import Icons, { iconType } from '../../assets/icons/Icons'
import ProgramScreen from '../../screens/appscreens/program/ProgramScreen'
import DashboardScreen from '../../screens/appscreens/dashboard/DashboardScreen'
import ToastModal from '../../common/components/Modal/ToastModal'
import About_US from '../../screens/appscreens/aboutus/About_Us'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import CustomBottomTab from './BottomTab'
import ProfileScreen from '../../screens/profile/ProfileScreen'
import EventDetailScreen from '../../screens/eventdetailscreen/EventDetailScreen'

const HomeTabBottomNav = props => {
  const Tab = createBottomTabNavigator()
  const actionRef = useRef(null)

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const showActionItem = () => {
    actionRef?.current?.show?.({
      // data: mockRequests,
      timeout: 1000 * 10
    })
  }

  return (
    <>
      {/* <ToastModal ref={actionRef} >
        
      </ToastModal> */}

      <Tab.Navigator
        initialRouteName={Strings.NAVIGATION.home}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.gray_03,
          tabBarLabelStyle: {
            fontSize: fontSize.s,
            fontFamily: Fonts.Regular
          }
        }}
        tabBar={props => <CustomBottomTab {...props} />}>
        <Tab.Screen
          name={Strings.NAVIGATION.home}
          component={HomeScreen}
          initialParams={{ isLoggedIn: isLoggedIn }}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icons
                type={iconType.material}
                name="home"
                color={color}
                size={20}
              />
            )
          }}
        />

        <Tab.Screen
          name={Strings.NAVIGATION.program}
          component={ProgramScreen}
          options={{
            title: 'Program',
            tabBarIcon: ({ color, size }) => (
              <Icons
                type={iconType.feather}
                name="align-justify"
                color={color}
                size={20}
              />
            )
          }}
        />

        <Tab.Screen
          name={Strings.NAVIGATION.dashboard}
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Icons
                type={iconType.material}
                name="dashboard"
                color={color}
                size={20}
              />
            )
          }}
        />

        {/* <Tab.Screen
        name={Strings.NAVIGATION.calender}
        component={CalenderScreen}
        options={{
          title: 'Calendar',
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600'
            // color: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Icons
              type={iconType.feather}
              name="calendar"
              color={color}
              size={20}
            />
          )
        }}
      /> */}

        {/* about us tab */}
        <Tab.Screen
          name={Strings.NAVIGATION.about_us}
          component={About_US}
          options={{
            title: 'About Us',
            tabBarIcon: ({ color, size }) => (
              <Icons
                type={iconType.material}
                name="perm-device-info"
                color={color}
                size={20}
              />
            )
          }}
        />

        {/* <Tab.Screen
          name={Strings.NAVIGATION.profile}
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        /> */}

        <Tab.Screen
          name={Strings.NAVIGATION.eventdetail}
          component={EventDetailScreen}
          options={{ title: 'Event Detail' }}
        />

        {/* */}
      </Tab.Navigator>
    </>
  )
}

export default HomeTabBottomNav
