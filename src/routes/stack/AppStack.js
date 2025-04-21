import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Strings from '../../utils/constants/Strings';
import HealthScreen from '../../../Healthconnect';
import HomeScreen from '../../screens/appscreens/HomeScreen';

const AppStack = (props) => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName={Strings.NAVIGATION.home}>
            <Drawer.Screen name={Strings.NAVIGATION.health} component={HealthScreen} />
            <Drawer.Screen name={Strings.NAVIGATION.home} component={HomeScreen} />

        </Drawer.Navigator>

    )
}

export default AppStack