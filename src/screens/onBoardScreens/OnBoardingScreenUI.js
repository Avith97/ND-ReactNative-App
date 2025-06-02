import {View, Text, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import OnboardingWrapper from '../../common/components/onboarding/OnboardingWrapper';
import MoreAboutScreen from './MoreInfo/MoreAboutScreen';
import {hp, wp} from '../../common/functions/dimensions';
import Loader from '../../common/components/loader/Loader';

const OnBoardingScreenUI = props => {
  const [key, setkey] = useState(0)
  const [slides, setslides] = useState([
    () => (
      <MoreAboutScreen
        {...props}
        handleChange={props.handleChange}
        {...styles}
      />
    )
  ])

  useEffect(() => {
    setkey(key + 1);
    setslides([...slides, ...props?.slides])
  }, [props?.slides])


  return (
    <View key={key} style={{ flex: 1 }}>
      <Loader />
      {/* {props.slides?.length && */}
      <OnboardingWrapper
        slides={[...slides]}
        onNext={props.onNext}
        onSkip={() => console.log('Skipped')}
        onFinish={props.handleSubmit}
      />
      {/* } */}
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
