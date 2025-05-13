import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EventStartedScreenUI from './EventStartedScreenUI';
import Strings from '../../utils/constants/Strings';

export default function EventStartedScreen(props) {
  let {IsRegistered} = props.route.params;

  const handleNavigate = () => {
    if (IsRegistered) {
      props.navigation.navigate(Strings.NAVIGATION.eventdetail , {
        IsRegistered:true
      });
    } else {
      props.navigation.navigate(Strings.NAVIGATION.eventregister);
    }
  };

  return (
    <View style={styles.container}>
      <EventStartedScreenUI handleNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
