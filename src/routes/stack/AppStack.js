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
import LeaderBoardScreen from '../../screens/leaderboard/LeaderBoardScreen';
import ProgramDetailScreen from '../../screens/programsdetail/ProgramDetailScreen';
import SubmitResponseScreen from '../../screens/submitresponse/SubmitResponseScreen';
import Icons, {iconType} from '../../assets/icons/Icons';
import Colors from '../../utils/constants/Colors';
import NotificationListScreen from '../../screens/notificationlistscreen/NotificationListScreen';

const TabNavigator = props => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={Strings.NAVIGATION.home}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray_03,
      }}>
      {/* <Tab.Screen name={Strings.NAVIGATION.health} component={HealthScreen} /> */}
      <Tab.Screen
        name={Strings.NAVIGATION.home}
        component={HomeScreen}
        initialParams={{isLoggedIn: props.route?.params?.isLoggedIn}}
        options={{
          title: 'Home',
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600',
            // color: 'black',
          },
          tabBarIcon: ({color, size}) => (
            <Icons
              type={iconType.feather}
              name="home"
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tab.Screen
        name={Strings.NAVIGATION.program}
        component={ProgramScreen}
        options={{
          title: 'Program',
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600',
            // color: 'black',
          },
          tabBarIcon: ({color, size}) => (
            <Icons
              type={iconType.feather}
              name="align-justify"
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tab.Screen
        name={Strings.NAVIGATION.dashboard}
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600',
            // color: 'black',
          },
          tabBarIcon: ({color, size}) => (
            <Icons
              type={iconType.feather}
              name="bar-chart-2"
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tab.Screen
        name={Strings.NAVIGATION.calender}
        component={CalenderScreen}
        options={{
          title: 'Calendar',
          headerTitleStyle: {
            // fontSize: 20,
            fontWeight: '600',
            // color: 'black',
          },
          tabBarIcon: ({color, size}) => (
            <Icons
              type={iconType.feather}
              name="calendar"
              color={color}
              size={20}
            />
          ),
        }}
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
          Strings.NAVIGATION.leaderboard,
          Strings.NAVIGATION.programdetail,
        ];

        if (customHeaderScreens.includes(route.name)) {
          return {
            header: () => (
              <AppCustomHeader
                isLoggedIn={{isLoggedIn: props?.route.params?.isLoggedIn}}
              />
            ),
          };
        }

        return {
          headerShown: true, // default header for all other screens
        };
      }}>
      <Stack.Screen
        name={Strings.NAVIGATION.home}
        component={TabNavigator}
        initialParams={{isLoggedIn: props?.route.params?.isLoggedIn}}
      />
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

      <Stack.Screen
        name={Strings.NAVIGATION.leaderboard}
        component={LeaderBoardScreen}
        options={{title: 'Leaderboard'}}
      />

      {/* program */}
      <Stack.Screen
        name={Strings.NAVIGATION.programdetail}
        component={ProgramDetailScreen}
        options={{title: 'Program Detail'}}
      />

      <Stack.Screen
        name={Strings.NAVIGATION.submitresponse}
        component={SubmitResponseScreen}
        options={{title: 'Response '}}
      />

      {/* notification list screen */}

      <Stack.Screen
        name={Strings.NAVIGATION.notificationlist}
        component={NotificationListScreen}
        options={{title: 'Notification '}}
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
