import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './stack/AuthStack'
import Strings from '../utils/constants/Strings'
import SplashScreen from '../screens/splash/SplashScreen'
import AppStack from './stack/AppStack'
import OnBoardScreen from '../screens/onBoardScreens/OnBoardScreen'
import { useSelector } from 'react-redux'

const Navigator = props => {
  const Stack = createStackNavigator()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <NavigationContainer
      ref={r => {
        global.navigation = r
      }}
      linking={[]}>
      <Stack.Navigator
        initialRouteName={Strings.NAVIGATION.splash}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal'
        }}>
        <Stack.Screen
          name={Strings.NAVIGATION.splash}
          component={SplashScreen}
        />
        {!isLoggedIn && (
          <Stack.Screen name={Strings.NAVIGATION.auth} component={AuthStack} />
        )}
        {isLoggedIn && (
          <>
            <Stack.Screen
              name={Strings.NAVIGATION.onboard}
              component={OnBoardScreen}
            />
            <Stack.Screen name={Strings.NAVIGATION.app} component={AppStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
