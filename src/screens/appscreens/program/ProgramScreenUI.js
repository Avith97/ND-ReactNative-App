import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ProgramCard from '../../../common/components/programcard/ProgramCard';
import {wp, hp} from '../../../common/functions/dimensions';
import {fontSize} from '../../../utils/constants/Fonts';

export default function ProgramScreenUI(props) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>


        <View style={styles.programList}>
          {props.programs.map((item, index) => (
            <View key={index} style={styles.cardSpacing}>
              <ProgramCard {...item} minWidth={'100%'} handleNavigate={props.handleNavigate} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: wp(5),
  },
  wrapper: {
    marginTop: hp(2),
  },

  programList: {
    gap: hp(2), // vertical space between cards
  },
  cardSpacing: {
    width: '100%',
  },
});
