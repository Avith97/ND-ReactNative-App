import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { hp, wp } from '../../functions/dimensions'

const Loader = props => {
  const options = global.navigation?.getCurrentOptions()
  const isLoading = useSelector(state => state.settings.isLoading)

  if (!props?.fromWebView) {
    if (typeof props?.isLoading === 'boolean') {
      if (!props?.isLoading) return null
    } else if (!isLoading) return null
  }

  return (
    <View
      style={{
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: `rgba(0,0,0,${props?.opacity || 0.8})`,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      }}>
      <ActivityIndicator size={hp(4)} color={'#9BBF05'} role="progressbar" />
    </View>
  )
}

export default Loader
