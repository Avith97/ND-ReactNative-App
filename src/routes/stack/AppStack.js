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
import EventStartedScreen from '../../screens/eventstartedScreen/EventStartedScreen';
import EventDetailScreen from '../../screens/eventdetailscreen/EventDetailScreen';
import RegisterEventScreen from '../../screens/registerevent/RegisterEventScreen';
import ConsentScreen from '../../screens/consentscreen/ConsentScreen';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={Strings.NAVIGATION.home}
      screenOptions={{headerShown: false}}>
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
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        const customHeaderScreens = [
          Strings.NAVIGATION.home,
          Strings.NAVIGATION.eventdetail,
          Strings.NAVIGATION.eventstarted,
          Strings.NAVIGATION.eventregister,
          Strings.NAVIGATION.consent,
        ];
    
        if (customHeaderScreens.includes(route.name)) {
          return {
            header: () => <AppCustomHeader />,
          };
        }
    
        return {
          headerShown: true, // default header for all other screens
        };
      }}>
      <Stack.Screen name={Strings.NAVIGATION.home} component={TabNavigator} />
      <Stack.Screen
        name={Strings.NAVIGATION.profile}
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.bmi}
        component={BMICardScreen}
        options={{title: 'BMI'}}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.notificationsetting}
        component={NotificationSettingScreen}
        options={{title: 'Notification Settings'}}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.editprofile}
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.activitysync}
        component={ActivitySyncScreen}
        options={{title: 'Activity Sync'}}
      />

      {/* Event specific screen */}

      <Stack.Screen
        name={Strings.NAVIGATION.eventstarted}
        component={EventStartedScreen}
        options={{title: 'Get started'}}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.eventdetail}
        component={EventDetailScreen}
        options={{title: 'Event Detail'}}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.eventregister}
        component={RegisterEventScreen}
        options={{title: 'Register Event'}}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.consent}
        component={ConsentScreen}
        options={{title: 'Consent'}}
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
