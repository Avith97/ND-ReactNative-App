import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { fontSize } from '../../../utils/constants/Fonts';

const ProgramCard = ({title, duration, calories, image, status}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.statusTag}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>

        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>⏱ {duration}</Text>
          <Text style={styles.detailText}>🔥 {calories} Kcal</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: 160,
    padding: 10,
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: 12,
  },
  statusTag: {
    alignSelf: 'flex-end',
    backgroundColor: '#B5FF6B',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusText: {
    fontSize: fontSize.normal,
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#B5FF6B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  registerText: {
    color: '#000',
    fontWeight: '600',
    fontSize: fontSize.s,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailText: {
    color: '#fff',
     fontSize: fontSize.normal,
  },
});

export default ProgramCard;
