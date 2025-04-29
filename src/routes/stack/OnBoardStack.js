// OnboardingStack.js
import {createStackNavigator} from '@react-navigation/stack';
import Strings from '../../utils/constants/Strings';
import OnBoardCustomHeader from '../../screens/onBoardScreens/OnBoardCustomHeader';
import MoreAboutScreen from '../../screens/onBoardScreens/moreinfo/MoreAboutScreen';
import ActivityLevelScreen from '../../screens/onBoardScreens/activitylevel/ActivityLevelScreen';
import BellyConditionScreen from '../../screens/onBoardScreens/bellycondition/BellyConditionScreen';
import ExerciseScreen from '../../screens/onBoardScreens/exercisescreen/ExerciseScreen';
import MotivationScreen from '../../screens/onBoardScreens/motivation/MotivationScreen';
import FinalScreen from '../../screens/onBoardScreens/finalscreen/FinalScreen';

const Stack = createStackNavigator();

export default function OnboardingStack(props) {
  const onSkip = () => {};

  return (
    <Stack.Navigator
      initialRouteName={Strings.NAVIGATION.gender}
      screenOptions={({navigation, route}) => {
        const screens = [
          Strings.NAVIGATION.gender,
          Strings.NAVIGATION.activityLevel,
          Strings.NAVIGATION.bellyCondition,
          Strings.NAVIGATION.exerciseType,
          Strings.NAVIGATION.motivation,
          // Strings.NAVIGATION.finalOnboard,
        ];
        const currentIndex = screens.indexOf(route.name);
        const progress = (currentIndex+1 ) / screens?.length;
        return {
          header: () => (
            <OnBoardCustomHeader
              canGoBack={navigation.canGoBack()}
              onSkip={() =>
                navigation.navigate(Strings.NAVIGATION.finalOnboard)
              }
              onBack={() => navigation.goBack()}
              hideSkip={route.name === Strings.NAVIGATION.finalOnboard}
              progress={progress}
            />
          ),
        };
      }}>
      <Stack.Screen
        name={Strings.NAVIGATION.gender}
        component={MoreAboutScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.activityLevel}
        component={ActivityLevelScreen}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.bellyCondition}
        component={BellyConditionScreen}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.exerciseType}
        component={ExerciseScreen}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.motivation}
        component={MotivationScreen}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.finalOnboard}
        component={FinalScreen}
           options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
