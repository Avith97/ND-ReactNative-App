import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import OnboardingWrapper from '../../common/components/onboarding/OnboardingWrapper';
import MoreAboutScreen from './MoreInfo/MoreAboutScreen';
import {hp, wp} from '../../common/functions/dimensions';

const OnBoardingScreenUI = props => {
  return (
    <View style={{flex: 1}}>
      {props.slides?.length &&
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
        ]}
        onNext={props.onNext}
        onSkip={() => console.log('Skipped')}
        onFinish={props.handleSubmit}
      />
      }
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
