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

export default function ProgramLeaderBoardScreenUI({
  selectedTab,
  eventData,
  filters,
  ...props
}) {
  return (
    <>
      <View style={{ flex: 1 }}>
        {/* title and filter icon */}
        <View style={styles.headerIconTitle}>
          <Text style={{ fontSize: fontSize.m, fontFamily: Fonts.SemiBold }}>
            Leaderboard
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
        </View>

        {/* user card */}
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

        {/* age group */}
        {filters?.selectedParticipated?.value === 'ageGroup' && (
          <AgeGroupTab
            eventData={props?.eventData}
            filters={filters}
            eventID={props?.eventID}
          />
        )}

        {/* runner group */}
        {filters?.selectedParticipated?.value === 'runnerGroup' && (
          <RunnerGroupTab
            eventData={props?.eventData}
            filters={filters}
            eventID={props?.eventID}
          />
        )}
      </View>

      {/* filter box modal */}

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
            <Text style={styles.filterlable}>Participated</Text>
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
              <Text style={styles.filterlable}>Week Filter</Text>

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
                <Text style={styles.filterlable}>Activity Types</Text>
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
                <Text style={styles.filterlable}>Category Types</Text>
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
              <Text style={styles.filterlable}>Top Participant</Text>
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
    marginVertical: hp(1.2)
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
    // fontWeight: '600',
    fontFamily: Fonts.SemiBold,
    color: '#333'
  },
  score: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginRight: 8,
    color: '#333'
  },
  textStyle: {
    fontFamily: Fonts.Medium,
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
  },
  filterlable: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular
  }
})
