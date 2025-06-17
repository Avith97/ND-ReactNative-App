import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Platform } from 'react-native'
import HomeScreenUI from './HomeScreenUI'
import { hp } from '../../../common/functions/dimensions'
import Strings from '../../../utils/constants/Strings'
import { services } from '../../../services/axios/services'
import { store } from '../../../redux/store'
import { Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

export default function HomeScreen(props) {
  const { isLoggedIn } = props.route.params

  const [loading, setLoading] = useState(false)
  let isFocused = useIsFocused()
  // Custom hook to fetch health connect data
  // const {healthConnectData, fetchAllData} = useHealthConnectData();

  const [state, setState] = useState({
    HomeScreenData: {
      events: [],
      progressBar: 0
    }
  })

  useEffect(() => {
    initiateScreen()
    // requestHealthPermissions();
  }, [isFocused])

  async function initiateScreen() {
    let data = await getDetails()

    if (!data) {
      console.log('No data received for onboarding screen')
      return
    }

    setState({ ...state, HomeScreenData: data })
  }

  async function getDetails() {
    try {
      // Simulate an API call or any async operation
      let resp = await services._get(
        `/health/summary/${store.getState().auth?.runnerId}`,
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`
          }
        }
      )
      // console.log('Response:', resp)
      // You can update the state with the response data if needed
      // setState({...state, data: response.data});

      return resp.data || [] // Assuming resp.data is an array
    } catch (error) {
      console.log('Error onboard screen get details', error)
    }
  }

  // Initialize Health Connect and request permissions
  // const requestHealthPermissions = useCallback(async () => {
  //   if (Platform.OS === 'ios') return;
  //   await initialize();
  //   try {
  //     await requestPermission([
  //       {accessType: 'read', recordType: 'Steps'},
  //       {accessType: 'read', recordType: 'Distance'},
  //       {accessType: 'read', recordType: 'ActiveCaloriesBurned'},
  //     ]);
  //     await fetchAllData();
  //   } catch (error) {
  //     console.error('Permission error:', error);
  //   }
  // }, []);

  const handleNavigate = (isProgram, registered) => {
    if (!registered) {
      props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
        IsRegistered: registered
      })
    } else {
      if (isProgram === Strings.NAVIGATION.submitresponse) {
        props.navigation.navigate(Strings.NAVIGATION.submitresponse)
      } else if (isProgram) {
        props.navigation.navigate(Strings.NAVIGATION.programdetail, {
          IsRegistered: registered
        })
      } else {
        props.navigation.navigate(Strings.NAVIGATION.eventstarted, {
          IsRegistered: registered
        })
      }
    }
  }

  // function handleLoading(params) {
  //   setLoading(params);
  // }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: hp(5) }}
      showsVerticalScrollIndicator={false}>
      <HomeScreenUI
        {...state}
        progressEvent={state?.HomeScreenData?.events?.[0]}
        isLoggedIn={isLoggedIn}
        handleNavigate={handleNavigate}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    paddingBottom: hp(10)
  }
})
