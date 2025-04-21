import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../utils/constants/Images';
import {ScrollView} from 'react-native-gesture-handler';
import ProgramCard from '../../common/components/programcard/ProgramCard';
import SessionCard from '../../common/components/sessioncard/SessionCard';
import {fontSize} from '../../utils/constants/Fonts';
import PieProgressBar from '../../common/components/progressbar/PieProgressBar';

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View>
      <Text style={styles.title}>Welcome, Lakhan!</Text>
      <Text style={styles.subTitle}>you doing good today!</Text>

      <View style={styles.mainContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Your daily{'\n'}progress</Text>
          <View style={styles.progressCenter}>
            <PieProgressBar percentage={80} />
            <Text style={styles.progressSubTitle}>
              Accumulating daily report
            </Text>
          </View>
        </View>

        <View style={styles.progressDataContainer}>
          <View style={styles.dataItem}>
          <Text style={{ fontSize: 20, }}>🔥</Text>
            <Text style={styles.value}>2.000</Text>
            <Text style={styles.label}>Kcal Burned</Text>
          </View>
          <View style={styles.dataItem}>
          <Text style={{ fontSize: 20, }}>👟</Text>
            <Text style={styles.value}>10000</Text>
            <Text style={styles.label}>Steps walk</Text>
          </View>
        </View>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: "relative",
    marginVertical: 10
  },

  progressContainer: {
    width: 220,
    height: 280,
    backgroundColor: '#26281C',
    borderRadius: 30,
    padding: 20,
    zIndex: 2,
    // position: 'absolute',
    // left: 0,
    // top: 10,
    elevation: 5,
  },

  progressTitle: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  progressSubTitle: {
    fontSize: fontSize.md,
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },

  progressCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressDataContainer: {
    width: 180,
    gap: 10,
    position: 'absolute',
    minHeight: 200,
    borderRadius: 20,
    backgroundColor: '#E1FB98',
    borderColor: '#B2DB03',
    paddingVertical: 40,
    paddingLeft: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 1,
    right: 0,
    bottom: 0
  },

  dataItem: {
    alignItems: 'center',
  },

  value: {
    fontSize: fontSize.l,
    color: '#000',
  },

  label: {
    fontSize: fontSize.md,
    color: 'gray',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: fontSize.md,
    color: '#94AE27',
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
