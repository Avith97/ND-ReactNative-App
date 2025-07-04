import { View, Text } from 'react-native'
import React from 'react'
import CustomImageBackground from '../../../common/components/background/CustomImageBackground'
import CustomWebView from '../../../common/components/webview/CustomWebView'

const AboutUSUI = props => {
  return (
    <CustomImageBackground opacity={1} style={{ flex: 1 }}>
      {props?.htmlcontent && (
        <CustomWebView
          html={props?.htmlcontent}
          webviewProps={{
            style: {
              backgroundColor: 'transparent'
            }
          }}
        />
      )}
    </CustomImageBackground>
  )
}

export default AboutUSUI
