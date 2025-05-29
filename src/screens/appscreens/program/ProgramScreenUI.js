// react native components
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

// constants utils
import {hp} from '../../../common/functions/dimensions';

// common components
import TabSelector from '../../../common/components/tabselector/TabSelector';
import MyProgramTab from './Tabs/MyProgramTab';
import UpComingsTab from './Tabs/UpComingsTab';

export default function ProgramScreenUI(props) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{marginVertical: hp(1)}}>
        <TabSelector tabs={props.tabs} onTabChange={props?.handleChange} />
      </View>
      <View style={styles.wrapper}>
        {props.selectedTabID === 0 ? (
          <MyProgramTab {...props} />
        ) : (
          <UpComingsTab {...props} />
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
});
