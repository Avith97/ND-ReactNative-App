import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomModal from '../../common/components/Modal/CustomModal';
import {FlatList} from 'react-native';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import { hp } from '../../common/functions/dimensions';

export default function GeneralSettingScreenUI(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.renderItem} onPress={()=>props.handleChange(item.id)}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.value}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {/* <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>This is custom content!</Text>
        <Button title="Custom Button" onPress={() => alert('Custom Button Pressed')} />
      </CustomModal> */}

      <FlatList
        data={props.settingsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // keyExtractor={(item, index) => `${valueExtractor(item)}-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  renderItem: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
    marginVertical: hp(1),
    borderRadius: 12,
  },
  title: {
    fontSize: fontSize.m,
    fontWeight: 600,
  },
  subtitle: {
    color: Colors.gray_06,
  },
});
