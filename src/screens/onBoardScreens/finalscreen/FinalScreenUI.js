import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import Strings from '../../../utils/constants/Strings';
import { hp, wp } from '../../../common/functions/dimensions';
import { Images } from '../../../utils/constants/Images';

const labels = {
  get_started: 'Get Started',
  title: 'Find Your Work',
  description:
    'Discover and access a wide variety of workout routines, filter and sort them based on criteria like type, duration, and intensity, and often receive personalized recommendations to meet your fitness goals and preferences.',
};

export default function FinalScreenUI(props) {
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image Section */}
        <Image
          source={Images.runner_female_bg_image} // <-- Replace with your image path
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

      <TouchableOpacity style={styles.continueBtn} onPress={props?.handleSubmit}>
        <Text style={styles.continueText}>{labels.get_started}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  contentContainer: {
    flex: 1,
  },
  image: {
    width: wp(100),
    height: hp(40),
    backgroundColor:"red",
    marginBottom: 20,
    resizeMode:"cover",
    opacity:0.6
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
