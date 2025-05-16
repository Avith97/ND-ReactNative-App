import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icons, {iconType} from '../../../assets/icons/Icons';
import {fontSize} from '../../../utils/constants/Fonts';
import Colors from '../../../utils/constants/Colors';
import {hp, wp} from '../../functions/dimensions';
import CustomButton from '../buttons/CustomButton';
import Strings from '../../../utils/constants/Strings';

const ChallengeCard = ({
  title = 'Zero Sugar Challenge',
  points = 180,
  handleNavigate,
}) => {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [0, 1, 2]; // Example: 1st, 2nd, 3rd days completed (0-based)

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>

      <View style={styles.card}>
        {/* Left section */}
        <View style={styles.leftSection}>
          <Icons
            type={iconType?.material}
            name="yoga"
            size={30}
            color={Colors.black}
          />
          <Text style={styles.pointsText}>{points}</Text>
          <View style={styles.row}>
            <Text style={styles.subtitle}>Points Earned</Text>
            <Icons
              type={iconType?.material}
              name="info-outline"
              size={12}
              color={Colors.black}
              style={{marginLeft: 4}}
            />
          </View>
        </View>

        {/* Right section */}
        <View style={styles.rightContent}>
          <View style={styles.rightSection}>
            <Icons
              type={iconType?.material}
              name="spa"
              size={30}
              style={{marginRight: 8}}
            />
            <Icons type={iconType?.material} name="spa" size={30} />
          </View>

          <View style={styles.dashedDivider} />

          <CustomButton
            title="Submit Response"
            name={Strings.NAVIGATION.submitresponse}
            btnStyles={{
              ...styles.btnStyles,
              elevation: 5,
            }}
            onPress={handleNavigate}
            btnTitleStyles={styles.textStyle}
          />
        </View>
      </View>

      {/* Week tracker */}
      <View style={styles.weekCard}>
        <Text style={styles.weekLabel}>Last 7 Days</Text>
        <View style={styles.weekRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayCircle}>
              <View
                style={[
                  styles.pendingCircle, // completedDays.includes(index) && styles.filledDot,
                ]}>
                <View
                  style={[
                    styles.pendingInsideCircle,
                    completedDays.includes(index) && styles.filledDot,
                  ]}
                />
              </View>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
  },
  cardTitle: {
    fontSize: fontSize.m,
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  card: {
    backgroundColor: '#E1FB98',
    borderWidth: 1,
    borderColor: '#B2DB03',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    alignItems: 'center',
    maxWidth: '40%',
  },
  pointsText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  subtitle: {
    fontSize: fontSize.normal,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flex: 1,
    marginLeft: wp(4),
    justifyContent: 'flex-start',
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp(1.5),
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderColor: '#000',
    opacity: 0.4,
    borderStyle: 'dashed',
    marginVertical: hp(2),
  },
  weekCard: {
    backgroundColor: '#E1FB98',
    borderWidth: 1,
    borderColor: '#B2DB03',
    borderRadius: 16,
    marginTop: hp(1.5),
    padding: 16,
  },
  weekLabel: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    color: '#555',
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    alignItems: 'center',
  },
  pendingCircle: {
    width: 19,
    height: 19,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },

  pendingInsideCircle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
  },
  filledDot: {
    backgroundColor: '#000',
  },
  dayText: {
    fontSize: fontSize.s,
    textAlign: 'center',
    fontWeight: '800',
  },
  btnStyles: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  textStyle: {
    fontSize: fontSize.normal,
    color: Colors.gray_03,
    fontWeight: 'bold',
  },
});

export default ChallengeCard;
