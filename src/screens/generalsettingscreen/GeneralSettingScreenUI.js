import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomModal from '../../common/components/Modal/CustomModal';
import {FlatList} from 'react-native';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import {hp, wp} from '../../common/functions/dimensions';
import DialogBox from '../../common/components/Modal/DialogBox';
import CustomButton from '../../common/components/buttons/CustomButton';

export default function GeneralSettingScreenUI(props) {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        onPress={() => props.handleChange(item.id)}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.value}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {/* Custom Modal */}
      <DialogBox
        visible={props.modalVisible}
        onClose={() => props.setModalVisible(false)}
        title="Delete Account">
        <Text style={{fontSize: 18, marginBottom: 10}}>
          Are you sure you want to delete your account?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            paddingVertical: 10,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => props.setModalVisible(false)}>
              <Text style={{fontSize: 16, color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible(false);
                alert('Account deleted');
              }}>
              <Text
                style={{fontSize: 16, color: '#F55346', fontWeight: 'bold'}}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DialogBox>

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
