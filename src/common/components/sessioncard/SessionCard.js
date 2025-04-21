import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fontSize } from '../../../utils/constants/Fonts';

const SessionCard = ({ image, title, author, date, description , minWidth }) => {
  return (
    <TouchableOpacity style={{...styles.card , width:minWidth}}>
      <Image source={image} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.meta}>By {author}   |   {date}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingBottom:10
  },
  image: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSize.m,
    marginBottom: 4,
    color: '#111',
  },
  meta: {
    fontSize: fontSize.s,
    color: '#888',
    marginBottom: 6,
  },
  description: {
    fontSize: fontSize.normal,
    color: '#444',
  },
});

export default SessionCard;
