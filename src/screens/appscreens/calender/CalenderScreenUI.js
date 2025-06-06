import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { hp, wp } from '../../../common/functions/dimensions'
import { fontSize } from '../../../utils/constants/Fonts'
import CalendarComponent from '../../../common/components/datepicker/CalenderComponent'
import CustomButton from '../../../common/components/buttons/CustomButton'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Strings from '../../../utils/constants/Strings'
import TabSelector from '../../../common/components/tabselector/TabSelector'

export default function CalenderScreenUI({ challengeData, ...props }) {
  const handleNavigate = () => {
    props.navigation.navigate(Strings.NAVIGATION.submitresponse)
  }

  const viewDetail = () => {
    props.navigation.navigate(Strings.NAVIGATION.eventdetail, {
      IsRegistered: true
    })
  }
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: item.bgColor, borderColor: item.borderColor }
      ]}>
      <View style={{ flexDirection: 'row', gap: 10, paddingVertical: hp(1) }}>
        <Text style={styles.timeText}>{item.time}</Text>
        <View style={{ borderWidth: 1, borderColor: '#000' }}></View>

        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={viewDetail}>
        <Text style={{ textAlign: 'right', fontSize: fontSize.normal }}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  )

  const renderWeekItem = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: item.bgColor,
          borderColor: item.borderColor,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          paddingVertical: 0,
          paddingHorizontal: 0,
          paddingVertical: hp(0),
          marginVertical: hp(0.6)
        }
      ]}>
      <View style={styles.weekCardBox}>
        <Text style={{ ...styles.timeText, color: Colors.white }}>12 May</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={{ marginTop: hp(1) }}>
        <TabSelector
          tabs={props.tabs}
          onTabChange={props.handleChange}
          activeStyle={'underline'}
        />
      </View>
      <View style={{ marginVertical: hp(1.5) }}>
        <CalendarComponent
          mode={
            props.selectedTab === 'Day'
              ? 'day'
              : props.selectedTab === 'Week'
              ? 'weeks'
              : 'month'
          }>
          <View style={{ marginVertical: hp(2) }}>
            <FlatList
              data={challengeData}
              keyExtractor={item => item.id}
              // contentContainerStyle={{padding: hp(1)}}
              renderItem={
                props.selectedTab === 'Week' ? renderWeekItem : renderItem
              }
            />
          </View>
        </CalendarComponent>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  card: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginVertical: hp(0.6),
    borderRadius: 8,
    borderWidth: 2
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1)
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    marginRight: wp(2)
  },
  timeText: {
    color: '#000',
    fontWeight: '600'
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: hp(0.5)
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(55)
  },
  date: {
    fontSize: fontSize.normal,
    color: '#333'
  },

  //
  weekCardBox: {
    backgroundColor: '#000',
    width: wp(20),
    height: hp(10),
    // padding: hp(1),
    borderRadius: 8,
    // marginVertical: hp(0.6),
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
