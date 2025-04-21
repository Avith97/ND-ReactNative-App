import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Strings from '../../utils/constants/Strings';
import HealthScreen from '../../../Healthconnect';
import HomeScreen from '../../screens/appscreens/HomeScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import BMICardScreen from '../../screens/bmi/BMICardScreen';
import NotificationSettingScreen from '../../screens/notificationSettingscreen/NotificationSettingScreen';

const AppStack = props => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName={Strings.NAVIGATION.bmi}>
      <Drawer.Screen
        name={Strings.NAVIGATION.health}
        component={HealthScreen}
      />
      <Drawer.Screen name={Strings.NAVIGATION.home} component={HomeScreen} />

      <Drawer.Screen
        name={Strings.NAVIGATION.profile}
        component={ProfileScreen}
      />

      <Drawer.Screen name={Strings.NAVIGATION.bmi} component={BMICardScreen} />
      <Drawer.Screen name={Strings.NAVIGATION.notificationsetting} component={NotificationSettingScreen} />
    </Drawer.Navigator>
  );
};

export default AppStack;
