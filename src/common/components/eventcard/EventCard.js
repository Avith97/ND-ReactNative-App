import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { hp } from '../../functions/dimensions'
import Icons, { iconType } from '../../../assets/icons/Icons'
import Colors from '../../../utils/constants/Colors'
import { formatDistanceInKm, formatToHHMMSS } from '../../functions/helper'

const FootPrintItem = ({
  iconName = 'Step',
  steps = '1087',
  label = "Today's Steps",
  day = 0
}) => (
  <View style={styles.centered}>
    <Icons
      // type={iconType.material}
      name={iconName}
      size={20}
      color={Colors.primary}
    />
    <Text
      style={{
        ...styles.stepValue,
        fontSize: day === 1 ? fontSize.l : fontSize.md,
        fontFamily: day === 1 ? Fonts.SemiBold : Fonts.Medium
      }}>
      {steps}
    </Text>
    <Text
      style={{
        ...styles.title,
        fontSize: day === 1 ? fontSize.normal : fontSize.s,
        fontFamily: day === 1 ? Fonts.SemiBold : Fonts.Medium
      }}>
      {label}
    </Text>
  </View>
)

const DescriptionDetailItem = ({ value, unit }) => (
  <View style={styles.centered}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.unitLabel}>{unit}</Text>
  </View>
)

const EventCard = ({ title, ...props }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {/* Footprint Section */}
      <View style={styles.mainSection}>
        <FootPrintItem steps={props?.totalSteps} day={1} />
        <View style={styles.middleSection}>
          <View style={styles.dashedLine} />
          <View style={styles.row}>
            {props?.yesterdaysTotalStep >= 0 && (
              <FootPrintItem
                steps={props?.yesterdaysTotalStep}
                label={'Yesterday’s Steps '}
              />
            )}
            {props?.weeklyTotalSteps >= 0 && (
              <FootPrintItem
                steps={props?.weeklyTotalSteps}
                label={'Weekly Steps'}
              />
            )}
          </View>
        </View>
      </View>

      {/* Description Metrics */}
      <View style={styles.detailSection}>
        {props?.totalCalories >= 0 && (
          <DescriptionDetailItem
            value={props?.totalCalories?.toFixed(2)}
            unit="Kcal"
          />
        )}
        {props?.totalDistance >= 0 && (
          <DescriptionDetailItem
            value={formatDistanceInKm(props?.totalDistance)}
            unit="KM"
          />
        )}
        {props?.totalCompletionTime >= 0 && (
          <DescriptionDetailItem
            value={formatToHHMMSS(props?.totalCompletionTime)}
            unit="Duration"
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: hp(1.8)
  },
  title: {
    fontSize: fontSize.m,
    // fontWeight: 'bold'
    fontFamily: Fonts.SemiBold
    // marginBottom: hp(0.5),
  },
  centered: {
    alignItems: 'center'
  },
  stepValue: {
    fontSize: fontSize.m
    // fontWeight: 'bold',
    // marginVertical: 4
  },
  mainSection: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#E1FB98',
    borderWidth: 1,
    borderColor: '#B2DB03',
    borderRadius: 20,
    padding: 6,
    paddingVertical: hp(3)
  },
  middleSection: {
    flex: 1,
    paddingVertical: hp(0.6),
    paddingHorizontal: 10
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    opacity: 0.4,
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#E1FB98',
    borderWidth: 1,
    borderColor: '#B2DB03',
    borderRadius: 20,
    paddingVertical: hp(2.5),
    marginTop: hp(1)
  },
  metricValue: {
    fontSize: fontSize.m,
    // fontWeight: 'bold'
    fontFamily: Fonts.SemiBold
  },
  unitLabel: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.Medium
  }
})

export default EventCard
