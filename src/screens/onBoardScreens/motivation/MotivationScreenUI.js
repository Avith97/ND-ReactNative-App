import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const labels = {
  heading: 'What motivates you to stay active?',
  continue: 'Continue',
};

export default function MotivationScreenUI(props) {
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Text style={styles.heading}>{labels.heading}</Text>

        {props?.options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => props.handleChange('selectedMotivation', item)}>
            <View
              style={[
                styles.checkbox,
                props?.selectedMotivation.includes(item) && styles.checkedBox,
              ]}
            />
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueBtn} onPress={props.handleSubmit}>
        <Text style={styles.continueText}>{labels.continue}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  ContentContainer: {
    flex: 1,
    paddingTop: 20,
    // padding:4
  },
  // scrollContent: { padding: 20 },
  heading: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#BFFF00',
    borderColor: '#BFFF00',
  },
  optionText: {fontSize: 16},
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {fontWeight: 'bold'},
});
