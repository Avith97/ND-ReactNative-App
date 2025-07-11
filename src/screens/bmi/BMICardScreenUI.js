import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import BMIProgressBar from '../../common/components/progressbar/BMIProgressBar'
import { wp } from '../../common/functions/dimensions'

export default function BMICardScreenUI({ BMISummery, ...props }) {
  // Show loading if BMISummery is not ready
  if (!BMISummery || typeof BMISummery.bmi !== 'number') {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color="#91c12f" />
          <Text style={styles.missingText}>Loading BMI data...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your BMI:</Text>
        <Text style={styles.bmiValue}>{BMISummery.bmi}</Text>
        {/* Color Scale + Label */}
        <View style={styles.progressWrapper}>
          <BMIProgressBar bmi={BMISummery.bmi} />
        </View>
        {/* Details Row */}
        <View style={styles.detailsRow}>
          <InfoItem
            label="Weight"
            value={BMISummery.weight ? `${BMISummery.weight} KG` : '-'}
          />
          <InfoItem
            label="Height"
            value={BMISummery.height ? `${BMISummery.height} CM` : '-'}
          />
          <InfoItem
            label="Age"
            value={BMISummery.age ? `${BMISummery.age}` : '-'}
          />
          <InfoItem label="Gender" value={BMISummery.gender || '-'} />
        </View>
        {/* Normal Weight Range */}
        {BMISummery.normalWeightRange && (
          <View style={styles.rangeBox}>
            <Text style={styles.rangeText}>Normal weight for the height</Text>
            <Text style={styles.rangeHighlight}>
              {BMISummery.normalWeightRange.min} kg –{' '}
              {BMISummery.normalWeightRange.max} kg
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

const InfoItem = React.memo(({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{label}</Text>
  </View>
))

const styles = StyleSheet.create({
  // ... (same as before)
  container: {
    flex: 1
  },
  card: {
    backgroundColor: '#f4fbea',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: fontSize.l,
    color: '#444',
    fontFamily: Fonts.Bold
  },
  bmiValue: {
    fontSize: fontSize.xl,
    color: '#91c12f',
    fontWeight: '900',
    marginVertical: 8,
    fontFamily: Fonts.SemiBold
  },
  progressWrapper: {
    alignItems: 'center',
    marginVertical: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: wp(90)
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    flexWrap: 'wrap',
    width: '100%'
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 4
  },
  infoValue: {
    fontSize: fontSize.m,
    fontWeight: '600',
    color: '#7fbf3f',
    fontFamily: Fonts.normal
  },
  infoLabel: {
    fontSize: fontSize.normal,
    color: '#AAA',
    fontFamily: Fonts.Regular
  },
  rangeBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8
  },
  rangeText: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    color: '#222',
    fontSize: fontSize.normal
  },
  rangeHighlight: {
    color: '#7fbf3f',
    fontSize: fontSize.m,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold
  },
  missingText: {
    color: Colors.background_transperant_dark,
    fontSize: fontSize.normal,
    marginVertical: 16,
    textAlign: 'center',
    fontFamily: Fonts.Regular
  }
})
