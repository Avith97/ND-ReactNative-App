import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomWebView from '../webview/CustomWebView'
import { hp, wp } from '../../functions/dimensions'

// function to access this component
// show_web_view_toast(true , {url:'https://necessarydevil.com/faq'})  true || false

const WebViewToast = params => {
  const [key, setKey] = useState(0)
  useEffect(() => {
    setKey(key + 1)
  }, [params?.props?.url])

  useEffect(() => {
    console.log('props policy detail ===?', params?.props)
  }, [params])
  return (
    <View style={{ flex: 1, height: hp(100), width: wp(100) }}>
      <View key={key} style={{ flex: 1 }}>
        <CustomWebView URL={params?.props?.url} />
      </View>
    </View>
  )
}

export default WebViewToast
