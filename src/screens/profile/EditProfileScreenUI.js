import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import CustomButton from '../../common/components/buttons/CustomButton';
import {hp, wp} from '../../common/functions/dimensions';
import {maskNumber} from '../../common/functions/masknumber';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import CustomDateTimePicker from '../../common/components/datepicker/CustomDateTimePicker';
import CustomDropdown from '../../common/components/dropdown/CustomDropdown';
import Icons, {iconType} from '../../assets/icons/Icons';
import Colors from '../../utils/constants/Colors';
import {fontSize} from '../../utils/constants/Fonts';
import { Countries } from '../../data/static_data/countries';

export default function EditProfileScreenUI(props) {


  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'center' }}>
        <Avatar
          rounded
          size={'xlarge'}
          source={{
            uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
          }}
          avatarStyle={styles.avatarImage}>
          <Avatar.Accessory
            size={hp(4)}
            onPress={() => console.log('clicked on profile pic')}
            iconProps={{
              name: 'edit',
              size: hp(2),
              color: 'black',
              backgroundColor: 'red'
            }}
            style={styles.accessoryStyle}
          />
        </Avatar>

        <Text style={styles.title}>Lakhan Nemane</Text>
        <Text style={styles.numberText}>{maskNumber(9834201623)}</Text>
        <Text style={styles.emailText}>lnemane7@gmail.com</Text>

        <CustomButton
          title={'Google fit'}
          name={'consent'}
          minWidth={wp(30)}
          // onPress={props?.handleSubmit}
          // isLoading={store.getState().settings.isLoading}
          btnStyles={{
            ...styles.btnConsentStyles,
            backgroundColor: Colors.dayBackground,
            height: 'auto',
            minWidth: wp('20'),
            borderRadius: 20
          }}
          btnTitleStyles={{
            ...styles.textStyle,
            marginLeft: wp(1.5),
            color: Colors.gray_02
          }}
          leftIcon={{
            type: iconType.feather,
            name: 'link',
            size: fontSize.md,
            color: Colors.gray_02
          }}
        />
      </View>

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
                value: props?.formState?.firstName,
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
                value: props?.formState?.lastName,
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
              value={props?.formState?.dob}
              onChangeText={props.handleChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomDropdown
              name="country"
              title="Country"
              label="Select"
              mandatory
              value= {"91"}
              data={Countries}
              onChangeText={props.handleChange}
              valueExtractor={item => item.value}
              labelExtractor={item => item.label}
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
                value: props?.formState?.age,
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
                value: props?.formState?.weight,
              }}
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
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
            data={[{gender: 'Male'}, {gender: 'Female'}, {gender: 'Other'}]}
            onChangeText={props.handleChange}
            valueExtractor={item => item.gender}
            labelExtractor={item => item.gender}
          />
        </View>

        <View style={styles.fullWidth}>
          <CustomTextInput
            label="Height"
            name="height"
            mandatory
            inputProps={{
              value: props?.formState?.height,
            }}
            inputStyle={styles.textInputStyle}
            onChangeText={props.handleChange}
          />
        </View>

        <CustomButton title={'Save Changes'} btnStyles={styles.btnStyles} onPress={props?.handleSubmit} />
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
    marginVertical: hp(1)
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
