import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Colors from '../../../utils/constants/Colors'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import Toast from 'react-native-toast-message'
import { hp, wp } from '../../functions/dimensions'

const CustomBottomSheet = ({ props, ...params }) => {
  console.log('bottomsheet props ---> ', params)

  const handleChange = params => {
    props.onSelect && props.onSelect(params)
    Toast.hide()
  }

  const renderOptions = ({ item, i }) => {
    return (
      <TouchableOpacity
        onPress={() => handleChange(item)}
        activeOpacity={0.8}
        style={{
          ...styles.btnStyle,
          backgroundColor: Colors.smoky_white,
          ...props.optionStyle
        }}>
        <Text
          style={{
            ...styles.itemText,
            color: 'red',
            ...props.optionTitleTextStyle
          }}>
          {typeof item === 'object' ? item.title : item}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {/* Your content here */}
      <View
        style={{
          backgroundColor: props.titleBackgroundColor
            ? props.titleBackgroundColor
            : Colors.btnColor
        }}>
        <>
          <Text style={{ ...styles.titleText, ...props.titleTextStyle }}>
            {props.title ? props.title : 'Select the option'}
          </Text>
          <FlatList
            keyExtractor={(_, i) => i}
            data={[...props.options, 'Cancel']}
            // data={['Accept','Cancel']}
            // data={[{title:'Accept'}, {title:'Cancel'}]}
            renderItem={renderOptions}
            ItemSeparatorComponent={() => (
              <View style={styles.ItemSeparator} />
            )}
          />
        </>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: hp('1'),
    overflow: 'hidden',
    borderTopStartRadius: 9,
    borderTopEndRadius: 9
  },
  btnStyle: {
    backgroundColor: Colors.smoky_white,
    paddingVertical: hp(1.8)
  },
  titleText: {
    paddingVertical: hp(2),
    paddingLeft: wp(3),
    fontFamily: Fonts.SemiBold,
    fontSize: fontSize.normal,
    color: 'white',
    fontWeight: 'bold'
    // textAlign: 'center'
  },
  itemText: {
    fontFamily: Fonts.black,
    fontSize: fontSize.normal,
    color: 'red',
    textAlign: 'center'
  },
  ItemSeparator: {
    backgroundColor: 'gray',
    height: hp(0.1),
    width: wp(100)
  }
})

export default CustomBottomSheet
