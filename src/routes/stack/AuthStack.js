import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../../screens/login/LoginScreen';
import Strings from '../../utils/constants/Strings';
import OtpScreen from '../../screens/otp/OtpScreen';
import SignUpScreen from '../../screens/signup/SignUpScreen';
import RegistrationScreen from '../../screens/register/RegistrationScreen';



// const Stack = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = (props) => {
    return (
        <Stack.Navigator initialRouteName={Strings.NAVIGATION.login}
            screenOptions={
                {
                    headerShown: false,
                }
            }
        >
            {/* <Stack.Screen name={Strings.NAVIGATION.splash} component={SplashScreen} /> */}
            <Stack.Screen name={Strings.NAVIGATION.login} component={LoginScreen} />
            <Stack.Screen name={Strings.NAVIGATION.otp} component={OtpScreen} />
            <Stack.Screen name={Strings.NAVIGATION.signup} component={SignUpScreen} />
            <Stack.Screen name={Strings.NAVIGATION.register} component={RegistrationScreen} />

            {/* <Stack.Screen name={Strings.NAVIGATION.dashboard} component={DashboardCharts} /> */}
            
        </Stack.Navigator>
    )
}

export default AuthStack