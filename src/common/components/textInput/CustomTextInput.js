import { StyleSheet, Text, TextInput, View } from 'react-native'
// import ViewPropTypes from 'deprecated-react-native-prop-types';
import React, { useState } from 'react'
import Colors from '../../../utils/constants/Colors'
import { hp, wp } from '../../functions/dimensions'


const CustomTextInput = (props) => {
  const [focused, setfocused] = useState(false)
  return (
    <>
      {props.label &&
        <Text style={{ ...style.label, ...props?.labelStyle }}>
          {props?.label}
          {props?.mandatory && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      }
      <TextInput
        onFocus={() => setfocused(true)}
        onBlur={() => setfocused(false)}
        onChangeText={text => props?.onChangeText(props.name, text)}
        placeholderTextColor={Colors.gray}
        style={{
          ...style.textInputStyle,
          borderWidth: focused ? 2 : 0.7,
          borderColor: focused ? Colors.color3 : 'grey',
          ...props?.inputStyle
        }}
        {...props?.inputProps}
      />
    </>
  )
}

export default CustomTextInput

const style = StyleSheet.create({
  label: {},
  textInputStyle: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderWidth: 0.7,
    // elevation: 9,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white'
  }
})
