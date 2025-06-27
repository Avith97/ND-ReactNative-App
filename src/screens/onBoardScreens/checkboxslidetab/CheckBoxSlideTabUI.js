import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Colors from '../../../utils/constants/Colors'
import { useSelector } from 'react-redux'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { hp } from '../../../common/functions/dimensions'

export default function CheckBoxSlideTabUI(props) {
  // state and redux state
  const onboard = useSelector(state => state.onboard)
  const [selectedCheckBoxAnswer, setSelectedCheckBoxAnswer] = useState()
  const [render, setIsRender] = useState(false)

  // set option to question
  function onClick(item) {
    props.handleChange('check-box', {
      option_id: item.id,
      onboardingQuestionId: props.id
      // response: item?.text
    })
    setIsRender(true)
  }

  // getting exact question to show reflect option clicked
  useEffect(() => {
    if (onboard.hasOwnProperty('check-box')) {
      let questionResponse = onboard['check-box']
      questionResponse = questionResponse?.find(
        item => item.onboardingQuestionId === props?.id
      )
      setSelectedCheckBoxAnswer(questionResponse)
      setIsRender(false)
    }
  }, [onboard, render])

  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {props?.question && (
          <Text style={styles.heading}>{props?.question}</Text>
        )}
        {props?.subText && <Text style={styles.subText}>{props?.subText}</Text>}
        <View style={{ paddingTop: hp(1) }}>
          {props?.options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => onClick(item)}>
              <CheckBox
                checkedColor={Colors.primary}
                uncheckedColor={Colors.primary}
                // checked={onboard?.['check-box']?.id === item.id}
                // checked={onboard?.['check-box']?.data?.some(
                //   opt => opt.id === item.id
                // )}

                checked={selectedCheckBoxAnswer?.selectedOptions?.some(
                  opt => opt.option_id === item.id
                )}
                // checked={props?.selectedMotivation.includes(item)}
                onPress={() => onClick(item)}
              />
              {item?.text && (
                <Text style={styles.optionText}>{item?.text}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
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
  heading: { fontSize: fontSize.m, fontFamily: Fonts.Bold, marginBottom: 20 },
  subText: { fontSize: fontSize.normal, fontFamily: Fonts.Regular },
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
  optionText: { fontSize: fontSize.normal, fontFamily: Fonts.SemiBold },
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  continueText: { fontWeight: 'bold' }
})
