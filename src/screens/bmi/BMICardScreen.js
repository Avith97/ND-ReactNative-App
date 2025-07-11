import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import BMICardScreenUI from './BMICardScreenUI'
import { useSelector } from 'react-redux'
import Loader from '../../common/components/loader/Loader'
import { useIsFocused } from '@react-navigation/native'

function calculateBMISummary(weight, height, age, gender) {
  const heightInMeters = height / 100
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2)
  let category = ''
  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) category = 'Normal'
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  const minNormalWeight = +(18.5 * heightInMeters * heightInMeters).toFixed(1)
  const maxNormalWeight = +(24.9 * heightInMeters * heightInMeters).toFixed(1)

  return {
    age,
    bmi,
    category,
    gender,
    height,
    weight,
    normalWeightRange: {
      min: minNormalWeight,
      max: maxNormalWeight
    }
  }
}

export default function BMICardScreen() {
  const [loading, setLoading] = useState(false)
  const auth = useSelector(store => store?.user)
  const isFocused = useIsFocused()

  const BMISummery = useMemo(() => {
    if (!auth?.weight || !auth?.height || !auth?.age || !auth?.gender)
      return null
    return calculateBMISummary(auth.weight, auth.height, auth.age, auth.gender)
  }, [auth.weight, auth.height, auth.age, auth.gender])

  useEffect(() => {
    setLoading(true)
    // Simulate async if needed, else remove setTimeout
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [isFocused, auth.weight, auth.height, auth.age, auth.gender])

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Loader isLoading={loading} />
      <BMICardScreenUI BMISummery={BMISummery} />
    </View>
  )
}

const styles = StyleSheet.create({})
