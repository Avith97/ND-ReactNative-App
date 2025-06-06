import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { getMonthRange, getWeekRange } from '../../functions/dateUtils'
import { wp } from '../../functions/dimensions'

export default function CustomWeekAndMonth(props) {
  const [currentDate, setCurrentDate] = useState(moment())

  const handlePrev = () => {
    setCurrentDate(prev =>
      moment(prev).subtract(1, props.mode === 'Week' ? 'weeks' : 'months')
    )
  }

  const handleNext = () => {
    setCurrentDate(prev =>
      moment(prev).add(1, props.mode === 'Week' ? 'weeks' : 'months')
    )
  }

  const dateDisplay =
    props.mode === 'Week'
      ? getWeekRange(currentDate)
      : getMonthRange(currentDate)
  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{dateDisplay}</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.steps}>👟 21487 steps</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrow: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  steps: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.7
  }
})
