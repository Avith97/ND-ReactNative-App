import { StyleSheet, Text, TextInput, View } from 'react-native'
// import ViewPropTypes from 'deprecated-react-native-prop-types';
import React, { useState } from 'react'
import Colors from '../../../utils/constants/Colors'
import { hp, wp } from '../../functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

const CustomTextInput = props => {
  const [focused, setfocused] = useState(false)
  return (
    <>
      {props.label && (
        <Text style={{ ...style.label, ...props?.labelStyle }}>
          {props?.label}
          {props?.mandatory && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      )}
      <TextInput
        editable={props?.inputProps?.editable ?? true}
        onFocus={() => setfocused(true)}
        onBlur={() => setfocused(false)}
        onChangeText={text => props?.onChangeText(props.name, text)}
        placeholderTextColor={Colors.gray}
        style={[
          style.textInputStyle,
          focused && {
            borderWidth: 2,
            borderColor: Colors.color3
          },
          { ...props?.inputStyle },
          {
            backgroundColor:
              props?.inputProps?.editable === false ? '#f0f0f0' : 'white'
          }
        ]}
        {...props?.inputProps}
      />
    </>
  )
}

export default CustomTextInput

const style = StyleSheet.create({
  label: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular
    // marginBottom: hp(0.5),
  },
  textInputStyle: {
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3),
    fontFamily: Fonts.Regular,
    borderWidth: 0.7,
    // elevation: 9,
    borderColor: 'grey',
    borderRadius: 6,
    backgroundColor: 'white'
  }
})
