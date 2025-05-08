import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CheckBox} from 'react-native-elements';
import Colors from '../../utils/constants/Colors';
import {fontSize} from '../../utils/constants/Fonts';
import CustomButton from '../../common/components/buttons/CustomButton';
import {hp, wp} from '../../common/functions/dimensions';
import Icons, {iconType} from '../../assets/icons/Icons';
import Video from 'react-native-video';

export default function SubmitResponseScreenUI() {
  const responseData = [
    {
      day: 'Day 4',
      status: 'Sustained',
      icon: 'emoji-emotions',
      bgColor: '#f0ffcc',
      btnText: 'View Response',
      btnColor: '#8bc34a',
    },
    {
      day: 'Day 5',
      status: 'Not Respond',
      icon: 'error-outline',
      bgColor: '#ffefef',
      btnText: 'Submit Response',
      btnColor: '#ef9a9a',
    },
    {
      day: 'Day 6',
      status: 'Not Respond',
      icon: 'error-outline',
      bgColor: '#ffefef',
      btnText: 'Submit Response',
      btnColor: '#ef9a9a',
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <Text style={{...styles.title, paddingLeft: 5}}>
        April 7, 2025 / Day 14
      </Text>
      {/* question Card */}
      <View style={styles.QuestionCardContainer}>
        <Text style={styles.question}>
          Did you plan your meals in advance to avoid the need for any readymade
          food yesterday?
        </Text>
        <View style={styles.checkboxRow}>
          <CheckBox />
          <Text style={styles.label}>On track</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox />
          <Text style={styles.label}>Off track</Text>
        </View>
        <CustomButton title="Submit Response" btnStyles={styles.submitBtn} />
      </View>

      {/* Tips Card */}

      <View style={styles.tipContainer}>
        <Text style={styles.title}>Tips of the the day:</Text>

        <View style={styles.bulletList}>
          <Text>
            {'\u2022'} Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Text>
          <Text>
            {'\u2022'} Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Text>
        </View>
      </View>

      {/* video */}
      <View style={styles.videoContainer}>
      <Video
        source={{ uri: 'http://192.168.1.49:8443/All/Yoga%20Videos/Day%201.mp4' }}
        controls={true}
        resizeMode="contain"
        style={styles.video}
        // volume={volume}
      />
      </View>

      {/* Responses */}
      <View style={styles.responseContainer}>
        <View style={styles.responseHeader}>
          <Text style={styles.title}>Responses</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Icons name={'image'} type={iconType.feather} size={20} />
            <Icons name={'share-2'} type={iconType.feather} size={20} />
          </View>
        </View>
        <View style={styles.daysListContainer}>
          {' '}
          <FlatList
            horizontal
            data={responseData}
            keyExtractor={item => item.day}
            renderItem={({item}) => (
              <View style={[styles.card, {backgroundColor: item.bgColor}]}>
                <Text style={styles.title}>{item.day}</Text>
                <View style={{...styles.row , flexDirection:"row" , width:wp(40) , alignItems:"center", gap:5}}>
                <Icons name={"alert-circle"} type={iconType.feather} size={10} color="black" />
                  <Text style={styles.status}>{item.status}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: item.btnColor}]}>
                  <Text style={styles.buttonText}>{item.btnText}</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{paddingHorizontal: 8}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  QuestionCardContainer: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
    borderRadius: 8,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: 600,
    marginBottom: hp(1),
  },
  tipContainer: {
    backgroundColor: Colors.dayBackground,
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
    borderRadius: 8,
    marginVertical: hp(2),
  },
  videoContainer: {},
  responseContainer: {},
  responseHeader: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  daysListContainer: {
    padding: 0,
  },
  question: {
    fontSize: fontSize.md,
    fontWeight: '600',
    // marginBottom: 16,
    color: '#000',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -15,
  },
  label: {
    marginLeft: -5,
    fontSize: fontSize.md,
    color: Colors.gray_01,
  },
  submitBtn: {
    marginTop: hp(3),
    width: wp(40),
    backgroundColor: Colors.secondary_btn,
  },
  card: {
    width: wp(40),
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },
  status: {
    fontSize: fontSize.normal,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: fontSize.md,
    fontWeight: 600,
  },


  //
  videoContainer:{
backgroundColor:"#000",
borderRadius:10,
  },
  video: { width: '100%', height: 190  },

  
});
