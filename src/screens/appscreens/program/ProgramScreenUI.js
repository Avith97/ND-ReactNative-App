import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {wp, hp} from '../../../common/functions/dimensions';
import {fontSize} from '../../../utils/constants/Fonts';
import TabSelector from '../../../common/components/tabselector/TabSelector';
import Colors from '../../../utils/constants/Colors';
import EventCard from '../../../common/components/eventcard/EventCard';
import ProgramCard from '../../../common/components/programcard/ProgramCard';
export default function ProgramScreenUI(props) {
 

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{marginVertical: hp(1)}}>
        <TabSelector tabs={props.tabs} onTabChange={props.handleChange} />
      </View>
      <View style={styles.wrapper}>
        {props.selectedTab === 'My Programs' ? (
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
        ) : (
          <Text style={styles.noFoundTitle}>No Records Found</Text>
        )}
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
    paddingHorizontal: 20,
  },

  programList: {
    gap: hp(2), // vertical space between cards
  },
  cardSpacing: {
    width: '100%',
  },
  noFoundTitle: {
    fontSize: fontSize.md,
    color: Colors.gray_06,
    textAlign: 'center',
  },
});
