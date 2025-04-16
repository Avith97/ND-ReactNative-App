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
import Strings from '../../utils/constants/Strings';

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
  exerciseOptions: [
    'Strength Training',
    'Yoga or Pilates',
    'Cardio (Running, Cycling)',
    'HIIT (High-intensity interval training)',
    'Other',
  ],
};

export default function ExerciseTypeScreenUI(props) {
  // Multi-select: Exercises
  const [selectedExercises, setSelectedExercises] = useState([]);

  const toggleExercise = item => {
    if (selectedExercises.includes(item)) {
      setSelectedExercises(selectedExercises.filter(x => x !== item));
    } else {
      setSelectedExercises([...selectedExercises, item]);
    }
  };

  const handleContinue = () => {
    console.log('Exercises:', selectedExercises);
    props.navigation.navigate(Strings.NAVIGATION.motivation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        {/* === Screen 1: Exercise Type === */}
        <Text style={styles.heading}>{labels.headings.exerciseType}</Text>
        {labels.exerciseOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              selectedExercises.includes(item) && styles.optionSelected,
            ]}
            onPress={() => toggleExercise(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
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
