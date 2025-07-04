import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../utils/constants/Urls'
import CustomWebView from '../../common/components/webview/CustomWebView'
import { interPolate } from '../../services/interpolate/interpolate'

export default function SupportScreen(props) {
  const [url, setURL] = useState(null)

  useEffect(() => {
    setURL(interPolate.base_url('customerSupport'))
  }, [])

  return <View style={{ flex: 1 }}>{url && <CustomWebView URL={url} />}</View>
}

const styles = StyleSheet.create({})
