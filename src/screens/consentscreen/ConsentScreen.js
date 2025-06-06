import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ConsentScreenUI from './ConsentScreenUI'
import Colors from '../../utils/constants/Colors'
import { Images } from '../../utils/constants/Images'

export default function ConsentScreen() {
  const [options] = useState({
    consentData: [
      {
        title: 'hello',
        consentListData: [
          {
            id: '1',
            title: 'Strava',
            image: Images.strava,
            bgColor: '#FFEFE7'
          },
          {
            id: '2',
            title: 'Garmin',
            image: Images.garmin,
            bgColor: '#F7F7F7'
          },
          {
            id: '3',
            title: 'MapMyRun',
            image: Images.mapmyrun,
            bgColor: '#EAF5FF'
          }
        ]
      },
      {
        title: 'steps',
        consentListData: [
          {
            id: '4',
            title: 'fitbit',
            image: Images.fitbit,
            bgColor: '#E6F6FA'
          },
          {
            id: '5',
            title: 'Google Fit',
            image: Images.google_fit,
            bgColor: '#FFF7E5'
          }
        ]
      }
    ]
  })
  return (
    <View style={styles.container}>
      <ConsentScreenUI {...options} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white
  }
})
