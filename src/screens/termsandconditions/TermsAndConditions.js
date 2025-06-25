import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomWebView from '../../common/components/webview/CustomWebView'
import { BASE_URL } from '../../utils/constants/Urls'
import { interPolate } from '../../services/interpolate/interpolate'

export default function TermsAndConditions(props) {
  const [url, setURL] = useState(null)

  useEffect(() => {
    setURL(interPolate.base_url('terms'))
  }, [])

  return <View style={{ flex: 1 }}>{url && <CustomWebView URL={url} />}</View>
}

const styles = StyleSheet.create({})
