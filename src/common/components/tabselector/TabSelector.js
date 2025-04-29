import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fontSize} from '../../../utils/constants/Fonts';
import {hp} from '../../functions/dimensions';

const TabSelector = ({tabs = [], onTabChange}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabPress = index => {
    setSelectedIndex(index);
    if (onTabChange) {
      onTabChange(tabs[index]);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, selectedIndex === index && styles.activeTab]}
          onPress={() => handleTabPress(index)}>
          <Text
            style={[
              styles.tabText,
              selectedIndex === index && styles.activeTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 6,
    borderRadius: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: hp(4),
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#C3D600', // active tab color
  },
  tabText: {
    color: 'black',
    fontSize: fontSize.normal,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});
