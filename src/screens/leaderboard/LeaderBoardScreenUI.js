import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import {iconType} from '../../assets/icons/Icons';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import {hp, wp} from '../../common/functions/dimensions';
import {Avatar} from 'react-native-elements';
import PieProgressBar from '../../common/components/progressbar/PieProgressBar';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';

export default function LeaderBoardScreenUI() {
  const DATA = [
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
  ];

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
    <View style={{flex: 1}}>
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
            type: iconType.feather,
            name: 'search',
            size: fontSize.l,
            color: Colors.red,
          }}
        />
      </View>

      <View style={styles.userCard}>
        <Avatar
          rounded
          size={'large'}
          source={{
            uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
          }}
          avatarStyle={styles.avatarImage}></Avatar>
        <View>
          <Text style={styles.nameTitle}>Lakhan Mahadu Nemane</Text>
          <Text>BIB no: 1628</Text>
        </View>
      </View>
      <View style={styles.userRecordSection}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Result</Text>
          <PieProgressBar leaderboard />
        </View>
        <View style={styles.rankContainer}>
          <View style={styles.cardItem}>
            <Text style={styles.resultTitle}>Gender Rank</Text>
            <Text style={styles.resultSubTitle}>1</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.resultTitle}>Overall Rank</Text>
            <Text style={styles.resultSubTitle}>1</Text>
          </View>
        </View>
      </View>

      <View style={{width: wp(90)}}>
        <View style={styles.tabSelection_container}>
          <Text
            style={{
              fontWeight: 600,
              backgroundColor: Colors.primary,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}>
            Male
          </Text>
          <Text
            style={{
              fontWeight: 600,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}>
            OverAll Rank
          </Text>
          <Text
            style={{
              fontWeight: 600,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}>
            Female
          </Text>
        </View>

        <ScrollView>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item}) => <LeaderboardItem item={item} />}
            scrollEnabled={false} // FlatList won't scroll, only ScrollView will
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: '#BCD64E2B',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameTitle: {
    fontSize: fontSize.md,
    fontWeight: 600,
  },
  userRecordSection: {
    width: wp(100),
    marginVertical: hp(2),
    flexDirection: 'row',
    gap: 10,
  },
  resultContainer: {
    backgroundColor: Colors.gray_01,
    width: wp(43),
    borderRadius: 8,
    paddingVertical: hp(2),
  },
  rankContainer: {
    gap: 10,
  },
  cardItem: {
    backgroundColor: Colors.gray_01,
    width: wp(43),
    height: hp(13),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: {
    color: Colors.white,
    fontSize: fontSize.m,
    textAlign: 'center',
    fontWeight: 600,
  },
  resultSubTitle: {
    color: Colors.primary,
    fontSize: fontSize.l,
    textAlign: 'center',
  },
  tabSelection_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5F4F4',
    paddingVertical: 10,
    borderRadius: 10,
  },

  // /
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
});
