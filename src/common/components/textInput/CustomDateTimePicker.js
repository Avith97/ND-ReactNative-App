import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Colors from '../../../utils/constants/Colors';
import { hp, wp } from '../../functions/dimensions';
import { fontSize } from '../../../utils/constants/Fonts';
import { Images } from '../../../utils/constants/Images'; // use image icon if you have one
import Icons ,{ iconType } from '../../../assets/icons/Icons';

const CustomDateTimePicker = (props) => {
  const [focused, setFocused] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = (date) => {
    hideDatePicker();
    props?.onChangeText(props.name, date); // sending raw date back, or format it here
  };

  return (
    <>
      {props.label && (
        <Text style={{ ...style.label, ...props?.labelStyle }}>
          {props?.label}
          {props?.mandatory && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      )}
      <TouchableOpacity onPress={showDatePicker} activeOpacity={0.8}>
        <View
          style={[
            style.textInputStyle,
            focused && { borderWidth: 2, borderColor: Colors.color3 },
            { ...props?.inputStyle },
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
          ]}
        >
          <Text style={{ color: props?.value ? '#000' : Colors.gray }}>
            {props?.value ? moment(props?.value).format('DD/MM/YYYY') : 'DD/MM/YYYY'}
          </Text>
          {/* Calendar icon on the right (use your preferred method) */}
          <Icons name="calendar-outline" type={iconType.ionicon} size={20} color={Colors.gray} />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={props?.maxDate || new Date()}
        date={props?.value || new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default CustomDateTimePicker;

const style = StyleSheet.create({
  label: {
    fontSize: fontSize.normal,
    marginBottom: hp(0.5),
  },
  textInputStyle: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    borderWidth: 0.7,
    borderColor: 'grey',
    borderRadius: 6,
    backgroundColor: 'white',
  }
});
