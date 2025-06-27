// react native imports
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// constants utils & assets
import { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import { hp, wp } from '../../common/functions/dimensions'

// common components
import PieProgressBar from '../../common/components/progressbar/PieProgressBar'
import CustomButton from '../../common/components/buttons/CustomButton'
import BarChart from '../../common/components/Charts/BarChart'
import CustomWeekAndMonth from '../../common/components/customweekandmonth/CustomWeekAndMonth'
import { en } from '../../utils/labels/en'

export default function ProgramDashboardScreenUI(props) {
  const data = [
    { day: 'Mon', steps: 4000 },
    { day: 'Tue', steps: 7000 },
    { day: 'Wen', steps: 5000 },
    { day: 'Thu', steps: 10000 },
    { day: 'Fri', steps: 5000 },
    { day: 'Sat', steps: 7000 },
    { day: 'Sun', steps: 7050 }
  ]
  const DescriptionDetailItem = ({ value, unit }) => (
    <View style={styles.centered}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.unitLabel}>{unit}</Text>
    </View>
  )

  return (
    <View>
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
        <PieProgressBar program />
      </View>

      <View style={styles.detailSection}>
        {/* Description Metrics */}

        <DescriptionDetailItem value={1088} unit="Kcal" />
        <DescriptionDetailItem value={12} unit="KM" />
        <DescriptionDetailItem value={204} unit="Move Min" />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={en.label_show_leaderboard}
          name={'leaderboard'}
          onPress={props.handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5
          }}
          btnTitleStyles={{
            ...styles.textStyle
          }}
        />
      </View>

      {/* progress section with bar chart */}
      <View style={styles.barChartSection}>
        {/* tabbar */}

        {/* week and month View */}

        <CustomWeekAndMonth mode={props.selectedTab} />

        <BarChart
          data={data}
          yKeys={['steps']}
          barWidth={22}
          chartHeight={250}
          xKey="day"
          colorScale={[Colors.primary, Colors.secondary]}
          // xAxisLabel="Days"
          // yAxisLabel="Steps"
        />
      </View>
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
