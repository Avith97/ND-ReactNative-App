import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import TabSelector from '../../common/components/tabselector/TabSelector';
import {StyleSheet} from 'react-native';
import {hp, wp} from '../../common/functions/dimensions';
import Fonts, {fontSize} from '../../utils/constants/Fonts';
import {ScrollView} from 'react-native';
import {Dimensions} from 'react-native';

function IndividualLeaderBoard({
  tabs,
  onTabChange,
  selectedTab,
  leaderBoardDetails,
}) {
  const data =
    selectedTab === 'Male'
      ? leaderBoardDetails.male || []
      : leaderBoardDetails.female || [];
  const renderItem = ({item}) => (
    <View
      style={[
        styles.itemContainer,
        {backgroundColor: item.backgroundColor || '#f2f2f2'},
      ]}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
      {/* <Image
        source={{uri: 'https://img.icons8.com/3d-fluency/94/prize.png'}}
        style={{width: 24, height: 24}}
      /> */}
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <TabSelector
        tabs={tabs}
        onTabChange={onTabChange}
        selectedTab={selectedTab}
      />

      {/* Only this part scrolls */}
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
        //   contentContainerStyle={{paddingBottom: hp(2), paddingTop: hp(1)}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  headerIconTitle: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
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
  textStyle: {
    fontFamily: Fonts.medium,
    color: 'black',
  },
  btnStyles: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1'),
    height: hp('6'),
    borderWidth: 1,
    marginVertical: hp(1),
  },
  btnTextStyle: {
    color: 'black',
  },
  btnStylesApply: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1'),
    height: hp('6'),
    borderRadius: 10,
    marginVertical: hp(1),
  },
  btnTextStyleApply: {
    color: 'black',
  },
});
export default IndividualLeaderBoard;
