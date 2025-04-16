import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

export default function ActivityLevelScreenUI(props) {
  
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        {/* === Activity Level Section === */}
        <Text style={styles.heading}>What is your activity level?</Text>
        <Text style={styles.subText}>
          This helps us design your workouts to fit your lifestyle
        </Text>

        {props?.activityOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.activityBox,
              props.selectedActivity?.title === option.title && styles.activitySelected,
            ]}
            onPress={() => props.handleChange("selectedActivity" , option)}>
            <Text style={styles.activityTitle}>{option.title}</Text>
            <Text style={styles.activityDesc}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={props.handleSubmit}>
        <Text style={styles.continueText}>Continue</Text>
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
  heading: {fontSize: 20, fontWeight: 'bold', marginTop: 20},
  subText: {fontSize: 14, color: '#666', marginBottom: 15},
  activityBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  activitySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
  activityTitle: {fontWeight: 'bold', fontSize: 16},
  activityDesc: {fontSize: 14, color: '#666', marginTop: 5},
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {fontWeight: 'bold'},
  bellyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  bellyBox: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bellySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
});
