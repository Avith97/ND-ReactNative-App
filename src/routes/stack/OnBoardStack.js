// OnboardingStack.js
import { createStackNavigator } from '@react-navigation/stack'
import Strings from '../../utils/constants/Strings'
import OnBoardCustomHeader from '../../screens/onBoardScreens/OnBoardCustomHeader'

import imagesSlideTab from '../../screens/onBoardScreens/imagesslidetab/ImagesSlideTab'
import CardScreenTab from '../../screens/onBoardScreens/cardscreentab/CardScreenTab'
import MoreAboutScreen from '../../screens/onBoardScreens/MoreInfo/MoreAboutScreen'
import ActivityLevelScreen from '../../screens/onBoardScreens/listslidetab/ListSlideTab'
import CheckBoxSlideTab from '../../screens/onBoardScreens/checkboxslidetab/CheckBoxSlideTab'

const Stack = createStackNavigator()

export default function OnboardingStack(props) {
  const onSkip = () => {}

  return (
    <Stack.Navigator
      initialRouteName={Strings.NAVIGATION.gender}
      screenOptions={({ navigation, route }) => {
        const screens = [
          Strings.NAVIGATION.gender,
          Strings.NAVIGATION.listSlideTab,
          Strings.NAVIGATION.imagesSlideTab,
          Strings.NAVIGATION.listMultiSelectScreen,
          Strings.NAVIGATION.checkboxScreen
          // Strings.NAVIGATION.cardSlideScreen,
        ]
        const currentIndex = screens.indexOf(route.name)
        const progress = (currentIndex + 1) / screens?.length
        return {
          header: () => (
            <OnBoardCustomHeader
              canGoBack={navigation.canGoBack()}
              onSkip={() =>
                navigation.navigate(Strings.NAVIGATION.cardSlideScreen)
              }
              onBack={() => navigation.goBack()}
              hideSkip={route.name === Strings.NAVIGATION.cardSlideScreen}
              progress={progress}
            />
          )
        }
      }}>
      <Stack.Screen
        name={Strings.NAVIGATION.gender}
        component={MoreAboutScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.listSlideTab}
        component={ActivityLevelScreen}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.imagesSlideTab}
        component={imagesSlideTab}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.listMultiSelectScreen}
        component={ListMultiSelectScreenTab}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.checkboxScreen}
        component={CheckBoxSlideTab}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.cardSlideScreen}
        component={CardScreenTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
