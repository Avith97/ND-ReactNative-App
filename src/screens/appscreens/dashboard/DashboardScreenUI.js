import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import StepsGraph from '../../../common/components/Charts/StepsGraph'
import CustomButton from '../../../common/components/buttons/CustomButton'
import { hp, wp } from '../../../common/functions/dimensions'
import { useNavigation } from '@react-navigation/native'
import Strings from '../../../utils/constants/Strings'
import CalendarComponent from '../../../common/components/datepicker/CalenderComponent'
import PieProgressBar from '../../../common/components/progressbar/PieProgressBar'
import CustomWeekAndMonth from '../../../common/components/customweekandmonth/CustomWeekAndMonth'
import BarChart from '../../../common/components/Charts/BarChart'
import Colors from '../../../utils/constants/Colors'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

export default function DashboardScreenUI(props) {
  const [weekIndex, setWeekIndex] = useState(0)

  // const data = [
  //   {day: 'Mon', steps: 4000},
  //   {day: 'Tue', steps: 7000},
  //   {day: 'Wen', steps: 5000},
  //   {day: 'Thu', steps: 10000},
  //   {day: 'Fri', steps: 5000},
  //   {day: 'Sat', steps: 7000},
  //   {day: 'Sun', steps: 7050},
  // ];
  const DescriptionDetailItem = ({ value, unit }) => (
    <View style={styles.centered}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.unitLabel}>{unit}</Text>
    </View>
  )

  return (
    <View>
      <Text
        style={{
          paddingBottom: hp(2),
          color: Colors?.gray_02,
          fontFamily: Fonts?.Bold
        }}>
        Dashboard
      </Text>

      {props?.eventGraphData?.progressBar ? (
        <>
          <View style={styles.progressContainer}>
            <Text
              style={{
                color: Colors.white,
                paddingBottom: hp(1),
                fontSize: fontSize.m,
                fontWeight: 700
              }}>
              Personal Progress
            </Text>

            <PieProgressBar
              program
              percentage={props?.eventGraphData?.progressBar}
            />
          </View>

          {/* Description Metrics */}
          <View style={styles.detailSection}>
            <DescriptionDetailItem value={1088} unit="Kcal" />
            <DescriptionDetailItem value={12} unit="KM" />
            <DescriptionDetailItem value={204} unit="Move Min" />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title={'Show Leaderboard'}
              name={'leaderboard'}
              onPress={() =>
                props.handleNavigate(
                  props.eventGraphData?.graphDTO?.[0]?.eventId
                )
              }
              btnStyles={{
                ...styles.btnStyles,
                elevation: 5
              }}
              btnTitleStyles={{
                ...styles.textStyle
              }}
            />
          </View>
        </>
      ) : (
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: hp(2),
            color: Colors?.gray_05
          }}>
          No data found
        </Text>
      )}

      {/* progress section with bar chart */}

      {props?.dashboardData?.daysData && (
        <View style={styles.barChartSection}>
          {/* tabbar */}

          {/* week and month View */}
          <CustomWeekAndMonth
            {...props}
            weekIndex={weekIndex}
            setWeekIndex={setWeekIndex}
            currentWeek={props.eventGraphData?.daysData[weekIndex]}
          />

          <BarChart
            data={props.eventGraphData?.daysData[weekIndex]?.days || []}
            yKeys={['steps']}
            barWidth={22}
            chartHeight={250}
            xKey="day"
            colorScale={[Colors.primary, Colors.secondary]}
            // xAxisLabel="Days"
            // yAxisLabel="Steps"
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  DaysResponseContainer: {},
  progressContainer: {
    backgroundColor: Colors.gray_01,
    alignItems: 'center',
    paddingVertical: hp(4),
    borderRadius: 10,
    marginVertical: hp(1)
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
    justifyContent: 'center'
  },

  buttonContainer: {
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStyles: {
    width: wp(90),
    marginVertical: hp(1)
  },
  plusbtnStyle: {
    width: wp(10)
  },

  detailSection: {
    backgroundColor: Colors.gray_01,

    paddingVertical: hp(4),
    borderRadius: 10,
    // marginVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  metricValue: {
    fontSize: fontSize.m,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center'
  },
  unitLabel: {
    fontSize: fontSize.normal,
    color: Colors.white,
    textAlign: 'center'
  }
})
