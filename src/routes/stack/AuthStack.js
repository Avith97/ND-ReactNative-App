import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../../screens/login/LoginScreen';
import Strings from '../../utils/constants/Strings';

// const Stack = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={Strings.NAVIGATION.login} component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack