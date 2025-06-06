import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { hp, wp } from '../../common/functions/dimensions'
import ListSlideTab from './listslidetab/ListSlideTab'
import CheckBoxSlideTab from './checkboxslidetab/CheckBoxSlideTab'
import ListMultiSelectScreenTab from './listmultiselectslidetab/ListMultiSelectScreenTab'
import CardScreenTab from './cardscreentab/CardScreenTab'
import ImagesSlideTab from './imagesslidetab/ImagesSlideTab'

const OnBoardForm = props => {
  const { data } = props
  useEffect(() => {
    // console.log('OnBoardForm data:', data?.questionType);
  }, [])

  return (
    <View>
      {data?.questionType === 'list' && (
        <ListSlideTab {...props} {...styles} {...data} />
      )}

      {data?.questionType === 'images' && (
        <ImagesSlideTab
          {...props}
          // handleChange={handleChange}
          {...styles}
          {...data}
        />
      )}

      {data?.questionType === 'list-multiselect' && (
        <ListMultiSelectScreenTab {...props} {...styles} {...data} />
      )}
      {data?.questionType === 'check-box' && (
        <CheckBoxSlideTab {...props} {...styles} {...data} />
      )}

      {data?.questionType === 'card' && <CardScreenTab {...props} {...data} />}
    </View>
  )
}

const styles = StyleSheet.create({
  childContainerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    width: wp(100),
    paddingVertical: hp(2),
    paddingHorizontal: wp(6)
  }
})

export default OnBoardForm
