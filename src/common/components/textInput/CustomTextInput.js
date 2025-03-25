import { StyleSheet, Text, TextInput, View } from 'react-native'
// import ViewPropTypes from 'deprecated-react-native-prop-types';
import React from 'react'
import Colors from '../../../utils/constants/Colors'
import { hp, wp } from '../../functions/dimensions'


const CustomTextInput = (props) => {
  return (
    <>
      {props.label &&
        <Text style={{ ...style.label, ...props?.labelStyle }}>
          {props?.label}
          {props?.mandatory && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      }
      <TextInput
        onChangeText={text => props?.onChangeText(props.name, text)}
        placeholderTextColor={Colors.gray}
        style={{ ...style.textInputStyle, ...props?.inputStyle }}
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
