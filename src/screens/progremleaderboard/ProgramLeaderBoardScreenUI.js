// react native imports
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// common components
import UserLeaderBoardCard from '../../common/components/userleaderboardcard/UserLeaderBoardCard'
import CustomDropdown from '../../common/components/dropdown/CustomDropdown'
import DialogBox from '../../common/components/Modal/DialogBox'
import CustomButton from '../../common/components/buttons/CustomButton'

// constants utils & assets
import { Image } from 'react-native'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import { hp, wp } from '../../common/functions/dimensions'
import Icons, { iconType } from '../../assets/icons/Icons'
import IndividualLeaderBoard from './IndividualTab/IndividualLeaderBoard'
import TeamTab from './teamtab/TeamTab'
import AgeGroupTab from './agegrouptab/AgeGroupTab'
import SearchBar from '../../common/components/searchbar/Searchbar'
import Colors from '../../utils/constants/Colors'
import RunnerGroupTab from './runnergroup/RunnerGroupTab'
import { en } from '../../utils/labels/en'

export default function ProgramLeaderBoardScreenUI({
  selectedTab,
  eventData,
  filters,
  ...props
}) {
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

  const searchListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.resultRow}
        onPress={() => props?.handleSearchedItemPress(item)}
        activeOpacity={0.7}>
        {/* Step Icon */}
        <View style={{ marginRight: wp(2) }}>
          <Icons name="Step" size={30} color={Colors.gray_01} />
        </View>

        {/* Name and Bib */}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.bibText}>Bib: {item.bibNumber}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* title and filter icon */}
        <View style={styles.headerIconTitle}>
          <Text style={{ fontSize: fontSize.m, fontWeight: 700 }}>
            {en.label_leaderboard}
          </Text>

          <TouchableOpacity
            onPress={() => props.handleChange('showModal', !props?.showModal)}>
            <View
              style={{
                position: 'absolute',
                height: hp(1.5),
                width: wp(3),
                backgroundColor: 'red',
                borderRadius: 10,
                right: -3,
                top: -5
              }}
            />
            <Icons name={'filter'} type={iconType.feather} size={20} />
          </TouchableOpacity>
        </View>

        {/* individual user card  and searchbar*/}
        <View style={{ marginBottom: hp(1.5) }}>
          <SearchBar
            name="search"
            {...props}
            // label="Search Participants"
            onChangeText={(name, value) => props?.handleChange(name, value)}
          />

          {/* search result  */}
          {/* {props?.searchResultData?.length > 0 && (
            <View style={{
              backgroundColor:"#dccbf8",
              maxHeight:hp(40) , 
              minHeight:hp(21),
              // position:"absolute",
              // top:hp
              }} >
              <View style={{ marginTop: hp(2), zIndex: 1 }}>
                <FlatList
                  data={props.searchResultData}
                  keyExtractor={(item, index) =>
                    item.runnerId?.toString() || index.toString()
                  }
                  ItemSeparatorComponent={()=><View style={{  height:hp(1)}} />}
                  contentContainerStyle={{paddingHorizontal:wp(1.5) }}
                  renderItem={searchListItem}
                />
              </View>
            </View>
          )} */}
        </View>

        <UserLeaderBoardCard
          runnerActivityDetail={props?.runnerActivityDetail}
        />

        {/* individual leaderboard */}
        {filters?.selectedParticipated?.value === 'individual' && (
          <View style={{ flex: 1 }}>
            <IndividualLeaderBoard
              {...props}
              eventData={props?.eventData}
              filters={filters}
              eventID={props?.eventID}
            />
          </View>
        )}

        {filters?.selectedParticipated?.value === 'team' && (
          <TeamTab
            eventData={props?.eventData}
            filters={filters}
            eventID={props?.eventID}
          />
        )}
        {filters?.selectedParticipated?.value === 'ageGroup' && (
          <AgeGroupTab
            eventData={props?.eventData}
            filters={filters}
            eventID={props?.eventID}
          />
        )}

        {filters?.selectedParticipated?.value === 'runnerGroup' && (
          <RunnerGroupTab
            eventData={props?.eventData}
            filters={filters}
            eventID={props?.eventID}
          />
        )}
      </View>

      {/* filter box */}
      <DialogBox
        visible={props?.showModal}
        onClose={() => props.handleChange('showModal', !props?.showModal)}>
        {/* participate type */}
        <View
          style={{
            paddingHorizontal: wp(3),
            width: wp(90),
            paddingTop: hp(3)
          }}>
          {/* participated menu */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
              alignItems: 'center',
              justifyContent: 'space-between',
              alignContent: 'center'
            }}>
            <Text>Participated</Text>
            <View style={styles.dropdownStyle}>
              <CustomDropdown
                name="selectedParticipated"
                label="Select"
                data={props?.formattedParticipatedLabel || []}
                value={props?.selectedParticipated}
                onChangeText={props.handleChange}
                valueExtractor={item => item}
                labelExtractor={item => item?.label}
              />
            </View>
          </View>

          {/* week dropdown */}
          {props?.selectedParticipated?.value === 'individual' && (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                alignItems: 'center',
                justifyContent: 'space-between',
                alignContent: 'center'
              }}>
              <Text>{en.label_week_filter}</Text>
              <View style={styles.dropdownStyle}>
                <CustomDropdown
                  name="selectedWeekRange"
                  label="Select Week"
                  data={
                    props?.weekDropdowns || [
                      {
                        label: 'OverAll',
                        value: 'OverAll',
                        toDate: null,
                        fromDate: null
                      }
                    ]
                  }
                  value={props?.selectedWeekRange}
                  onChangeText={(name, value, data) => {
                    props.handleChange(name, value)
                  }}
                  valueExtractor={item => item}
                  labelExtractor={item => item.label}
                />
              </View>
            </View>
          )}

          {/* activity type */}
          {props?.eventActivities?.activity?.length > 1 &&
            props?.selectedParticipated?.value === 'individual' && (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  alignContent: 'center'
                }}>
                <Text>Activity Types</Text>
                <View style={styles.dropdownStyle}>
                  <CustomDropdown
                    name="selectedActivity"
                    label="Select Activity Types"
                    data={props?.eventActivities?.activity}
                    value={props.selectedActivity}
                    onChangeText={(name, value, data) => {
                      props.handleChange(name, value)
                    }}
                    valueExtractor={item => item}
                    labelExtractor={item => item.type}
                  />
                </View>
              </View>
            )}

          {/* category type */}
          {props?.eventActivities?.category?.length > 1 &&
            props?.selectedParticipated?.value === 'individual' && (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  alignContent: 'center'
                }}>
                <Text>Category Types</Text>
                <View style={styles.dropdownStyle}>
                  <CustomDropdown
                    name="selectedCategory"
                    label="Select Category Types"
                    data={props?.eventActivities?.category}
                    value={props.selectedCategory}
                    onChangeText={(name, value, data) => {
                      props.handleChange(name, value)
                    }}
                    valueExtractor={item => item}
                    labelExtractor={item => item.label}
                  />
                </View>
              </View>
            )}

          {/* Top participant logic*/}
          {(props?.selectedParticipated?.value === 'team' ||
            props?.selectedParticipated?.value === 'individual') && (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                alignItems: 'center',
                justifyContent: 'space-between'
                // alignContent: 'center',
              }}>
              <Text>Top Participant</Text>
              <View style={styles.dropdownStyle}>
                <CustomDropdown
                  name="selectedLimit"
                  label="Select"
                  data={props?.limit}
                  value={props?.selectedLimit} // Pre-selected value
                  onChangeText={(name, value) => {
                    props.handleChange(name, value)
                  }}
                  valueExtractor={item => item}
                  labelExtractor={item => item.label}
                />
              </View>
            </View>
          )}
        </View>

        {/* action types */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            // backgroundColor:"red",
            paddingHorizontal: wp(2),
            // width: wp(50),
            gap: wp(5),
            paddingVertical: hp(1),
            paddingBottom: hp(2)
          }}>
          <CustomButton
            title={'Cancel'}
            name={'cancel'}
            onPress={() => props.handleChange('showModal', !props?.showModal)}
            btnStyles={{ backgroundColor: 'transparent', borderWidth: 0.9 }}
            minWidth={wp('30')}
            btnTitleStyles={{
              ...styles.textStyle,
              ...styles.btnTextStyle
            }}
          />
          <CustomButton
            title={'Apply'}
            name={'submit'}
            onPress={props?.handleSubmit}
            minWidth={wp('30')}
            // btnStyles={styles.btnStylesApply}
            btnTitleStyles={{
              ...styles.textStyle,
              ...styles.btnTextStyleApply
            }}
          />
        </View>
      </DialogBox>
    </>
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
    // paddingVertical: hp(''),
    height: hp('5'),
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
  },

  // dropwdown style

  dropdownStyle: {
    width: '62%',
    right: wp(2)
    // left:
  }
})
