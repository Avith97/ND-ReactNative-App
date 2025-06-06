// react native imports
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'

// common components
import TabSelector from '../../common/components/tabselector/TabSelector'
import UserLeaderBoardCard from '../../common/components/userleaderboardcard/UserLeaderBoardCard'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import CustomDropdown from '../../common/components/dropdown/CustomDropdown'
import DialogBox from '../../common/components/Modal/DialogBox'
import CustomButton from '../../common/components/buttons/CustomButton'

// constants utils & assets
import { Image } from 'react-native'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import { hp, wp } from '../../common/functions/dimensions'
import Icons, { iconType } from '../../assets/icons/Icons'

export default function ProgramLeaderBoardScreenUI({selectedTab, ...props}) {
  const TrophyIcon = () => (
    <Image
      source={{ uri: 'https://img.icons8.com/3d-fluency/94/prize.png' }}
      style={{ width: 24, height: 24 }}
    />
  )

  const LeaderboardItem = ({ item }) => (
    <View
      style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
      <TrophyIcon />
    </View>
  )
  return (
    <View>
      <View style={styles.headerIconTitle}>
        <Text style={{ fontSize: fontSize.m, fontWeight: 700 }}>
          Leaderboard
        </Text>
        <TouchableOpacity onPress={props.toggleDialog}>
          <Icons name={'filter'} type={iconType.feather} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: hp(1.5) }}>
        <CustomTextInput
          name={'firstname'}
          inputStyle={{ ...styles.textInputStyle }}
          // onChangeText={props?.handleChange}
          inputProps={{
            // flex: 1,
            //   value: props.firstname,
            placeholder: 'Name / BIB no.'
          }}
          leftIcon={{
            type: iconType.material,
            name: 'Search',
            size: fontSize.l
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
          renderItem={({ item }) => <LeaderboardItem item={item} />}
          scrollEnabled={false} // FlatList won't scroll, only ScrollView will
        />
      </View>
      <DialogBox visible={props.dialogVisible} onClose={props.toggleDialog}>
        <View
          style={{
            marginVertical: hp(1),
            flexDirection: 'column',
            width: '100%'
          }}>
          {/* Row 1 */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
              alignItems: 'center',
              justifyContent: 'space-between',
              alignContent: 'center'
            }}>
            <Text>Week Filter</Text>
            <View style={{ width: '50%' }}>
              <CustomDropdown
                name="participant"
                label="Select"
                data={[
                  { weekFilter: '1 May - 7 May' },
                  { weekFilter: '8 May - 14 May' },
                  { weekFilter: '15 May - 21 May' }
                ]}
                onChangeText={props.handleDropdownChange}
                valueExtractor={item => item.participant}
                labelExtractor={item => item.participant}
              />
            </View>
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
              alignItems: 'center',
              justifyContent: 'space-between',
              alignContent: 'center'
            }}>
            <Text>Week Filter</Text>
            <View style={{width: '50%'}}>
              <CustomDropdown
                name="weekFilter"
                label="Select Week"
                data={props.customDatesOptions}
                value={props.dropDownValue?.weekFilter?.label}
                onChangeText={(value, index, data) => {
                  props.handleDropdownChange('weekFilter', index);
                }}
                valueExtractor={item => item}
                labelExtractor={item => item.label}
              />
            </View>
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
              alignItems: 'center',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <Text>Top Participant</Text>
            <View style={{ width: '50%' }}>
              <CustomDropdown
                name="topParticipant"
                label="Select"
                data={[
                  { topParticipant: '5' },
                  { topParticipant: '10' },
                  { topParticipant: '15' }
                ]}
                value={props.dropDownValue.topParticipant?.label}
                onChangeText={(name, value, data) => {
                  props.handleDropdownChange(name, value);
                }}
                valueExtractor={item => item}
                labelExtractor={item => item.label}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            gap: 10
          }}>
          <CustomButton
            title={'Cancel'}
            name={'cancel'}
            onPress={props?.toggleDialog}
            btnStyles={styles.btnStyles}
            minWidth={wp('30')}
            btnTitleStyles={{
              ...styles.textStyle,
              ...styles.btnTextStyle
            }}
          />
          <CustomButton
            title={'Apply'}
            name={'apply'}
            onPress={() => {
              props?.toggleDialog();
              props?.onApplyFilters(); // trigger apply flag
            }}
            minWidth={wp('30')}
            btnStyles={styles.btnStylesApply}
            btnTitleStyles={{
              ...styles.textStyle,
              ...styles.btnTextStyleApply
            }}
          />
        </View>
      </DialogBox>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12
  },
  headerIconTitle: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2)
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 12
  },
  name: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: '#333'
  },
  score: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginRight: 8,
    color: '#333'
  },
  textStyle: {
    fontFamily: Fonts.medium,
    color: 'black'
  },
  btnStyles: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1'),
    height: hp('6'),
    borderWidth: 1,
    marginVertical: hp(1)
  },
  btnTextStyle: {
    color: 'black'
  },
  btnStylesApply: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1'),
    height: hp('6'),
    borderRadius: 10,
    marginVertical: hp(1)
  },
  btnTextStyleApply: {
    color: 'black'
  }
})
