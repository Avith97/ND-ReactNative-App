import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// constants utils & assets
import Colors from '../../../utils/constants/Colors';
import {Images} from '../../../utils/constants/Images';
import Strings from '../../../utils/constants/Strings';

// UI component
import ProgramScreenUI from './ProgramScreenUI';
import {services} from '../../../services/axios/services';
import {BASE_URL, URL} from '../../../utils/constants/Urls';
import moment from 'moment';

export default function ProgramScreen(props) {
  const [state, setState] = useState({
    selectedTabID: 0,
  });

  const [options, setOptions] = useState({
    programs: [],
    tabs: [
      {id: 0, title: 'My Programs'},
      {id: 1, title: 'Upcoming'},
    ],
  });

  // Fetch "My Programs"
  const fetchPrograms = async () => {
    try {
      const resp = await services._get(URL.events, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNzIyIiwiaWF0IjoxNzA5NzE3OTgzfQ.X2r3mkvbjWZ7a4ngv6cB8aO31HZcgAkpjtDigFXUhizqqhbyC7xkfx1-3vyLmLLpOZICgNXIl15GXObE7uli2g',
        },
      });

      if (resp.type !== 'success') return;

      if (resp.api_response.status === 200) {
        const formattedPrograms = resp?.data?.data.map(event => {
          const now = moment();
          const start = moment(event?.localStartDate);
          const end = moment(event?.localEndDate);

          return {
            title: event?.name,
            localStartDate: event?.localStartDate,
            localEndDate: event?.localEndDate,
            buttonName: 'View Result',
            image: {uri: `${BASE_URL.DEV}${event.image?.url}`},
            eventStatus: now.isBetween(start, end, undefined, '[]')
              ? 'ongoing'
              : 'completed',
            program: event,
          };
        });

        setOptions(prev => ({
          ...prev,
          programs: formattedPrograms,
        }));
      }
    } catch (error) {
      console.log('Error fetching all programs:', error);
    }
  };

  // Fetch "Upcoming Programs"
  const fetchUpcomingPrograms = async () => {
    try {
      const resp = await services._get(URL.upcomingEvents, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNzIyIiwiaWF0IjoxNzA5NzE3OTgzfQ.X2r3mkvbjWZ7a4ngv6cB8aO31HZcgAkpjtDigFXUhizqqhbyC7xkfx1-3vyLmLLpOZICgNXIl15GXObE7uli2g',
        },
      });

      if (resp.type !== 'success') return;

      if (resp.api_response.status === 200) {
        const formattedPrograms = resp?.data?.data.map(event => {
          const now = moment();
          const start = moment(event?.localStartDate);
          const end = moment(event?.localEndDate);

          return {
            title: event?.name,
            localStartDate: event?.localStartDate,
            localEndDate: event?.localEndDate,
            image: {uri: `${BASE_URL.DEV}${event.image?.url}`},
            eventStatus: now.isBetween(start, end, undefined, '[]')
              ? 'ongoing'
              : 'upcoming',
            program: event,
          };
        });

        setOptions(prev => ({
          ...prev,
          programs: formattedPrograms,
        }));
      }
    } catch (error) {
      console.log('Error fetching upcoming programs:', error);
    }
  };

  // Fetch data when selectedTabID changes
  useEffect(() => {
    if (state.selectedTabID === 0) {
      fetchPrograms();
    } else {
      fetchUpcomingPrograms();
    }
  }, [state.selectedTabID]);
  const handleChange = tab => {
    setState(prev => ({...prev, selectedTabID: tab?.id}));
  };

  const handleNavigate = () => {
    if (state.selectedTabID === 0) {
      props.navigation.navigate(Strings.NAVIGATION.dashboard);
    } else {
      props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
        isRegistered: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ProgramScreenUI
        {...state}
        {...options}
        handleNavigate={handleNavigate}
        handleChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:20,
    backgroundColor: Colors.white,
  },
});
