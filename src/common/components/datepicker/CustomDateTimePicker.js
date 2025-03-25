import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { CancelButton, ConfirmButton } from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { hp, wp } from '../../functions/dimensions'
import Icons, { iconType } from '../../../assets/icons/Icons'
import { fontSize } from '../../../utils/constants/Fonts'
import Colors from '../../../utils/constants/Colors'

const CustomDateTimePicker = (props = defaultProps) => {
    const [selectedDate, setselectedDate] = useState(new Date())
    const [show, setshow] = useState(false)

    function handleConfirm(params) {
        setselectedDate(params)
        // props.handleConfirm(params)
        setshow(false)
    }

    function hideDatePicker(params) {
        // props.hideDatePicker(params)
        setshow(false)
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setshow(true)}
            style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <Text onPress={() => setshow(true)}
                    style={{ textAlignVertical: 'center', marginTop: hp(0.5) }}
                >
                    {moment(selectedDate).format('DD/MM/YYYY')}
                </Text>
            </View>
            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Icons
                    type={iconType.fa}
                    name='calendar'
                    size={fontSize.l}
                    color={Colors.red}
                />
            </View>
            <DateTimePicker
                date={selectedDate}
                isVisible={show}
                mode={props.mode}
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {/* <CancelButton label='cancel' />
            <ConfirmButton label='open' /> */}
        </TouchableOpacity>
    )
}

const defaultProps = {
    handleConfirm: () => { },
    hideDatePicker: () => { },
    date: new Date(),
    mode: 'date' | "datetime" | "time"
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: hp(2),
        padding: wp(1.8),
        borderWidth: 0.7,
        // elevation: 9,
        borderColor: Colors.red,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})

export default CustomDateTimePicker