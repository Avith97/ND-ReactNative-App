import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fontSize } from '../../../utils/constants/Fonts';
import { hp } from '../../functions/dimensions';

const TabSelector = ({ 
  tabs = [], 
  onTabChange, 
  activeStyle = 'background', 
  activeColor = '#C3D600' 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabPress = (index) => {
    setSelectedIndex(index);
    onTabChange?.(tabs[index]);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = selectedIndex === index;

        const tabStyle = [
          styles.tab,
          activeStyle === 'background' && isActive && styles.activeBackground(activeColor),
          activeStyle === 'underline' && isActive && styles.activeUnderline(activeColor),
        ];

        const textStyle = [
          styles.tabText,
          isActive && styles.activeTabText,
        ];

        return (
          <TouchableOpacity 
            key={index} 
            style={tabStyle} 
            onPress={() => handleTabPress(index)}
          >
            <Text style={textStyle}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
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
  },
  tabText: {
    color: 'black',
    fontSize: fontSize.normal,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  activeBackground: (color) => ({
    backgroundColor: color,
    borderRadius: 8,
  }),
  activeUnderline: (color) => ({
    borderBottomWidth: 4,
    borderColor: color,
    paddingBottom: 2,
  }),
});
