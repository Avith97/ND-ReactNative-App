import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import SessionCard from '../../../common/components/sessioncard/SessionCard';
import ProgramCard from '../../../common/components/programcard/ProgramCard';
import PieProgressBar from '../../../common/components/progressbar/PieProgressBar';
import { hp , wp } from '../../../common/functions/dimensions';
import { fontSize } from '../../../utils/constants/Fonts';

export default function HomeScreenUI(props) {
 

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: hp(5)}} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Welcome, Lakhan!</Text>
      <Text style={styles.subTitle}>You're doing good today!</Text>

      <View style={styles.mainContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Your daily{'\n'}progress</Text>
          <View style={styles.progressCenter}>
            <PieProgressBar percentage={80} />
            <Text style={styles.progressSubTitle}>Accumulating daily report</Text>
          </View>
        </View>

        <View style={styles.progressDataContainer}>
          <View style={styles.dataItem}>
            <Text style={styles.emoji}>🔥</Text>
            <Text style={styles.value}>2,000</Text>
            <Text style={styles.label}>Kcal Burned</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.emoji}>👟</Text>
            <Text style={styles.value}>10,000</Text>
            <Text style={styles.label}>Steps Walk</Text>
          </View>
        </View>
      </View>

      <Section title="Programs">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.programs.map((item, index) => (
            <ProgramCard key={index} {...item} minWidth={wp(75)} />
          ))}
        </ScrollView>
      </Section>

      <Section title="Sessions">
        <ScrollView horizontal  contentContainerStyle={{paddingBottom: hp(2)}} showsHorizontalScrollIndicator={false}>
          {props.sessions.map((item, index) => (
            <SessionCard key={index} {...item} minWidth={wp(60)} />
          ))}
        </ScrollView>
      </Section>
    </ScrollView>
  );
}

const Section = ({title, children}) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.seeAll}>See All</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
  flex:1
  },
  title: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: fontSize.md,
    color: '#94AE27',
    marginTop: 5,
  },
  wrapper: {
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  seeAll: {
    fontSize: fontSize.normal,
    color: 'gray',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressContainer: {
    width: 220,
    height: 280,
    backgroundColor: '#26281C',
    borderRadius: 30,
    padding: 20,
    elevation: 5,
    zIndex: 2,
  },
  progressTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  progressSubTitle: {
    fontSize: fontSize.normal,
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
    backgroundColor: '#E1FB98',
    borderColor: '#B2DB03',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 40,
    paddingLeft: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 200,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
    gap: 10,
  },
  dataItem: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: fontSize.normal,
  },
  value: {
    fontSize: fontSize.md,
    color: '#000',
  },
  label: {
    fontSize: fontSize.normal,
    color: 'gray',
  },
});
