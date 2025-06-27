import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { en as LABELS } from '../../../utils/labels/en'
import CustomTextInput from '../../../common/components/textInput/CustomTextInput'
import CustomDropdown from '../../../common/components/dropdown/CustomDropdown'
import CustomDateTimePicker from '../../../common/components/textInput/CustomDateTimePicker'
import { Countries } from '../../../data/static_data/countries'
import { hp, wp } from '../../../common/functions/dimensions'
import CustomButton from '../../../common/components/buttons/CustomButton'
import Colors from '../../../utils/constants/Colors'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

export default function CompleteProfileUI(props) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles?.title}>{LABELS.complete_profile}</Text>
      <Text style={styles?.subTitle}>{LABELS.complete_profile_subtext}</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(8) }}
        showsVerticalScrollIndicator={true}>
        <View style={{ marginVertical: hp(1) }}>
          <CustomTextInput
            name={'email'}
            label={LABELS.email}
            disable
            inputStyle={{ ...styles.textInputStyle }}
            onChangeText={props?.handleChange}
            inputProps={{
              editable: false,
              value: props.email,
              placeholder: LABELS.emailPlaceholder
            }}
          />
        </View>

        <View style={{ marginVertical: hp(1.5) }}>
          <CustomTextInput
            name={'contactNumber'}
            label={LABELS.mobileNumber}
            mandatory
            inputStyle={{ ...styles.textInputStyle }}
            onChangeText={props?.handleChange}
            inputProps={{
              // editable: false,
              value: props.contactNumber,
              placeholder: LABELS.mobilePlaceholder,
              keyboardType: 'numeric'
            }}
          />
        </View>

        <View style={styles.fullWidth}>
          <CustomDropdown
            name="gender"
            title={LABELS.gender}
            label={LABELS.select}
            mandatory
            value={props?.gender}
            data={[
              { label: 'MALE', value: 'MALE' },
              { label: 'FEMALE', value: 'FEMALE' },
              { label: 'OTHER', value: 'OTHER' }
            ]}
            onChangeText={props.handleChange}
            valueExtractor={item => item}
            labelExtractor={item => item.label}
          />
        </View>

        <View style={{ marginVertical: hp(1.5) }}>
          <CustomDateTimePicker
            label={LABELS.dob}
            name="dob"
            mandatory={true}
            value={props.dob}
            onChangeText={(name, value) => props.handleChange(name, value)}
          />
        </View>

        <View style={{ marginVertical: hp(1) }}>
          <CustomDropdown
            name="country"
            title={LABELS.country}
            label={LABELS.select}
            mandatory
            value={props?.country}
            data={Countries}
            onChangeText={props.handleChange}
            valueExtractor={item => item}
            labelExtractor={item => item.label}
          />
        </View>

        {/* height */}
        <View style={{ marginVertical: hp(1) }}>
          <CustomTextInput
            name={'height'}
            label={LABELS.height}
            mandatory
            inputStyle={{ ...styles.textInputStyle }}
            onChangeText={props?.handleChange}
            inputProps={{
              keyboardType: 'numeric',
              inputMode: 'numeric',
              editable: true,
              value: props.height,
              placeholder: LABELS.heightPlaceholder
            }}
          />
        </View>

        {/* weight */}
        <View style={{ marginVertical: hp(1) }}>
          <CustomTextInput
            name={'weight'}
            label={LABELS.weight}
            mandatory
            inputStyle={{ ...styles.textInputStyle }}
            onChangeText={props?.handleChange}
            inputProps={{
              keyboardType: 'numeric',
              inputMode: 'numeric',
              editable: true,
              value: props.weight,
              placeholder: LABELS.weightPlaceholder
            }}
          />
        </View>
      </ScrollView>

      <CustomButton
        title={'Submit'}
        name={'Submit'}
        onPress={() => props?.handleSubmit()}
        // isLoading={store.getState().settings.isLoading}
        btnStyles={{
          ...styles.btnStyles,
          elevation: 1,
          backgroundColor: Colors.primary,
          borderWidth: 1,
          borderColor: Colors.primary,
          borderRadius: 8
        }}
        btnTitleStyles={{
          ...styles.textStyle,
          marginLeft: wp(5)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.m,
    marginBottom: hp(0.5),
    fontFamily: Fonts.SemiBold
  },

  subTitle: {
    fontSize: fontSize.normal,
    marginBottom: hp(0.5),
    fontFamily: Fonts.Medium
  }
})
