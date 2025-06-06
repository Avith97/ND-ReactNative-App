import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Colors from '../../../utils/constants/Colors'
import { useSelector } from 'react-redux'

export default function CheckBoxSlideTabUI(props) {
  const onboard = useSelector(state => state.onboard)

  function onClick(item) {
    props.handleChange('check-box', item)
  }

  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {props?.question && (
          <Text style={styles.heading}>{props?.question}</Text>
        )}
        {props?.sub_text && (
          <Text style={styles.subText}>{props?.sub_text}</Text>
        )}

        {props?.options?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => onClick(item)}>
            <CheckBox
              checkedColor={Colors.primary}
              uncheckedColor={Colors.primary}
              checked={onboard?.['check-box']?.id === item.id}
              // checked={props?.selectedMotivation.includes(item)}
              onPress={() => onClick(item)}
            />
            {item?.text && <Text style={styles.optionText}>{item?.text}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  ContentContainer: {
    flex: 1,
    paddingTop: 20
    // padding:4
  },
  // scrollContent: { padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center'
    // marginBottom: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12
  },
  checkedBox: {
    backgroundColor: '#BFFF00',
    borderColor: '#BFFF00'
  },
  optionText: { fontSize: 16 },
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  continueText: { fontWeight: 'bold' }
})
