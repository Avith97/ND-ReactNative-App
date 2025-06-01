import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Strings from '../../utils/constants/Strings';
import OnBoardingScreenUI from './OnBoardingScreenUI';
import {services} from '../../services/axios/services';
import {onBoardingScreenData} from '../../data/static_data/temp';
import OnBoardForm from './OnBoardForm';

export default function OnBoardScreen(props) {
  global.OnboardingData = null
  global.CurentOnboardingScreen = 'more_about'
  const [state, setState] = useState({
    onBoardQuestions: null,
    slides: [],
  });

  useEffect(() => {
    initiateScreen();
  }, []);

  async function initiateScreen() {
    let data = await getDetails();
    if (!data) {
      console.log('No data received for onboarding screen');
      return;
    }

    let Slides = data?.onBoardQuestions?.map((item, index) => {
      return () => (
        <OnBoardForm key={index} data={item} {...props} {...state} />
      );
    });
    setState({...state, onBoardQuestions: data, slides: Slides});
  }

  async function getDetails() {
    try {
      // Simulate an API call or any async operation
      let resp = await services._get(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      console.log('Response:', resp);
      // You can update the state with the response data if needed
      // setState({...state, data: response.data});

      return onBoardingScreenData;
    } catch (error) {
      console.log('Error onboard screen get details', error);
    }
  }

  const handleChange = (params, val) => {
    setState({
      ...state,
      [params]: val,
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted with state:', state);
    // You can navigate to the next screen or perform any action here
    return;
    props.navigation.navigate(Strings.NAVIGATION.app, {
      isLoggedIn: true,
    });
  };

  function onNext(e) {
    console.log('onnext called')
    global.CurentOnboardingScreen = 'more_about'
    e?.()
  }

  return (
    <View style={{flex: 1}}>
      <OnBoardingScreenUI
        {...state}
        {...props}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onNext={onNext}
      />
    </View>
  );
}
