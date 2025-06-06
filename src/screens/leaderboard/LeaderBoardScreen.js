import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LeaderBoardScreenUI from './LeaderBoardScreenUI'
import Colors from '../../utils/constants/Colors'

export default function LeaderBoardScreen(props) {
  const [state, setState] = useState({
    selectedTab: 'Female'
  })
  const [options] = useState({
    DATA: [
      {
        id: '1',
        name: 'Dhiraj Bhasme',
        score: 1034,
        backgroundColor: '#E6F7FF', // light blue
        avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png'
      },
      {
        id: '2',
        name: 'Lakhan Nemane',
        score: 988,
        backgroundColor: '#FFECE6', // light orange
        avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png'
      },
      {
        id: '3',
        name: 'Avith Hegde',
        score: 900,
        backgroundColor: '#FFF7E6', // light yellow
        avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png'
      }
    ],
    tabs: ['Male', 'OverAll', 'Female']
  })

  const handleChange = tab => {
    setState(prev => ({ ...prev, selectedTab: tab }))
  }
  return (
    <View style={styles.container}>
      <LeaderBoardScreenUI
        {...state}
        {...options}
        {...props}
        handleChange={handleChange}
      />
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
