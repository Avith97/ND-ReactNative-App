// react core components + React Native components
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { hp, wp } from '../../../common/functions/dimensions'
import Icons from '../../../assets/icons/Icons'

// Centralized labels object
import { en as labels } from '../../../utils/labels/en'
import { useSelector } from 'react-redux'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

export default function ListSlideTabUI(props) {
  const onboard = useSelector(state => state.onboard)

  const [selectedListAnswer, setSelectedListAnswer] = useState(null)
  function onClick(option) {
    // setkey(nkey)
    props.handleChange?.(`list`, {
      option_id: option.id,
      onboardingQuestionId: props.id
      // response: option?.text
    })
  }

  // useEffect(() => {
  //   console.log('list update --->', props.list)
  // }, [props.list])

  useEffect(() => {
    if (onboard.hasOwnProperty('list')) {
      let x = onboard['list']
      x = x.find(item => item.onboardingQuestionId === props?.id)
      setSelectedListAnswer(x)
    }
  }, [onboard])

  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {/* === Activity Level Section === */}
        {props.question && (
          <Text style={styles.heading}>{props?.question}</Text>
        )}
        {props?.subText && <Text style={styles.subText}>{props?.subText}</Text>}

        <View style={{ paddingTop: hp(2) }}>
          {props?.options &&
            props?.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onClick(option)}
                style={[
                  styles.activityBox,
                  // props?.list?.option_id === option.id && styles.activitySelected,
                  // onboard?.list?.option_id === option.id &&
                  //   styles.activitySelected
                  selectedListAnswer?.option_id === option.id &&
                    styles.activitySelected
                  // props.selectedActivity?.title === option.title &&
                  //   styles.activitySelected,
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: wp(100),
                    gap: 10
                  }}>
                  {console.log(option.icon.trim())}

                  {/* left icon */}
                  {option?.icon && option?.iconPosition === 'left' && (
                    <View style={{ width: wp(10) }}>
                      <Icons
                        name={option.icon?.trim()}
                        size={30}
                        color="#000"
                      />
                    </View>
                  )}

                  <View style={{ width: wp(55) }}>
                    {option?.text && (
                      <Text numberOfLines={2} style={styles.activityTitle}>
                        {option?.text}
                      </Text>
                    )}
                    {option?.subText && (
                      <Text numberOfLines={2} style={styles.activityDesc}>
                        {option?.subText}
                      </Text>
                    )}
                  </View>

                  {/* right icon */}
                  {option?.icon && option?.iconPosition === 'right' && (
                    <View style={{ width: wp(10), marginLeft: wp(10) }}>
                      <Icons name={option.icon} size={30} color="#000" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ContentContainer: {
    flex: 1,
    paddingVertical: hp(3)
  },
  heading: { fontSize: fontSize.m, fontFamily: Fonts.Bold },
  subText: { fontSize: fontSize.normal, fontFamily: Fonts.Regular },
  activityBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: 10
  },
  activitySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea'
  },
  activityTitle: { fontSize: fontSize.normal, fontFamily: Fonts.SemiBold },
  activityDesc: { fontSize: fontSize.s, fontFamily: Fonts.Regular }
})
