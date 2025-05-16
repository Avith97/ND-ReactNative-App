import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ProgramLeaderBoardScreenUI from './ProgramLeaderBoardScreenUI'
import Colors from '../../utils/constants/Colors'

export default function ProgramLeaderBoardScreen() {

    const [state , setState] = useState({selectedTab:"Male"})

    const [options] = useState({
        tabs: ['Male', 'OverAll', 'Female'],
        DATA: [
          {
            id: '1',
            name: 'Dhiraj Bhasme',
            score: 1034,
            backgroundColor: '#E6F7FF', // light blue
            avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
          },
          {
            id: '2',
            name: 'Lakhan Nemane',
            score: 988,
            backgroundColor: '#FFECE6', // light orange
            avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
          },
          {
            id: '3',
            name: 'Avith Hegde',
            score: 900,
            backgroundColor: '#FFF7E6', // light yellow
            avatar: 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
          },
        ],
    })

    const handleChange = tab => {
        setState(prev => ({...prev, selectedTab: tab}));
      };
  return (
    <View style={{flex:1 ,backgroundColor:Colors.white , padding:20}}>
      <ProgramLeaderBoardScreenUI  {...options} {...state} handleChange={handleChange}/>
    </View>
  )
}

const styles = StyleSheet.create({})