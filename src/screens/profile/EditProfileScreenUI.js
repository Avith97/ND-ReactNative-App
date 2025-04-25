import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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

export default function EditProfileScreenUI(props) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center'}}>
        <Avatar
          rounded
          size={'xlarge'}
          source={{
            uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
          }}
          avatarStyle={styles.avatarImage}>
          <Avatar.Accessory
            size={hp(4)}
            onPress={() => console.log('clicked on profile pic')}
            iconProps={{
              name: 'edit',
              size: hp(2),
              color: 'black',
              backgroundColor: 'red',
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
            borderRadius: 20,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
            marginLeft: wp(1.5),
            color: Colors.gray_02,
          }}
          leftIcon={{
            type: iconType.feather,
            name: 'link',
            size: fontSize.md,
            color: Colors.gray_02,
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
              onChangeText={props.handleChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomTextInput
              label="Last name"
              name="lastName"
              mandatory
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
              onChangeText={props.handleChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomDropdown
              name="country"
              title="Country"
              label="Select"
              mandatory
              data={[{country: 'India'}, {country: 'Australia'}]}
              onChangeText={props.handleChange}
              valueExtractor={item => item.country}
              labelExtractor={item => item.country}
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
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomTextInput
              label="Weight"
              name="weight"
              mandatory
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>
        </View>

        {/* Gender & Height */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomDropdown
              name="gender"
              title="Gender"
              label="Select"
              mandatory
              data={[{gender: 'Male'}, {gender: 'Female'}, {gender: 'Other'}]}
              onChangeText={props.handleChange}
              valueExtractor={item => item.gender}
              labelExtractor={item => item.gender}
            />
          </View>
          <View style={styles.halfWidth}>
            <CustomTextInput
              label="Height"
              name="height"
              mandatory
              inputStyle={styles.textInputStyle}
              onChangeText={props.handleChange}
            />
          </View>
        </View>

        {/* Language */}
        <View style={styles.fullWidth}>
          <CustomDropdown
            name="language"
            title="Language"
            label="Select"
            mandatory
            data={[
              {language: 'English'},
              {language: 'Hindi'},
              {language: 'Marathi'},
            ]}
            onChangeText={props.handleChange}
            valueExtractor={item => item.language}
            labelExtractor={item => item.language}
          />
        </View>

        {/* Activity Level */}
        <View style={styles.fullWidth}>
          <CustomDropdown
            name="activitylevel"
            title="Activity Level"
            label="Select"
            mandatory
            data={[
              {activitylevel: 'Sedentary'},
              {activitylevel: 'Slightly Active'},
              {activitylevel: 'Moderately Active'},
              {activitylevel: 'Very Active'},
            ]}
            onChangeText={props.handleChange}
            valueExtractor={item => item.activitylevel}
            labelExtractor={item => item.activitylevel}
          />
        </View>

        {/* Motivation */}
        <View style={styles.fullWidth}>
          <CustomDropdown
            name="motivateyou"
            title="Motivation to stay Active"
            label="Select"
            mandatory
            data={[
              {motivateyou: 'Sedentary'},
              {motivateyou: 'Slightly Active'},
              {motivateyou: 'Moderately Active'},
              {motivateyou: 'Very Active'},
            ]}
            onChangeText={props.handleChange}
            valueExtractor={item => item.motivateyou}
            labelExtractor={item => item.motivateyou}
          />
        </View>

        <CustomButton title={'Save Changes'} btnStyles={styles.btnStyles} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    // alignItems: 'center',
    // paddingBottom: hp(10),
  },
  formContainer: {
    marginTop: hp(2),
  },
  row: {
    width: wp(89),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  halfWidth: {
    width: wp(42),
  },
  fullWidth: {
    width: wp(89),
    marginVertical: hp(1),
  },
  textInputStyle: {},
  btnConsentStyles: {
    marginVertical: hp(1),
  },
  btnStyles: {
    marginTop: hp(1.5),
  },
  textStyle: {
    color: '#000',
    fontSize: fontSize.normal,
  },
});
