import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../../../utils/constants/Colors'
import { wp } from '../../functions/dimensions'


const CustomTextInput = props => {
  return (
    <TextInput
      style={{ ...customInputStyle.textInputStyle, ...props?.inputStyle }}
      onChangeText={text => props?.onChangeText(props.name, text)}
      placeholderTextColor={Colors.gray}
      {...props?.inputProps}
    />
  )
}

export default CustomTextInput

const customInputStyle = StyleSheet.create({
  textInputStyle: {
    paddingHorizontal: wp(3),
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white'
  }
})
