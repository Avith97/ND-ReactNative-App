import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabSelector from '../../common/components/tabselector/TabSelector';
import {Image} from 'react-native';
import {fontSize} from '../../utils/constants/Fonts';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import {hp, wp} from '../../common/functions/dimensions';
import Icons, {iconType} from '../../assets/icons/Icons';
import Colors from '../../utils/constants/Colors';
import UserLeaderBoardCard from '../../common/components/userleaderboardcard/UserLeaderBoardCard';

export default function ProgramLeaderBoardScreenUI(props) {
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
  return (
    <View>
      <View style={styles.headerIconTitle}>
        <Text style={{fontSize: fontSize.m, fontWeight: 700}}>Leaderboard</Text>
        <Icons name={'filter'} type={iconType.feather} size={20} />
      </View>
      <View style={{marginBottom: hp(1.5)}}>
        <CustomTextInput
          name={'firstname'}
          inputStyle={{...styles.textInputStyle}}
          // onChangeText={props?.handleChange}
          inputProps={{
            // flex: 1,
            //   value: props.firstname,
            placeholder: 'Name / BIB no.',
          }}
          leftIcon={{
            type: iconType.material,
            name: 'Search',
            size: fontSize.l,
            // color: Colors.red,
          }}
        />
      </View>

      <UserLeaderBoardCard />



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
});
