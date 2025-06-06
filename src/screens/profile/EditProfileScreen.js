import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EditProfileScreenUI from './EditProfileScreenUI'

export default function EditProfileScreen(props) {
  const [state, setstate] = useState({})
  const [options, setoptions] = useState({})
  const [err, seterr] = useState(null)

  useEffect(() => {
    console.log('state render-->', state)
  }, [state])

  function handleChange(params, val) {
    console.log('params', params)
    console.log('val', val)
    setstate({
      ...state,
      [params]: val
    })
  }

  function validation(params) {
    let isValid = true
    let err = {}

    return isValid
  }

  function handleSubmit(params) {
    let valid = validation()
    if (!valid) {
      return
    }
    try {
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <EditProfileScreenUI />
    </View>
  )
}

const styles = StyleSheet.create({})
