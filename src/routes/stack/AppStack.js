import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Strings from '../../utils/constants/Strings';
import HealthScreen from '../../../Healthconnect';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import BMICardScreen from '../../screens/bmi/BMICardScreen';
import NotificationSettingScreen from '../../screens/notificationSettingscreen/NotificationSettingScreen';
import EditProfileScreen from '../../screens/profile/EditProfileScreen';
import ActivitySyncScreen from '../../screens/profile/ActivitySyncScreen';
import ProgramScreen from '../../screens/appscreens/program/ProgramScreen';
import HomeScreen from '../../screens/appscreens/homescreen/HomeScreen';
import DashboardScreen from '../../screens/appscreens/dashboard/DashboardScreen';
import CalenderScreen from '../../screens/appscreens/calender/CalenderScreen';
import AppCustomHeader from '../../screens/appscreens/Common/AppCustomHeader';
import {createStackNavigator} from '@react-navigation/stack';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={Strings.NAVIGATION.home}
      screenOptions={({navigation, route}) => {
        return {
          header: () => <AppCustomHeader />,
        };
      }}>
      {/* <Tab.Screen name={Strings.NAVIGATION.health} component={HealthScreen} /> */}
      <Tab.Screen name={Strings.NAVIGATION.home} component={HomeScreen} />

      <Tab.Screen name={Strings.NAVIGATION.program} component={ProgramScreen} />

      <Tab.Screen
        name={Strings.NAVIGATION.dashboard}
        component={DashboardScreen}
      />

      <Tab.Screen
        name={Strings.NAVIGATION.calender}
        component={CalenderScreen}
      />
    </Tab.Navigator>
  );
};

const AppStack = props => {
  // const Drawer = createDrawerNavigator();

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Strings.NAVIGATION.home} component={TabNavigator} />
      <Stack.Screen
        name={Strings.NAVIGATION.profile}
        component={ProfileScreen}
      />

      <Stack.Screen name={Strings.NAVIGATION.bmi} component={BMICardScreen} />
      <Stack.Screen
        name={Strings.NAVIGATION.notificationsetting}
        component={NotificationSettingScreen}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.editprofile}
        component={EditProfileScreen}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.activitysync}
        component={ActivitySyncScreen}
      />
    </Stack.Navigator>

    // <Drawer.Navigator initialRouteName={Strings.NAVIGATION.health}>
    //   <Drawer.Screen
    //     name={Strings.NAVIGATION.health}
    //     component={HealthScreen}
    //   />

    // </Drawer.Navigator>
  );
};

export default AppStack;
