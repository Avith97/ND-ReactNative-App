import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LanguageSettingScreenUI from './LanguageSettingScreenUI'
import Colors from '../../../utils/constants/Colors'

export default function LanguageSettingScreen(props) {
  const [state, setState] = useState({ selectedLanguage: 'en' })

  const [options] = useState({
    languages: [
      { id: 'en', label: 'English' },
      { id: 'it', label: 'Italiano' },
      { id: 'de', label: 'Deutsch' },
      { id: 'nl', label: 'Nederland' }
    ]
  })

  const handleChange = lang => {
    setState(prev => ({ ...prev, selectedLanguage: lang }))
  }
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.white }}>
      <LanguageSettingScreenUI
        {...state}
        {...options}
        handleChange={handleChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
