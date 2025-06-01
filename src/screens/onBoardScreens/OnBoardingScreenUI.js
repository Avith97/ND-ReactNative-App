import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import OnboardingWrapper from '../../common/components/onboarding/OnboardingWrapper';
import MoreAboutScreen from './MoreInfo/MoreAboutScreen';
import {hp, wp} from '../../common/functions/dimensions';

const OnBoardingScreenUI = props => {
  return (
    <View style={{flex: 1}}>
      <OnboardingWrapper
        slides={[
          () => (
            <MoreAboutScreen
              {...props}
              handleChange={props.handleChange}
              {...styles}
            />
          ),

          ...props.slides,

          // () => (
          //   <ActivityLevelScreen
          //     {...state}
          //     handleChange={handleChange}
          //     {...styles}
          //   />
          // ),
          // () => (
          //   <BellyConditionScreen
          //     {...state}
          //     handleChange={handleChange}
          //     {...styles}
          //   />
          // ),
          // () => (
          //   <ExerciseScreen {...state} handleChange={handleChange} {...styles} />
          // ),
          // () => (
          //   <MotivationScreen
          //     {...state}
          //     handleChange={handleChange}
          //     {...styles}
          //   />
          // ),
          // () => (
          //   <FinalScreen {...state} handleChange={handleChange} {...styles} />
          // ),
        ]}
        onSkip={() => console.log('Skipped')}
        onFinish={props.handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  childContainerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    width: wp(100),
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
  },
});

export default OnBoardingScreenUI;
