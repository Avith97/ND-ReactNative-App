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
import NoDataFound from '../../../common/components/nodatafound/NoDataFound'
import CircularProgress from '../../../common/components/Charts/CircularProgress'
import {
  formatDistanceInKm,
  formatToHHMMSS
} from '../../../common/functions/helper'

export default function DashboardScreenUI(props) {
  const [weekIndex, setWeekIndex] = useState(0)

  const DescriptionDetailItem = ({ value, unit }) => (
    <View style={styles.centered}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.unitLabel}>{unit}</Text>
    </View>
  )

  return (
    <View
      style={{
        padding: wp(5)
      }}>
      {props?.dashboardData?.progressBar >= 0 ? (
        <>
          <View style={styles.progressContainer}>
            <Text style={styles.title}>Personal Progress</Text>

            {/* <PieProgressBar
              program
              percentage={props?.dashboardData?.progressBar}
              evenData={props?.dashboardData}
            /> */}

            <CircularProgress
              // percentage={props?.dashboardData?.progressBar}
              percentage={
                props?.dashboardData?.totalTarget === 0
                  ? 100
                  : props?.dashboardData?.progressBar
              }
              currentSteps={props?.dashboardData?.todaysStep} // 0
              totalSteps={props?.dashboardData?.totalSteps}
              goalSteps={props?.dashboardData?.totalTarget || 0} //
              iconName="run"
              radius={wp(27)}
              // strokeWidth={10}
            />
          </View>

          {/* Description Metrics */}
          <View style={styles.detailSection}>
            <DescriptionDetailItem
              value={props?.dashboardData?.totalCalorie}
              unit="Kcal"
            />
            <DescriptionDetailItem
              value={formatDistanceInKm(props?.dashboardData?.totalDistance)}
              unit="Km"
            />
            <DescriptionDetailItem
              value={formatToHHMMSS(props?.dashboardData?.totalTime)}
              unit="Duration"
            />
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
            color: Colors?.gray_05,
            fontFamily: Fonts.Regular
          }}>
          No data found
        </Text>
      )}
      {props?.dashboardData?.graphDTO?.[0]?.runnerActivityDetails?.length ? (
        <View>
          {/* progress section with bar chart */}

          {props?.dashboardData?.graphDTO?.[0]?.runnerActivityDetails
            ?.length && (
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
      ) : (
        <NoDataFound />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  DaysResponseContainer: {},
  progressContainer: {
    backgroundColor: Colors.gray_01,
    alignItems: 'center',
    paddingVertical: hp(3),
    borderRadius: 10,
    marginVertical: hp(1)
  },
  title: {
    color: Colors.white,
    marginBottom: hp(2),
    fontSize: fontSize.m,
    fontFamily: Fonts.Bold
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
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.white,
    textAlign: 'center'
  },
  unitLabel: {
    fontSize: fontSize.s,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.Medium
  }
})
