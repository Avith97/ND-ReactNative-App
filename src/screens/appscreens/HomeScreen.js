import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../utils/constants/Images';
import {ScrollView} from 'react-native-gesture-handler';
import ProgramCard from '../../common/components/programcard/ProgramCard';
import SessionCard from '../../common/components/sessioncard/SessionCard';
import { fontSize } from '../../utils/constants/Fonts';

export default function HomeScreen() {
  const programs = [
    {
      title: 'Step Challenge',
      duration: '20 Min',
      calories: 432,
      image: Images.runner_bg_image,
      status: 'Ongoing',
    },
    {
      title: 'Cycle Challenge',
      duration: '20 Min',
      calories: 432,
      image: Images.runner_bg_image,
      status: 'Ongoing',
    },
  ];

  const sessions = [
    {
      image: Images.runner_bg_image,
      title: 'Everything You Need to Know About Nonalcoholic Beer',
      author: 'Jay Manning',
      date: 'Nov 20, 2023',
      description:
        'Brewers are putting out great-tasting beers without alcohol...',
    },
    {
      image: Images.runner_bg_image,
      title: 'Eating More Plant-Based Meals May Help You Live Longer',
      author: 'Jay Manning',
      date: 'Nov 20, 2023',
      description: 'Cutting out red and processed meats for nuts and beans...',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Lakhan!</Text>
      <Text style={styles.subTitle}>you doing good today!</Text>

      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Programs</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {programs.map((item, index) => (
            <ProgramCard key={index} {...item} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Sessions</Text>
          <Text style={styles.seeAll}>See all </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sessions?.map((item, index) => (
            <SessionCard key={index} {...item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#fff"
  },
  subTitle:{
    fontSize:fontSize.md
  },

  wrapper: {
    // paddingHorizontal: 20,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: 'gray',
  },
});
