import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Strings from '../../utils/constants/Strings';

const labels = {
  heading: 'What motivates you to stay active?',
  options: [
    'Setting and achieving goals',
    'Social accountability',
    'Tracking progress',
    'Competing with others',
    'Enjoyment of the activity',
  ],
  continue: 'Continue',
};

export default function MotivationScreenUI(props) {
  const [selected, setSelected] = useState([]);

  const toggleOption = option => {
    if (selected.includes(option)) {
      setSelected(selected.filter(item => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const handleContinue = () => {
    console.log('Selected motivations:', selected);
    // navigation logic here
    props.navigation.navigate(Strings.NAVIGATION.finalOnboard);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Text style={styles.heading}>{labels.heading}</Text>

        {labels.options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => toggleOption(item)}>
            <View
              style={[
                styles.checkbox,
                selected.includes(item) && styles.checkedBox,
              ]}
            />
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
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
