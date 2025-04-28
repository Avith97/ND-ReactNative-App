import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons, {iconType} from '../../assets/icons/Icons';
import NormalProgressBar from '../../common/components/progressbar/NormalProgressBar';

export default function OnBoardCustomHeader({
  canGoBack,
  onBack,
  onSkip,
  hideSkip,
  progress,
}) {

  console.log(progress ,"gge");
  
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      {canGoBack ? (
        <TouchableOpacity onPress={onBack}>
          <Icons
            name="arrow-back-outline"
            type={iconType.ionicon}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24}} /> // Empty spacer when back is hidden
      )}

      {/* Normal Progress Bar */}
      {progress &&  <NormalProgressBar progress={progress} />}
     

      {!hideSkip ? (
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      ) : (
        <View style={{width: 40}} /> // empty space for alignment
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Or your onboarding background
    borderBottomWidth: 1,
    borderBottomColor: '#eee',

    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  skipText: {
    fontSize: 16,
    color: '#8CC63F',
    fontWeight: '500',
  },
});
