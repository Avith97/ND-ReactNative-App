import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Calendar,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import moment from 'moment';
import Icons, {iconType} from '../../../assets/icons/Icons';

export default function CalendarComponent({children}) {
  const [weekView, setWeekView] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [pickerMonth, setPickerMonth] = useState(moment().month());
  const [pickerYear, setPickerYear] = useState(moment().year());
  const [showInlinePicker, setShowInlinePicker] = useState(false);

  const sportDot = {key: 'sport', color: '#00B0FF'};
  const meetingDot = {key: 'meeting', color: '#FFD700'};
  const workoutDot = {key: 'workout', color: '#32CD32'};

  const handleDatePress = useCallback(day => {
    setSelectedDate(day.dateString);
  }, []);

  const navigateDate = (amount, unit, isAdd = true) => {
    const newDate = moment(selectedDate)
      [isAdd ? 'add' : 'subtract'](1, unit)
      .startOf(unit === 'week' ? 'isoWeek' : 'month')
      .format('YYYY-MM-DD');

    setSelectedDate(newDate);
    setPickerMonth(moment(newDate).month());
    setPickerYear(moment(newDate).year());
  };

  const markedDates = {
    '2025-04-02': {
      dots: [sportDot, meetingDot],
      marked: true,
      selected: true,
      selectedColor: '#c5f73d',
      selectedTextColor: 'black',
      periods: [
        {startingDay: true, color: '#00B0FF'},
        {endingDay: true, color: '#FFD700'},
      ],
    },
    '2025-04-03': {
      dots: [sportDot],
      marked: true,
      periods: [{startingDay: true, endingDay: true, color: '#00B0FF'}],
    },
    '2025-04-04': {
      periods: [{startingDay: false, endingDay: false, color: '#00B0FF'}],
    },
    '2025-04-05': {
      periods: [{startingDay: false, endingDay: true, color: '#00B0FF'}],
    },
    '2025-04-10': {
      dots: [sportDot, meetingDot, workoutDot],
      marked: true,
      periods: [
        {startingDay: true, endingDay: true, color: '#32CD32'},
        {startingDay: true, endingDay: true, color: '#FFD700'},
      ],
    },
  };

  const renderHeader = () => (
    <View style={styles.weekHeaderContainer}>
      <Text></Text>
      <TouchableOpacity
        onPress={() => navigateDate(1, weekView ? 'week' : 'month', false)}>
        <Text style={styles.arrow}>◀</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowInlinePicker(prev => !prev)}>
        <Text style={styles.weekHeader}>
          {moment(selectedDate).format('MMMM YYYY')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateDate(1, weekView ? 'week' : 'month', true)}>
        <Text style={styles.arrow}>▶</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setWeekView(prev => !prev)}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          padding: 10,
          borderRadius: 10,
        }}>
        <Icons
          name="calendar"
          type={iconType.feather}
          size={20}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );

  const renderInlinePicker = () => (
    <View style={styles.inlinePickerRow}>
      <Picker
        style={{flex: 1}}
        selectedValue={pickerMonth}
        onValueChange={value => {
          const updated = moment({year: pickerYear, month: value})
            .startOf('month')
            .format('YYYY-MM-DD');
          setPickerMonth(value);
          setSelectedDate(updated);
          setShowInlinePicker(false);
        }}>
        {Array.from({length: 12}, (_, i) => (
          <Picker.Item
            key={i}
            label={moment().month(i).format('MMMM')}
            value={i}
          />
        ))}
      </Picker>

      <Picker
        style={{flex: 1}}
        selectedValue={pickerYear}
        onValueChange={value => {
          const updated = moment({year: value, month: pickerMonth})
            .startOf('month')
            .format('YYYY-MM-DD');
          setPickerYear(value);
          setSelectedDate(updated);
          setShowInlinePicker(false);
        }}>
        {Array.from({length: 30}, (_, i) => {
          const year = moment().year() - i;
          return <Picker.Item key={year} label={`${year}`} value={year} />;
        })}
      </Picker>
    </View>
  );

  return (
    <View style={styles.container}>
      <CalendarProvider date={selectedDate}>
        {renderHeader()}
        {showInlinePicker && renderInlinePicker()}

        {weekView ? (
          <WeekCalendar
            date={selectedDate}
            markingType={'multi-dot'}
            onDayPress={handleDatePress}
            markedDates={markedDates}
            theme={calendarTheme}
            style={{height: 300, marginBottom: 0}}
          />
        ) : (
          <Calendar
            key="month"
            markingType={'multi-period'}
            renderHeader={() => null}
            current={selectedDate}
            onDayPress={handleDatePress}
            markedDates={markedDates}
            hideArrows
            hideExtraDays
            disableMonthChange
            theme={calendarTheme}
          />
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
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  textSectionTitleColor: '#ffffff',
  textDisabledColor: '#555555',
  monthTextColor: '#ffffff',
  arrowColor: '#ffffff',
  disabledArrowColor: '#333333',
};

const styles = StyleSheet.create({
  container: {flex: 1},
  toggleBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectedBox: {
    alignItems: 'center',
    marginTop: 10,
  },
  inlinePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 0,
    alignItems: 'center',
  },
  selectedTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  weekHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  arrow: {
    fontSize: 18,
    color: '#9CBF06',
    paddingHorizontal: 10,
  },
  weekHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
