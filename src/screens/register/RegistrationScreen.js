import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import RegistrationUI from './RegistrationUI'
import { appsnackbar } from '../../common/functions/snackbar_actions'

const RegistrationScreen = props => {
  const [state, setstate] = useState({})
  const [options, setoptions] = useState({})
  const [err, seterr] = useState(null)

  // useEffect(() => {
  //   console.log('state render-->', state)
  // }, [state])

  function handleChange(params, val) {
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
    <View style={{ flex: 1 }}>
      <RegistrationUI
        {...props}
        {...state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

export default RegistrationScreen
