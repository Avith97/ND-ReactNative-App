import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StepsGraph from '../../../common/components/Charts/StepsGraph';
import CustomButton from '../../../common/components/buttons/CustomButton';
import { hp, wp } from '../../../common/functions/dimensions';
import { useNavigation } from '@react-navigation/native';
import Strings from '../../../utils/constants/Strings';
import CalendarComponent from '../../../common/components/datepicker/CalenderComponent';

export default function DashboardScreenUI() {
 const navigation = useNavigation(); // ✅ Access navigation

  const handleNavigate = () => {
    navigation.navigate(Strings.NAVIGATION.leaderboard); // ✅ Now works!
  };
  return (
    <View style={styles.container}>

      <View style={{marginVertical:hp(1.5)}}>
      <CalendarComponent>

        <StepsGraph/>
      </CalendarComponent>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={'Leaderboard'}
          name={''}
          onPress={handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
          }}
        />

        <CustomButton
          title={'Share'}
          name={''}
          onPress={handleNavigate}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyles: {
    width: wp(60),
    marginVertical: hp(1),
  },
  plusbtnStyle: {
    width: wp(10),
  },
});
