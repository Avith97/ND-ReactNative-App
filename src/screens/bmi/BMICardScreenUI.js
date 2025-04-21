import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontSize} from '../../utils/constants/Fonts';

export default function BMICardScreenUI() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your BMI:</Text>
        <Text style={styles.bmiValue}>22.5</Text>

        {/* Color Scale + Label */}
        <View style={styles.progressWrapper}>
          <Text style={styles.bmiLabel}>Normal</Text>
          <View style={styles.barRow}>{generateBars(30)}</View>
        </View>

        {/* Details Row */}
        <View style={styles.detailsRow}>
          <InfoItem label="Weight" value="65 kg" />
          <InfoItem label="Height" value="170 cm" />
          <InfoItem label="Age" value="26" />
          <InfoItem label="Gender" value="male" />
        </View>

        {/* Normal Weight Range */}
        <View style={styles.rangeBox}>
          <Text style={styles.rangeText}>
            Normal weight for the height:
            {'\n'}
            <Text style={styles.rangeHighlight}>53.5 kg – 72.3 kg</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const InfoItem = ({label, value}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{label}</Text>
  </View>
);

const generateBars = count => {
  const barColors = [
    ...Array(6).fill('#7EC8E3'), // blue
    ...Array(10).fill('#70C16B'), // green
    ...Array(10).fill('#FFDD57'), // yellow
    ...Array(10).fill('#F45B69'), // red
  ];

  return Array.from({length: count}, (_, index) => (
    <View
      key={index}
      style={[
        styles.bar,
        {
          backgroundColor: barColors[index] || '#ccc',
          borderTopLeftRadius: index === 0 ? 10 : 0,
          borderBottomLeftRadius: index === 0 ? 10 : 0,
          borderTopRightRadius: index === count - 1 ? 10 : 0,
          borderBottomRightRadius: index === count - 1 ? 10 : 0,
        },
      ]}
    />
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // paddingTop: 40,
    // paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f4fbea',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.l,
    color: '#444',
    fontWeight: '500',
  },
  bmiValue: {
    fontSize: fontSize.xl,
    color: '#91c12f',
    fontWeight: 900,
    marginVertical: 8,
  },
  progressWrapper: {
    alignItems: 'center',
    marginVertical: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  bmiLabel: {
    backgroundColor: '#91c12f',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
    fontWeight: '600',
  },
  barRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 2,
  },
  bar: {
    width: 6,
    height: 20,
    marginHorizontal: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    flexWrap: 'wrap',
    width: '100%',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 4,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: '#7fbf3f',
  },
  infoLabel: {
    fontSize: fontSize.normal,
    color: '#AAA',
  },
  rangeBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rangeText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#222',
    fontSize: fontSize.md,
  },
  rangeHighlight: {
    color: '#7fbf3f',
    fontWeight: 'bold',
    fontSize: fontSize.l,
  },
});
