import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { wp, hp } from '../../functions/dimensions'
import Dropdown from './DropDown'
import { fontSize } from '../../../utils/constants/Fonts'
import Colors from '../../../utils/constants/Colors'

const CustomDropdown = (props = cd_default_props) => {
  return (
    <View>
      <Text style={styles.title}>
        {props.title}
        {props?.mandatory && <Text style={{ color: 'red' }}> *</Text>}
      </Text>
      <Dropdown
        data={props.data}
        value={props.value}
        onChangeText={props.onChangeText}
        // onChangeText={(_,item) => props.onChangeText(props.name, item)}
        // labelTextStyle={{ fontSize: 5, paddingLeft: 9, color: 'black', fontSize: 22 }}
        fontSize={fontSize.normal}
        labelFontSize={fontSize.normal}
        containerStyle={styles.container}
        overlayStyle={styles.overlay}
        pickerStyle={styles.picker}
        inputContainerStyle={styles.inputContainer}
        style={styles.cd_style}
        valueExtractor={props.valueExtractor}
        labelExtractor={props.valueExtractor}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.normal,
    marginBottom: hp(0.5)
  },

  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    // backgroundColor: 'cyan',
    borderWidth: 0.7,
    borderColor: 'grey',
    borderRadius: 8
    // minHeight: hp(5)
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'red'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  picker: {
    width: wp(90)
    // marginTop: hp('5'),
  },
  cd_style: {
    paddingLeft: 5,
    paddingVertical: 0,
    // backgroundColor: 'lightblue',
    justifyContent: 'center'
  }
})

const cd_default_props = {
  name: 'dropdown',
  // ...dropdown_default_props
  disabled: false,
  label: '',
  error: '',
  animationDuration: 0,
  fontSize: 16,
  baseColor: 'rgba(0, 0, 0, .38)',
  textColor: 'rgba(0, 0, 0, .87)',
  itemColor: 'rgba(0, 0, 0, .54)',
  selectedItemColor: 'rgba(0, 0, 0, .87)',
  placeholderTextColor: 'rgba(0, 0, 0, .38)',
  itemCount: 4,
  itemPadding: 0,
  // dropdownOffset: { top: 100, left: 0 },
  // dropdownMargins: { min: 8, max: 16 },
  data: [],
  value: '',
  shadeOpacity: 0.4,
  valueExtractor: item => item.value,
  labelExtractor: item => item.label,
  propsExtractor: () => null,
  onChangeText: () => {},
  showTriangle: true,
  style: {}
}

export default CustomDropdown
