import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import CustomButton from '../../common/components/buttons/CustomButton'
import { hp, wp } from '../../common/functions/dimensions'
import { maskNumber } from '../../common/functions/masknumber'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import CustomDateTimePicker from '../../common/components/textInput/CustomDateTimePicker'
import Icons, { iconType } from '../../assets/icons/Icons'
import Colors from '../../utils/constants/Colors'
import { fontSize } from '../../utils/constants/Fonts'
import { Countries } from '../../data/static_data/countries'
import moment from 'moment'
import CustomDropdown from '../../common/components/dropdown/CustomDropdown'

export default function EditProfileScreenUI(props) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      {/* Form */}
      <View style={styles.formContainer}>
        {/* First name & last name */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomTextInput
              label="First name"
              name="firstName"
              mandatory
              inputStyle={styles.textInputStyle}
              inputProps={{
                value: props?.formState?.firstName
              }}
              onChangeText={props.handleChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomTextInput
              label="Last name"
              name="lastName"
              mandatory
              inputProps={{
                value: props?.formState?.lastName
              }}
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>
        </View>

        {/* email */}

        <View style={styles.row}>
          <View style={styles.fullWidth}>
            <CustomTextInput
              label="Email"
              name="email"
              disabled
              inputProps={{
                editable: false,
                value: props?.formState?.email
              }}
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>
        </View>

        {/* Age & Weight */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomTextInput
              label="Age"
              name="age"
              mandatory
              inputProps={{
                value: props?.formState?.age
              }}
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>

          <View style={styles.halfWidth}>
            <CustomTextInput
              label="Weight"
              name="weight"
              mandatory
              inputProps={{
                value: props?.formState?.weight
              }}
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>
        </View>

        {/* DOB & Country */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomDateTimePicker
              label="DOB"
              name="dob"
              mandatory
              value={moment(props?.formState?.dob, 'DD/MM/YYYY')}
              onChangeText={props.handleChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomDropdown
              name="country"
              title="Country"
              label="Select"
              mandatory
              value={props?.formState?.country}
              data={Countries}
              onChangeText={props.handleChange}
              valueExtractor={item => item}
              labelExtractor={item => item.label}
            />
          </View>
        </View>

        {/* Gender & Height */}

        <View style={styles.fullWidth}>
          <CustomDropdown
            name="gender"
            title="Gender"
            label="Select"
            mandatory
            value={props?.formState?.gender}
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

        <View style={styles.fullWidth}>
          <CustomTextInput
            label="Height"
            name="height"
            mandatory
            inputProps={{
              value: props?.formState?.height
            }}
            inputStyle={styles.textInputStyle}
            onChangeText={props.handleChange}
          />
        </View>

        <CustomButton
          title={'Save Changes'}
          btnStyles={styles.btnStyles}
          onPress={props?.handleSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    // alignItems: 'center',
    // paddingBottom: hp(10),
  },
  formContainer: {
    marginTop: hp(2)
  },
  row: {
    width: wp(89),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.6)
  },
  halfWidth: {
    width: wp(42)
  },
  fullWidth: {
    width: wp(89),
    marginVertical: hp(1)
  },
  textInputStyle: {},
  btnConsentStyles: {
    marginVertical: hp(1)
  },
  btnStyles: {
    marginTop: hp(1.5)
  },
  textStyle: {
    color: '#000',
    fontSize: fontSize.normal
  }
})
