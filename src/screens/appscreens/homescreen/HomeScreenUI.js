import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import PieProgressBar from '../../../common/components/progressbar/PieProgressBar'
import { hp } from '../../../common/functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import Colors from '../../../utils/constants/Colors'
import EventCard from '../../../common/components/eventcard/EventCard'
import NotRespondingCard from '../../../common/components/notrespondingcard/NotRespondingCard'
import moment from 'moment'

export default function HomeScreenUI(props) {
  let { isLoggedIn } = props

  const [loading, setloading] = useState(false)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: hp(5) }}
      showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 5, marginBottom: hp(1) }}>
        <Text style={styles.title}>{isLoggedIn ? 'Welcome' : 'Welcome!'}</Text>
        <Text style={styles.subTitle}>
          {isLoggedIn
            ? "You're doing good today!"
            : 'A step Towards Healthy Life !'}
        </Text>
      </View>

      {props?.HomeScreenData && props?.HomeScreenData?.events ? (
        <>
          {/* progress card */}
          <View style={styles.progress_card_wrapper}>
            <View>
              <Text style={{ color: 'white', paddingBottom: hp(2) }}>
                {moment().format('DD MMM YYYY')}
              </Text>
              <Text style={{ ...styles.title, color: Colors.smoky_white }}>
                Your daily progress
              </Text>
              <Text style={styles.subTitle}>
                {props?.progressEvent
                  ? props?.progressEvent?.eventName
                  : 'Wellness Program'}
              </Text>
              <Text
                style={{
                  ...styles.subTitle,
                  color: Colors.smoky_white,
                  opacity: 0.5
                }}>
                Accumulating daily report
              </Text>
              {props?.progressEvent?.eventStartDate && (
                <Text style={styles.rangetitle}>
                  From - {props?.progressEvent?.eventStartDate}
                </Text>
              )}
              {props?.progressEvent?.eventEndDate && (
                <Text style={styles.rangetitle}>
                  TO - {props?.progressEvent?.eventEndDate}
                </Text>
              )}
            </View>
            <View>
              <PieProgressBar percentage={props?.HomeScreenData?.progressBar} />
            </View>
          </View>

          {/* not responding challenge */}

          {/* {props?.notResponding && props?.notResponding && (
            <NotRespondingCard handleNavigate={props.handleNavigate} />
          )} */}

          {/* ongoing  events  */}
          <View style={{ marginVertical: hp(1) }}>
            {props?.HomeScreenData?.events?.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles?.title}>{item?.eventName}</Text>
                  <EventCard
                    key={index}
                    {...item}
                    handleNavigate={props.handleNavigate}
                  />
                </View>
              )
            })}
          </View>

          {/* ongoing challenges */}
          {/* <View style={{marginVertical: hp(2)}}>
            {props.Challenges?.map((item, index) => (
              <ChallengeCard
                key={index}
                {...item}
                handleNavigate={props.handleNavigate}
              />
            ))}
          </View> */}

          {/* session */}
          {/* <View style={{marginVertical: hp(1)}}>
            <Text style={{...styles.title, fontFamily: Fonts.BoldItalic}}>
              Planning Diet for Weight Management
            </Text>
            {props.sessions.map((item, index) => (
              <View key={index}>
                <SessionCard key={index} {...item} />
              </View>
            ))}
          </View> */}
        </>
      ) : (
        <>
          <Text style={{ textAlign: 'center' }}>No data found !</Text>
        </>
        // <>
        //   {/* ongoing  events  */}
        //   <View style={{marginVertical: hp(1)}}>
        //     {props?.events ||
        //       [].map((item, index) => {
        //         return (
        //           <>
        //             <ProgramCard
        //               key={index}
        //               {...item}
        //               handleNavigate={props.handleNavigate}
        //             />
        //             {/* <View style={{position:"absolute",backgroundColor:"red" , height:0.5, width:wp(100), zIndex:1, top:hp(29.5)}} /> */}
        //           </>
        //         );
        //       })}
        //   </View>
        // </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: fontSize.m,
    // fontFamily: 'Poppins-Black',
    fontFamily: Fonts.Italic,
    fontWeight: 'bold'
    // marginBottom: hp(0.5),
  },
  subTitle: {
    fontFamily: Fonts.BoldItalic,
    fontSize: fontSize.normal,
    color: '#94AE27'
    // marginBottom: hp(1),
  },

  progress_card_wrapper: {
    backgroundColor: '#26281C',
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.5),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  rangetitle: {
    color: '#ffffff',
    fontSize: fontSize.s,
    opacity: 0.8
  }
})
