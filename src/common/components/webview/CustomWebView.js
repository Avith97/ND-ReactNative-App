import { View, StyleSheet, SafeAreaView, Keyboard } from 'react-native'
import WebView from 'react-native-webview'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
// import NetInfo from "@react-native-community/netinfo";
import { hp, wp } from '../../functions/dimensions'
import Colors from '../../../utils/constants/Colors'
let ref

const CustomWebView = props => {
  let webSrc = {
    uri: 'https://reactnative.dev/'
  }
  const [keyboardSpace, setkeyboardSpace] = useState(0)
  useEffect(() => {
    // console.log('new url ===>', props.URL)
    if (props.html) {
    }
  }, [])

  function renderError(e) {
    console.log('error new ===>', e)
    return props.login ? (
      <>
        <View
          style={{
            ...styles.modalBackground,
            opacity: props.login ? 0.8 : 0.6
          }}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              style={{ ...styles.indicator, paddingBottom: hp('20%') }}
              size="large"
              // color={MyColors.loadingColor}
              color={colors.COLOR.loadingColor}
              animating={true}
            />
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'white'
          }}
        />
      </>
    ) : null
  }

  const loading = error => {
    return (
      <View
        style={{ ...styles.modalBackground, opacity: props.login ? 0.8 : 0.7 }}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            style={{ ...styles.indicator, paddingBottom: hp('20%') }}
            size="large"
            // color={MyColors.loadingColor}
            color={Colors.loading}
            animating={true}
          />
        </View>
      </View>
    )
  }

  function handleWebViewNavigationStateChange(params) {
    const { url } = params
    console.log('web params -->', params)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={r => {
          global.webref = ref = r
        }}
        // incognito
        // overScrollMode=''
        onNavigationStateChange={handleWebViewNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => loading()}
        // scalesPageToFit
        // renderLoading={() => <Loader isFullScreen={false} loading={true} />}
        renderError={e => renderError(e)}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        source={
          props.URL
            ? {
                uri: props.URL
              }
            : {
                html: props.html
              }
        }
        domStorageEnabled
        cacheEnabled
        automaticallyAdjustContentInsets
        {...props.webviewProps}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  webviewContainer: {},
  indicator: {},
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    opacity: 0.6,
    zIndex: 100,
    position: 'absolute'
  },
  activityIndicatorWrapper: {
    width: wp('100%'),
    height: hp('100%')
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  }
})

export default CustomWebView
