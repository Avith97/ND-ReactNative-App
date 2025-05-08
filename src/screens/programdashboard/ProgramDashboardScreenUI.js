import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {FlatList} from 'react-native';
import {fontSize} from '../../utils/constants/Fonts';
import TabSelector from '../../common/components/tabselector/TabSelector';
import PieProgressBar from '../../common/components/progressbar/PieProgressBar';
import Colors from '../../utils/constants/Colors';
import {hp, wp} from '../../common/functions/dimensions';
import Icons, {iconType} from '../../assets/icons/Icons';
import CustomButton from '../../common/components/buttons/CustomButton';

export default function ProgramDashboardScreenUI(props) {
  const DayRecordItem = ({item, index}) => {
    return (
      <View
        style={{
          ...styles.dayRecordItem,
          backgroundColor: item.response ? '#F4101054' : Colors.primary,
        }}>
        <Icons
          type={iconType.feather}
          name={'user-check'}
          size={10}
          color={Colors.danger}
          style={{textAlign: 'center', fontWeight: 800}}
        />
        <Text style={{textAlign: 'center', fontWeight: 800}}>
          Day {item.id}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.DaysResponseContainer}>
        <FlatList
          data={props.daysData}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => <DayRecordItem item={item} />}
          // scrollEnabled={false} // FlatList won't scroll, only ScrollView will
        />
      </View>

      <View style={styles.progressContainer}>
        <PieProgressBar program />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={'Leaderboard'}
          name={'leaderboard'}
          onPress={props.handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
          }}
        />

        <CustomButton
          title={'Share'}
          name={''}
          // onPress={handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  DaysResponseContainer: {},
  progressContainer: {
    backgroundColor: Colors.gray_01,
    alignItems: 'center',
    paddingVertical: hp(4),
    borderRadius: 10,
    marginVertical: hp(1),
  },

  //
  dayRecordItem: {
    width: wp(20),
    height: hp(8),
    backgroundColor: Colors.dateBackground,
    paddingVertical: hp(2),
    borderRadius: 10,
    marginRight: hp(1),
    marginVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyles: {
    width: wp(60),
    marginVertical: hp(1),
  },
  plusbtnStyle: {
    width: wp(10),
  },
});
