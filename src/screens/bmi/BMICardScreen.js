import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BMICardScreenUI from './BMICardScreenUI'
import { useSelector } from 'react-redux'
import Loader from '../../common/components/loader/Loader'
import { useIsFocused } from '@react-navigation/native'

export default function BMICardScreen() {
  const [state, setState] = useState({
    BMISummery: null,
    loader: false
  })

  let auth = useSelector(store => store?.user)
  let isFocused = useIsFocused()

  console.log(auth, 'ha')

  useEffect(() => {
    InitiateScreen()
  }, [isFocused])

  async function InitiateScreen(params) {
    let { weight, height, bmi, age, gender } = auth
    let resp = await calculateBMISummary(weight, height, age, gender, bmi)

    setState({ ...state, loader: true })
    if (resp) {
      setState({ ...state, BMISummery: resp, loader: false })
    }
  }

  async function calculateBMISummary(weight, height, age, gender) {
    const heightInMeters = height / 100

    // Step 1: Calculate BMI
    const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2)

    // Step 2: Determine BMI Category
    let category = ''
    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 25) category = 'Normal'
    else if (bmi < 30) category = 'Overweight'
    else category = 'Obese'

    // Step 3: Calculate Normal Weight Range
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

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Loader />
      <BMICardScreenUI BMISummery={state?.BMISummery} />
    </View>
  )
}

const styles = StyleSheet.create({})
