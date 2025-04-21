import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ProgramScreenUI from './ProgramScreenUI'
import Colors from '../../../utils/constants/Colors'
import { Images } from '../../../utils/constants/Images'

export default function ProgramScreen() {

    const [options , setOptions] = useState({
        programs : [
            {
              title: 'Step Challenge',
              duration: '20 Min',
              calories: 432,
              image: Images.runner_bg_image,
              status: 'Ongoing',
            },
            {
              title: 'Cycle Challenge',
              duration: '20 Min',
              calories: 432,
              image: Images.runner_bg_image,
              status: 'Ongoing',
            },
            {
                title: 'Step Challenge',
                duration: '20 Min',
                calories: 432,
                image: Images.runner_bg_image,
                status: 'Ongoing',
              },
              {
                title: 'Cycle Challenge',
                duration: '20 Min',
                calories: 432,
                image: Images.runner_bg_image,
                status: 'Ongoing',
              },
              {
                title: 'Step Challenge',
                duration: '20 Min',
                calories: 432,
                image: Images.runner_bg_image,
                status: 'Ongoing',
              },
              {
                title: 'Cycle Challenge',
                duration: '20 Min',
                calories: 432,
                image: Images.runner_bg_image,
                status: 'Ongoing',
              },
          ]
    })

   
    
  return (
    <View style={styles.container}>
      <ProgramScreenUI {...options} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:Colors.white
    }
})