import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icons, { iconType } from '../../../assets/icons/Icons';
import Colors from '../../../utils/constants/Colors';

export default function CustomWeekAndMonth(props) {
  const currentWeek = props.currentWeek;

  const goPrevious = () => {
    if (props.weekIndex > 0) props?.setWeekIndex(props.weekIndex - 1);
  };

  const goNext = () => {
    if (props?.weekIndex < props?.eventGraphData?.daysData?.length - 1)
      props.setWeekIndex(props.weekIndex + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goPrevious}
          disabled={props?.weekIndex === 0}>
          <Icons
            type={iconType?.material}
            name="arrow-left"
            size={30}
            color={props?.weekIndex === 0 ? Colors.gray_06 : Colors.white}
          />
        </TouchableOpacity>
        <View style={styles.centerHeader}>
          <Text style={styles.weekRange}>{currentWeek?.weekRange}</Text>
          <View style={styles.stepsRow}>
            <Icons name="Step" size={20} color={Colors.white} />

            {/* <MaterialIcons name="directions-walk" size={16} color="#fff" /> */}
            <Text style={styles.stepCount}>
              {currentWeek?.totalSteps || 0} steps
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={goNext}
          disabled={
            props?.weekIndex === props?.eventGraphData?.daysData?.length - 1
          }>
          <Icons
            type={iconType?.material}
            name="arrow-right"
            size={30}
            color={
              props?.weekIndex === props?.eventGraphData?.daysData?.length - 1   
                ? Colors?.gray_06
                : Colors.white
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  centerHeader: {
    alignItems: 'center',
  },
  weekRange: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stepCount: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
  chart: {
    marginTop: 16,
    justifyContent: 'space-around',
    width: '100%',
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bar: {
    width: 20,
    backgroundColor: '#a4d233',
    borderRadius: 4,
    marginBottom: 4,
  },
  dayLabel: {
    color: '#fff',
    fontSize: 12,
  },
});
