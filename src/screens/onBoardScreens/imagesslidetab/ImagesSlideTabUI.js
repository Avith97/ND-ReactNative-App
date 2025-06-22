// React core +  react native components
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

// Utils function Dimensions
import { hp, wp } from '../../../common/functions/dimensions'

// Define all static labels in a constants object
import { en as LABELS } from '../../../utils/labels/en'
import { useSelector } from 'react-redux'
import { Images } from '../../../utils/constants/Images'

export default function BellyConditionScreenUI(props) {
  // state and global data
  const onboard = useSelector(state => state.onboard)
  const [selectedBelly, setSelectedBelly] = useState()

  // onclick options
  function onClick(item) {
    // console.log(item)
    props.handleChange('image', {
      option_id: item.id,
      onboardingQuestionId: props.id
      // response: item?.text
    })
  }

  // find exact question
  useEffect(() => {
    if (onboard.hasOwnProperty('image')) {
      let questionResponse = onboard['image']
      questionResponse = questionResponse?.find(
        item => item.onboardingQuestionId === props?.id
      )
      setSelectedBelly(questionResponse)
    }
  }, [onboard])

  // console.log(props?.options)

  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {/* === Belly Condition Section === */}
        <Text style={[styles.heading]}>{props?.question}</Text>
        <Text style={styles.subText}>{props?.sub_text}</Text>

        <View style={styles.bellyGrid}>
          {props?.options &&
            props?.options?.map((belly, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onClick(belly)}
                style={[
                  styles.bellyBox,
                  // props.selectedBelly?.title === belly.title &&styles.bellySelected,
                  // onboard?.image?.id === belly.id && styles.bellySelected
                  selectedBelly?.option_id === belly.id && styles.bellySelected
                ]}>
                {belly?.imagePath && (
                  <Image
                    source={Images[`belly${index + 1}`]}
                    style={{ width: wp(23), height: hp(22), borderRadius: 10 }}
                  />
                )}
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
    paddingTop: 20
  },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  subText: { fontSize: 14, color: '#666', marginBottom: 15 },
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  bellyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-center',
    // alignItems:"center",
    gap: wp(5)
  },
  bellyBox: {
    width: wp(24), // each image box is 25% width
    // aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    paddingVertical: hp(0),
    paddingBottom: -hp(2)
    // backgroundColor: 'red',
    // marginBottom: wp(4)
  },
  bellySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea'
  }
})
