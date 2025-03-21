import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Strings from '../../utils/constants/Strings';
import HealthScreen from '../../../Healthconnect';

const AppStack = (props) => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName={Strings.NAVIGATION.health}>
            <Drawer.Screen name={Strings.NAVIGATION.health} component={HealthScreen} />
        </Drawer.Navigator>

    )
}

export default AppStack