import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const labels = {
  headings: {
    exerciseType: 'What type of exercises do you enjoy?',
    medicalConditions:
      'Do you have any medical conditions or physical limitations that we should be aware of?',
    workoutEnvironment: 'What is your preferred workout environment?',
  },
  placeholders: {
    otherCondition: 'If Other, please specify',
  },
  buttons: {
    continue: 'Continue',
  },
 
};

export default function ExerciseTypeScreenUI(props) {
  
   

  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        {/* === Screen 1: Exercise Type === */}
        <Text style={styles.heading}>{labels.headings.exerciseType}</Text>
        {props?.exerciseOptions?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              props.selectedExercises.includes(item) && styles.optionSelected,
            ]}
            onPress={() => props.handleChange("selectedExercises" ,item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueBtn} onPress={props.handleSubmit}>
        <Text style={styles.continueText}>{labels.buttons.continue}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  ContentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  heading: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  optionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {fontWeight: 'bold'},
});
