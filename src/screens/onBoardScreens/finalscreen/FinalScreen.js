import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FinalScreenUI from './FinalScreenUI';
import Strings from '../../../utils/constants/Strings';

export default function FinalScreen(props) {
  const [state, setState] = useState({});
  const [options] = useState({})
  const handleSubmit = () => {
    props.navigation.navigate(Strings.NAVIGATION.app);
  };
  return (
    <View style={styles.container}>
      <FinalScreenUI {...props} {...state} {...options} handleSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
