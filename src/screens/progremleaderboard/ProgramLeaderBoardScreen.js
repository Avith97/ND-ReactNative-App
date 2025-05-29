// react native imports
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// constants utils & assets
import Colors from '../../utils/constants/Colors';

// UI component
import ProgramLeaderBoardScreenUI from './ProgramLeaderBoardScreenUI';

export default function ProgramLeaderBoardScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);

  const [state, setState] = useState({selectedTab: 'Male'});
  const [dropDownValue, setDropDownValue] = useState({
    topParticipant: '',
    weekFilter: '',
  });
  const [options] = useState({
    tabs: [{id:0,title:'Male'},{id:1, title: 'OverAll'}, {id:2, title:'Female'}],
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
  });

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };
  const handleChange = tab => {
    setState(prev => ({...prev, selectedTab: tab}));
  };

  async function handleDropdownChange(params, val) {
    setDropDownValue({
      ...state,
      [params]: val,
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white, padding: 20}}>
      <ProgramLeaderBoardScreenUI
        {...options}
        {...state}
        handleChange={handleChange}
        toggleDialog={toggleDialog}
        dialogVisible={dialogVisible}
        dropDownValue={dropDownValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
