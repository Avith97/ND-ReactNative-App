import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { services } from '../../../services/axios/services'
import AboutUSUI from './AboutUSUI'
import { useIsFocused } from '@react-navigation/native'
import { URL } from '../../../utils/constants/Urls'

const About_US = () => {
  let [htmlcontent, setHtmlConnect] = useState(null)

  let isFocused = useIsFocused()

  useEffect(() => {
    initiateScreen()
  }, [])

  async function initiateScreen() {
    let resp = await services._get(URL.about_us)

    if (resp?.data) {
      setHtmlConnect(resp.data?.htmlTemplate)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <AboutUSUI htmlcontent={htmlcontent} />
    </View>
  )
}

export default About_US
