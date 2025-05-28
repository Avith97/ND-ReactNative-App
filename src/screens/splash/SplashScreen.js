import {View, Text, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashUI from './SplashUI';
import Strings from '../../utils/constants/Strings';
import {appsnackbar} from '../../common/functions/snackbar_actions';
// import https from 'https';
import axios from 'axios';

const SplashScreen = props => {
  const [state, setState] = useState({
    isLoggedIn: false,
  });

  useEffect(() => {
    checkAppLaunch();
    setTimeout(() => {
      if (!state.isLoggedIn) {
        props.navigation.replace(Strings.NAVIGATION.app, {
          isLoggedIn:false,
        });
      }
      //   props.navigation.replace(Strings.NAVIGATION.auth);
    }, 5000);
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  async function checkAppLaunch(params) {
    // getdevice()
    axios.get('https://192.168.1.49:8443/api/v1/yoga/challenge/leaderboard/details/435',
      {
        timeout: 10000,
      },
    )
      .then(function (response) {
        console.log(response, '<==== response ====>');

        alert('response success');
      })
      .catch(function (error) {
        alert('response error');
        console.log(
          error,
          '<==== error ====>',
          JSON.parse(JSON.stringify(error)),
        );
      });
    let x = await Linking.getInitialURL();
    if (x) {
      console.log('<==== new console ====>', x);
      appsnackbar.showSuccessMsg(`${x}\nApp open from link`);
    }

    Linking.addEventListener('url', e => {
      console.log('token from appA -->', e);
      // setTimeout(() => {
      appsnackbar.showSuccessMsg(`${e.url}\nApp open from link`);
      // }, 6000);
      //   Linking.openURL(`dummyApp://token${`newtoken123`}`)
      // Linking.openURL(`dummyApp://token${`newtoken123`}`)
    });
  }

  return (
    <View style={{flex: 1}}>
      <SplashUI />
    </View>
  );
};

export default SplashScreen;
