import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {hp, wp} from '../../../common/functions/dimensions';
import { fontSize } from '../../../utils/constants/Fonts';

export default function CalenderScreenUI({challengeData}) {
  const renderItem = ({item}) => (
    <View
      style={[
        styles.card,
        {backgroundColor: item.bgColor, borderColor: item.borderColor},
      ]}>
      <View style={styles.headerRow}>
        <View style={[styles.dot, {backgroundColor: item.color}]} />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.rangeRow}>
        <Text style={styles.date}>From – {item.fromDate}</Text>
        <Text style={styles.date}>To – {item.toDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={challengeData}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: hp(1)}}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginVertical: hp(0.6),
    borderRadius: 8,
    borderWidth: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    marginRight: wp(2),
  },
  timeText: {
    color: '#8E8E93',
    fontWeight: '600',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: hp(0.5),
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(55),
  },
  date: {
    fontSize: fontSize.normal,
    color: '#333',
  },
});
