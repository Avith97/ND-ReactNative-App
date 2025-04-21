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

const AppStack = props => {
  // const Drawer = createDrawerNavigator();

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName={Strings.NAVIGATION.home} screenOptions={({navigation, route}) => {
            
      
            return {
              header: () => (
                <AppCustomHeader
                
                />
              ),
            };
          }}>
      {/* <Tab.Screen name={Strings.NAVIGATION.health} component={HealthScreen} /> */}
      <Tab.Screen name={Strings.NAVIGATION.home} component={HomeScreen} />

      <Tab.Screen name={Strings.NAVIGATION.program} component={ProgramScreen} />

      <Tab.Screen name={Strings.NAVIGATION.dashboard} component={DashboardScreen} />

      <Tab.Screen name={Strings.NAVIGATION.calender} component={CalenderScreen} />
      
       
      

      {/* <Tab.Screen name={Strings.NAVIGATION.profile} component={ProfileScreen} /> */}

      {/* <Tab.Screen name={Strings.NAVIGATION.bmi} component={BMICardScreen} /> */}
      {/* <Tab.Screen
        name={Strings.NAVIGATION.notificationsetting}
        component={NotificationSettingScreen}
      />
      <Tab.Screen
        name={Strings.NAVIGATION.editprofile}
        component={EditProfileScreen}
      />

      <Tab.Screen
        name={Strings.NAVIGATION.activitysync}
        component={ActivitySyncScreen}
      /> */}
    </Tab.Navigator>

    // <Drawer.Navigator initialRouteName={Strings.NAVIGATION.editprofile}>
    //   <Drawer.Screen
    //     name={Strings.NAVIGATION.health}
    //     component={HealthScreen}
    //   />
    //   <Drawer.Screen name={Strings.NAVIGATION.home} component={HomeScreen} />

    //   <Drawer.Screen
    //     name={Strings.NAVIGATION.profile}
    //     component={ProfileScreen}
    //   />

    //   <Drawer.Screen name={Strings.NAVIGATION.bmi} component={BMICardScreen} />
    //   <Drawer.Screen name={Strings.NAVIGATION.notificationsetting} component={NotificationSettingScreen} />
    //   <Drawer.Screen name={Strings.NAVIGATION.editprofile} component={EditProfileScreen} />
    // </Drawer.Navigator>
  );
};

export default AppStack;
