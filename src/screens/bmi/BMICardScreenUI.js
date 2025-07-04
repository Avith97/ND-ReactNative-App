import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import CustomButton from '../../common/components/buttons/CustomButton'
import Strings from '../../utils/constants/Strings'
import { useNavigation } from '@react-navigation/native'

export default function BMICardScreenUI({ BMISummery, ...props }) {
  const hasBMI = !!BMISummery?.bmi
  let navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your BMI:</Text>
        {hasBMI ? (
          <>
            <Text style={styles.bmiValue}>{BMISummery.bmi}</Text>
            {/* Color Scale + Label */}
            <View style={styles.progressWrapper}>
              {BMISummery.category && (
                <Text style={styles.bmiLabel}>{BMISummery.category}</Text>
              )}
              <View style={styles.barRow}>{generateBars(30)}</View>
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
                <Text style={styles.rangeText}>
                  Normal weight for the height
                </Text>
                <Text style={styles.rangeHighlight}>
                  {BMISummery.normalWeightRange.min} kg –{' '}
                  {BMISummery.normalWeightRange.max} kg
                </Text>
              </View>
            )}
          </>
        ) : (
          <View>
            <Text style={styles.missingText}>
              Oops! Looks like we’re missing your height, weight, or age. Tap
              below to update your profile
            </Text>
            <CustomButton
              title="Update Profile"
              btnStyles={{
                ...props.btnStyles,
                backgroundColor: Colors.backgroundLight
              }}
              onPress={() =>
                navigation.navigate(Strings.NAVIGATION.editprofile)
              }
            />
          </View>
        )}
      </View>
    </View>
  )
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{label}</Text>
  </View>
)

const generateBars = count => {
  const barColors = [
    ...Array(6).fill('#7EC8E3'), // blue
    ...Array(10).fill('#70C16B'), // green
    ...Array(10).fill('#FFDD57'), // yellow
    ...Array(10).fill('#F45B69') // red
  ]
  return Array.from({ length: count }, (_, index) => (
    <View
      key={index}
      style={[
        styles.bar,
        {
          backgroundColor: barColors[index] || '#ccc',
          borderRadius: 10
        }
      ]}
    />
  ))
}

const styles = StyleSheet.create({
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
    borderBottomColor: '#e0e0e0'
  },
  bmiLabel: {
    backgroundColor: '#91c12f',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
    fontWeight: '600'
  },
  barRow: {
    flexDirection: 'row',
    gap: 2
  },
  bar: {
    width: 6,
    height: 20,
    marginHorizontal: 1
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
