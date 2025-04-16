// OnboardingStack.js
import {createStackNavigator} from '@react-navigation/stack';
import GenderScreenUI from '../../screens/onBoardScreens/GenderScreenUI';
import ActivityLevelScreenUI from '../../screens/onBoardScreens/ActivityLevelScreenUI';
import BellyConditionScreenUI from '../../screens/onBoardScreens/BellyConditionScreenUI';
import ExerciseTypeScreenUI from '../../screens/onBoardScreens/ExerciseTypeScreenUI';
import MotivationScreenUI from '../../screens/onBoardScreens/MotivationScreenUI';
import FinalScreenUI from '../../screens/onBoardScreens/FinalScreenUI';
import Strings from '../../utils/constants/Strings';
import OnBoardCustomHeader from '../../screens/onBoardScreens/OnBoardCustomHeader';

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
        const progress = (currentIndex ) / screens?.length;
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
        component={GenderScreenUI}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.activityLevel}
        component={ActivityLevelScreenUI}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.bellyCondition}
        component={BellyConditionScreenUI}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.exerciseType}
        component={ExerciseTypeScreenUI}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.motivation}
        component={MotivationScreenUI}
      />
      <Stack.Screen
        name={Strings.NAVIGATION.finalOnboard}
        component={FinalScreenUI}
      />
    </Stack.Navigator>
  );
}
