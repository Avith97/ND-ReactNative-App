import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Calendar, CalendarProvider} from 'react-native-calendars';
import moment from 'moment';
import {hp} from '../../functions/dimensions';
import Colors from '../../../utils/constants/Colors';

export default function CalendarComponent({children, mode = 'month'}) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [pickerMonth, setPickerMonth] = useState(moment().month());
  const [pickerYear, setPickerYear] = useState(moment().year());

  const handleDatePress = useCallback(day => {
    setSelectedDate(day.dateString);
  }, []);

  const navigateDate = (amount, unit, isAdd = true) => {
    const newDate = moment(selectedDate)
      [isAdd ? 'add' : 'subtract'](1, unit)
      .startOf(mode)
      .format('YYYY-MM-DD');

    setSelectedDate(newDate);
    setPickerMonth(moment(newDate).month());
    setPickerYear(moment(newDate).year());
  };

  // Period ranges to match the image
  const markedDates = {
    '2025-05-06': {startingDay: true, color: '#85E3FF', textColor: 'black'},
    '2025-05-07': {color: '#85E3FF', textColor: 'black'},
    '2025-05-08': {color: '#85E3FF', textColor: 'black'},
    '2025-05-09': {color: '#85E3FF', textColor: 'black'},
    '2025-05-10': {color: '#85E3FF', textColor: 'black'},
    '2025-05-11': {color: '#85E3FF', textColor: 'black'},
    '2025-05-12': {endingDay: true, color: '#85E3FF', textColor: 'black'},

    '2025-05-20': {startingDay: true, color: '#84BAFF', textColor: 'black'},
    '2025-05-21': {color: '#84BAFF', textColor: 'black'},
    '2025-05-22': {color: '#84BAFF', textColor: 'black'},
    '2025-05-23': {color: '#84BAFF', textColor: 'black'},
    '2025-05-24': {color: '#84BAFF', textColor: 'black'},
    '2025-05-25': {color: '#84BAFF', textColor: 'black'},
    '2025-05-26': {endingDay: true, color: '#84BAFF', textColor: 'black'},
  };

  // mode means tab   day | week | month
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigateDate(1, mode, false)}>
        <Text style={styles.arrow}>◀</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>
        {mode === 'day'
          ? moment(selectedDate).format('D MMMM')
          : moment(selectedDate).format('MMMM YYYY')}
      </Text>

      <TouchableOpacity onPress={() => navigateDate(1, mode, true)}>
        <Text style={styles.arrow}>▶</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CalendarProvider date={selectedDate}>
        {renderHeader()}
        {mode !== 'day' && (
          <View style={{backgroundColor: '#000', padding: 10, borderRadius: 6}}>
            <Calendar
              current={selectedDate}
              onDayPress={handleDatePress}
              markedDates={markedDates}
              markingType={'period'}
              renderHeader={() => null}
              hideArrows
              theme={calendarTheme}
            />
          </View>
        )}

        {children}
      </CalendarProvider>
    </View>
  );
}

const calendarTheme = {
  calendarBackground: '#000000',
  dayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  textSectionTitleColor: '#ffffff',
  textDisabledColor: '#555555',
  monthTextColor: '#ffffff',
  arrowColor: '#ffffff',
  disabledArrowColor: '#333333',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
    // paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#000',
    paddingVertical: hp(2),
    borderRadius: 6,
  },
  arrow: {
    fontSize: 18,
    color: Colors.white,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
