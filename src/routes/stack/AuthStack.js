import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import LoginScreen from '../../screens/login/LoginScreen';
import Strings from '../../utils/constants/Strings'
import OtpScreen from '../../screens/otp/OtpScreen'
import SignUpScreen from '../../screens/signup/SignUpScreen'
import RegistrationScreen from '../../screens/register/RegistrationScreen'
import Icons, { iconType } from '../../assets/icons/Icons'
import CreateProfileScreen from '../../screens/createprofile/CreateProfileScreen'
import LoginScreen from '../../screens/login/LoginScreen'

// const Stack = createDrawerNavigator();
const Stack = createStackNavigator()

const AuthStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={Strings.NAVIGATION.login}
      screenOptions={({ navigation, route }) => ({
        // Hide header for login screen
        headerShown: route.name !== Strings.NAVIGATION.login,

        // Show custom back arrow only (no title, no right component)
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}>
            <Icons
              name="arrow-back-outline"
              type={iconType.ionicon}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        ),
        headerTitle: '', // Remove title
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'white' // optional
        }
      })}>
      {/* <Stack.Screen name={Strings.NAVIGATION.splash} component={SplashScreen} /> */}
      <Stack.Screen
        name={Strings.NAVIGATION.login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name={Strings.NAVIGATION.otp} component={OtpScreen} />
      <Stack.Screen name={Strings.NAVIGATION.signup} component={SignUpScreen} />
      <Stack.Screen
        name={Strings.NAVIGATION.create_profile}
        component={CreateProfileScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.register}
        component={RegistrationScreen}
      />

      {/* <Stack.Screen name={Strings.NAVIGATION.dashboard} component={DashboardCharts} /> */}
    </Stack.Navigator>
  )
}

export default AuthStack
