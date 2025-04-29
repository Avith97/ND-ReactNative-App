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

export default function ProgramDashboardScreenUI(props) {
  const TrophyIcon = () => (
    <Image
      source={{uri: 'https://img.icons8.com/3d-fluency/94/prize.png'}}
      style={{width: 24, height: 24}}
    />
  );

  const LeaderboardItem = ({item}) => (
    <View
      style={[styles.itemContainer, {backgroundColor: item.backgroundColor}]}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
      <TrophyIcon />
    </View>
  );

  const DayRecordItem = ({item}) => {
    return (
      <View style={styles.dayRecordItem}>
        <Icons
          type={iconType.feather}
          name={'user-check'}
          size={10}
          color={Colors.danger}
          style={{textAlign:"center" , fontWeight:800}}
        />
        <Text style={{textAlign:"center" , fontWeight:800}}>Day 1</Text>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.DaysResponseContainer}>
        <FlatList
          data={props.DATA}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => <DayRecordItem item={item} />}
          // scrollEnabled={false} // FlatList won't scroll, only ScrollView will
        />
      </View>

      <View style={styles.progressContainer}>
        <PieProgressBar program />
      </View>

      <View style={styles.dashboardData}>
        <TabSelector tabs={props.tabs} onTabChange={props.handleChange} />

        <FlatList
          data={props.DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => <LeaderboardItem item={item} />}
          scrollEnabled={false} // FlatList won't scroll, only ScrollView will
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
    paddingVertical: hp(2),
    borderRadius: 10,
    marginVertical: hp(1),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: '#333',
  },
  score: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },

  //
  dayRecordItem: {
    width: wp(20),
    height: hp(8),
    backgroundColor: Colors.dateBackground,
    paddingVertical: hp(2),
    borderRadius: 10,
    marginRight: hp(1),
    marginVertical:hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
