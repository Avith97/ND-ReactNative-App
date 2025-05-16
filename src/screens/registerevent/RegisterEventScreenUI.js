import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../../common/functions/dimensions';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import CustomButton from '../../common/components/buttons/CustomButton';
import {CheckBox} from 'react-native-elements';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import CustomDropdown from '../../common/components/dropdown/CustomDropdown';

export default function RegisterEventScreenUI(props) {
  const [agree, setAgree] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Link-style heading */}
      <TouchableOpacity>
        <Text style={styles.registerLink}>Register Here</Text>
      </TouchableOpacity>

      {/* Input Fields */}

      <View style={{marginVertical: hp(1.5)}}>
        <CustomDropdown
          name="activitytype"
          title="Activity Type"
          label="Select"
          mandatory
          data={[
            {activitytype: 'Step'},
            {activitytype: 'Run'},
            {activitytype: 'Cycle'},
          ]}
          onChangeText={props.handleChange}
          valueExtractor={item => item.activitytype}
          labelExtractor={item => item.activitytype}
        />
      </View>
      <View style={{marginVertical: hp(1.5)}}>
        <CustomDropdown
          name="eventcategory"
          title="Event Category"
          label="Select"
          mandatory
          data={[{eventcategory: '1000'}, {eventcategory: '2000'}]}
          onChangeText={props.handleChange}
          valueExtractor={item => item.eventcategory}
          labelExtractor={item => item.eventcategory}
        />
      </View>

      {/* Terms checkbox */}
      <View style={styles.checkboxRow}>
        <CheckBox value={agree} onValueChange={setAgree} />
        <Text style={styles.termsText}>
          Agree to the all terms & conditions
        </Text>
      </View>

      {/* Buttons */}
      <CustomButton
        title="Continue"
        btnStyles={styles.primaryBtn}
        onPress={props.handleNavigate}
      />
      <CustomButton title="Cancel" btnStyles={styles.secondaryBtn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  registerLink: {
    //   color: 'blue',
    //   textDecorationLine: 'underline',
    marginBottom: hp(1),
    fontSize: fontSize.l,
  },
  inputGroup: {
    marginBottom: hp(2),
  },
  label: {
    fontSize: fontSize.s,
    marginBottom: hp(0.5),
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    fontSize: fontSize.normal,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  termsText: {
    marginLeft: wp(0),
    fontSize: fontSize.s,
    color: '#333',
  },
  primaryBtn: {
    backgroundColor: '#C3E458',
    marginBottom: hp(2),
    paddingVertical: hp(1.5),
  },
  secondaryBtn: {
    backgroundColor: '#C3E458',
    paddingVertical: hp(1.5),
  },
});
