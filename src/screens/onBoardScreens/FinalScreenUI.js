import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import Strings from '../../utils/constants/Strings';

const labels = {
  continue: 'Continue',
  title: 'Find Your Work',
  description:
    'Discover and access a wide variety of workout routines, filter and sort them based on criteria like type, duration, and intensity, and often receive personalized recommendations to meet your fitness goals and preferences.',
};

export default function FinalScreenUI(props) {
  const handleContinue = () => {
    props.navigation.navigate(Strings.NAVIGATION.app);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image Section */}
        <Image
          source={require('../../assets/images/events/Group.png')} // <-- Replace with your image path
          style={styles.image}
          // resizeMode="contain"
        />

        {/* Title & Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{labels.title}</Text>
          <Text style={styles.description}>{labels.description}</Text>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>{labels.continue}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  contentContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
  },
  buttonContainer:{
    padding:20
  },
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  continueText: {fontWeight: 'bold'},
});
