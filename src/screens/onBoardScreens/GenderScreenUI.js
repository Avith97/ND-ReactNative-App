import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Strings from '../../utils/constants/Strings';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import Colors from '../../utils/constants/Colors';
import {fontSize} from '../../utils/constants/Fonts';
import {hp, wp} from '../../common/functions/dimensions';
import CustomButton from '../../common/components/buttons/CustomButton';
import {Images} from '../../utils/constants/Images';

// Centralized static labels
const LABELS = {
  title: 'Hello Adrian!',
  subtitle: 'Tell us more about you..',
  genderLabel: 'Select your gender',
  ageLabel: 'Age',
  weightLabel: 'Weight',
  heightLabel: 'Height',
  continueText: 'Continue',
  genderOptions: ['Male', 'Female'],
  weightUnits: ['KG', 'LB'],
  heightUnits: ['CM', 'FT'],
  agePlaceholder: 'Enter age',
  weightPlaceholder: 'Kg',
  heightPlaceholder: 'Ft In',
};

export default function GenderScreenUI(props) {
  // Logic (State Management)
  const [gender, setGender] = useState(null);
  const [state, setState] = useState({
    age: null,
    weight: null,
    height: null,
    weightUnit: 'KG',
    heightUnit: 'CM',
  });

  async function handleChange(params, val) {
    setState({
      ...state,
      [params]: val,
    });
  }

  const handleContinue = () => {
    console.log(state);
    props.navigation.navigate(Strings.NAVIGATION.activityLevel);
  };

  // UI
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Text style={styles.title}>{LABELS.title}</Text>
        <Text style={styles.subtitle}>{LABELS.subtitle}</Text>

        <Text style={styles.label}>{LABELS.genderLabel}</Text>
        <View style={styles.genderContainer}>
          {LABELS.genderOptions.map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.genderBox, gender === g && styles.genderSelected]}
              onPress={() => setGender(g)}>
              <Image
                source={
                  g === 'Male'
                    ? Images.select_gender_male_icon
                    : Images.select_gender_female_icon
                }
                style={{width: 45, height: 45, marginRight: 8}}
              />
              <Text style={{paddingTop: 5}}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{LABELS.ageLabel}</Text>
        <View style={styles.row}>
          <CustomTextInput
            name={'age'}
            inputStyle={{...styles.textInputStyle}}
            onChangeText={handleChange}
            inputProps={{
              // flex: 1,
              value: props.age,
              placeholder: LABELS.agePlaceholder,
            }}
          />
        </View>

        <Text style={styles.label}>{LABELS.weightLabel}</Text>
        <View style={styles.row}>
          <CustomTextInput
            name={'weight'}
            inputStyle={{...styles.textInputStyle, width: wp(60)}}
            onChangeText={handleChange}
            inputProps={{
              // flex: 1,
              value: props.weight,
              placeholder: LABELS.weightPlaceholder,
            }}
          />

          <View style={styles.unitContainer}>
            {LABELS.weightUnits.map(unit => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitBtn,
                  state.weightUnit === unit && styles.unitSelected,
                ]}
                onPress={() => handleChange('weightUnit', unit)}>
                <Text>{unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.label}>{LABELS.heightLabel}</Text>
        <View style={styles.row}>
          <CustomTextInput
            name={'height'}
            inputStyle={{...styles.textInputStyle, width: wp(60)}}
            onChangeText={handleChange}
            inputProps={{
              // flex: 1,
              value: props.height,
              placeholder: LABELS.heightPlaceholder,
            }}
          />

          <View style={styles.unitContainer}>
            {LABELS.heightUnits.map(unit => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitBtn,
                  state.heightUnit === unit && styles.unitSelected,
                ]}
                onPress={() => handleChange('heightUnit', unit)}>
                <Text>{unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>{LABELS.continueText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: 'white', flex: 1},
  ContentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 6},
  subtitle: {fontSize: 16, marginBottom: 20},
  label: {marginTop: 10, marginBottom: 5, fontWeight: '600'},
  genderContainer: {flexDirection: 'row', gap: 10},
  AgeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  genderBox: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    borderRadius: 8,
  },
  genderSelected: {borderColor: '#7CFC00', backgroundColor: '#E8FFE8'},
  textInputStyle: {
    fontSize: fontSize.normal,
    elevation: 5,
    height: hp('6'),
    width: wp('90'), // Matches the text input width with the remaining space
    color: Colors.text_black,
  },
  row: {flexDirection: 'row', alignItems: 'center', gap: 10},
  unitContainer: {
    flexDirection: 'row',
    gap: 5,
    border: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  unitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  unitSelected: {borderColor: '#7CFC00', backgroundColor: '#E8FFE8'},

  continueBtn: {
    marginTop: 30,
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    bottom: 1,
  },
  continueText: {fontWeight: 'bold'},
});
