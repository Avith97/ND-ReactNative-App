import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Strings from '../../utils/constants/Strings'
import Colors from '../../utils/constants/Colors'
import { useSelector } from 'react-redux'
import HomeScreen from '../../screens/appscreens/homescreen/HomeScreen'
import Icons, { iconType } from '../../assets/icons/Icons'
import ProgramScreen from '../../screens/appscreens/program/ProgramScreen'
import DashboardScreen from '../../screens/appscreens/dashboard/DashboardScreen'

const HomeTabBottomNav = props => {
  const Tab = createBottomTabNavigator()

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Tab.Navigator
      initialRouteName={Strings.NAVIGATION.home}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray_03,
        freezeOnBlur: true
      }}>
      {/* <Tab.Screen name={Strings.NAVIGATION.health} component={HealthScreen} /> */}
      <Tab.Screen
        name={Strings.NAVIGATION.home}
        component={HomeScreen}
        initialParams={{ isLoggedIn: isLoggedIn }}
        options={{
          title: 'Home',
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600'
            // color: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Icons
              type={iconType.feather}
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
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600'
            // color: 'black',
          },
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
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600'
            // color: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Icons
              type={iconType.feather}
              name="bar-chart-2"
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
    </Tab.Navigator>
  )
}

export default HomeTabBottomNav
