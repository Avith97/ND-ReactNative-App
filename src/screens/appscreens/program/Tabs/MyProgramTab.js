// react native imports
import React from 'react';
import {StyleSheet, View} from 'react-native';

// common components
import ProgramCard from '../../../../common/components/programcard/ProgramCard';

// constants utils
import {hp} from '../../../../common/functions/dimensions';

export default function MyProgramTab(props) {
  return (
    <View style={styles.programList}>
      {props.programs.map((item, index) => (
        <View key={index} style={styles.cardSpacing}>
          <ProgramCard
            {...item}
            minWidth={'100%'}
            handleNavigate={props.handleNavigate}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  programList: {
    gap: hp(2), // vertical space between cards
  },
  cardSpacing: {
    width: '100%',
  },
});
