import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from '../../../assets/icons/Icons'
import { hp, wp } from '../../../common/functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const RunnerGroupTabUI = ({
  title,
  data,
  rank,
  score,
  backgroundColor,
  expanded,
  onToggle
}) => {
  const renderItem = ({ item }) => (
    <View style={styles.memberRow}>
      <Text style={styles.memberName}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.memberScore}>{item.totalSteps} </Text>
    </View>
  )

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <TouchableOpacity style={styles.headerRow} onPress={onToggle}>
        <View style={styles.leftRow}>
          <Text style={styles.rank}>{rank}.</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightRow}>
          <Text style={styles.score}>{score} </Text>

          {(rank === 1 || rank === 2) && (
            <Icons name="Trophy" size={20} color="#FF8C00" />
          )}

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
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginVertical: 8,
    paddingVertical: hp(2),
    shadowColor: '#000',
    paddingHorizontal: wp(3),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  rank: {
    fontSize: fontSize.m,
    // fontWeight: 'bold',
    fontFamily: Fonts.SemiBold,
    marginRight: 6
  },
  title: {
    fontSize: fontSize.m,
    fontFamily: Fonts.Medium
  },
  score: {
    fontSize: fontSize.normal,
    // fontWeight: '600'
    fontFamily: Fonts.SemiBold
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  memberName: {
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular
  },
  memberScore: {
    fontSize: fontSize.s,
    fontFamily: Fonts.SemiBold
  }
})

export default RunnerGroupTabUI
