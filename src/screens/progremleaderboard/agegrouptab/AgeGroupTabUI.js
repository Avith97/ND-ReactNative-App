import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons/Icons';
import { hp, wp } from '../../../common/functions/dimensions';
import Fonts from '../../../utils/constants/Fonts';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AgeGroupTabUI = ({ title, data, rank, totalSteps, backgroundColor ,expanded, onToggle }) => {

  

  const renderItem = ({ item }) => (
    <View style={styles.memberRow}>
      <Text style={styles.memberName}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.memberScore}>{item.totalSteps} Km </Text>
    </View>
  );

  

  return (
    <View style={[styles.card, { backgroundColor }]}> 

   
      <TouchableOpacity style={styles.headerRow} onPress={onToggle}>
        <View style={styles.leftRow}>
          {/* <Text style={styles.rank}>{rank}.</Text> */}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightRow}>
          <Text style={styles.score}>{totalSteps} Km </Text>

         
          <Icon
            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#333"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginVertical: 8,
    paddingVertical: hp(2),
    shadowColor: '#000',
    paddingHorizontal:wp(3),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rank: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily:Fonts.SemiBold,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    fontSize: 16,
    fontWeight: '600',
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  memberName: {
    fontSize: 14,
  },
  memberScore: {
    fontSize: 14,
  },
});

export default AgeGroupTabUI;
