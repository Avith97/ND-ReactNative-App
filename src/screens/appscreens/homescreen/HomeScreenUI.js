import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import PieProgressBar from '../../../common/components/progressbar/PieProgressBar'
import { hp, wp } from '../../../common/functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import Colors from '../../../utils/constants/Colors'
import EventCard from '../../../common/components/eventcard/EventCard'
import NotRespondingCard from '../../../common/components/notrespondingcard/NotRespondingCard'
import moment from 'moment'
import NoDataFound from '../../../common/components/nodatafound/NoDataFound'
import { en } from '../../../utils/labels/en'
import CircularProgress from '../../../common/components/Charts/CircularProgress'
import { colors } from 'react-native-elements'
import CustomImageBackground from '../../../common/components/background/CustomImageBackground'

export default function HomeScreenUI(props) {
  let { isLoggedIn } = props

  const [loading, setloading] = useState(false)

  return (
    <CustomImageBackground opacity={1} style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 5, marginBottom: hp(1) }}>
          <Text style={styles.title}>{`${en.welcome}`}</Text>
          <Text style={styles.subTitle}>A step Towards Healthy Life !</Text>
        </View>

        {props?.HomeScreenData && props?.HomeScreenData?.events?.length ? (
          <>
            {/* progress card */}
            <View style={styles.progress_card_wrapper}>
              <View style={{ flex: 1.2 }}>
                <Text
                  style={{
                    color: 'white',
                    paddingVertical: hp(1),
                    fontSize: fontSize.normal,
                    fontFamily: Fonts.Thin
                  }}>
                  {moment().format('DD MMM YYYY')}
                </Text>
                <Text style={{ ...styles.title, color: Colors.smoky_white }}>
                  Your daily progress
                </Text>
                {props?.progressEvent?.eventName && (
                  <Text style={{ ...styles.subTitle, fontSize: fontSize.m }}>
                    {props?.progressEvent?.eventName}
                  </Text>
                )}

                <Text
                  style={{
                    ...styles.subTitle2,
                    color: Colors.smoky_white,
                    opacity: 0.5
                  }}>
                  Accumulating daily report
                </Text>
                <View style={{ paddingVertical: hp(1) }}>
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
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {/* <PieProgressBar percentage={props?.HomeScreenData?.progressBar} /> */}
                <CircularProgress
                  percentage={props?.HomeScreenData?.progressBar}
                  iconName="leaf"
                  radius={wp(17)}
                />
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
            <NoDataFound />
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
    </CustomImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  title: {
    fontSize: fontSize.m,
    // fontFamily: 'Poppins-Black',
    fontFamily: Fonts.Italic,
    fontWeight: 'bold',
    marginBottom: hp(0.5)
  },
  subTitle: {
    fontFamily: Fonts.BoldItalic,
    fontSize: fontSize.n,
    color: '#94AE27'
    // marginBottom: hp(1),
  },
  subTitle2: {
    fontFamily: Fonts.Light,
    fontSize: fontSize.s,
    color: '#94AE27'
  },

  progress_card_wrapper: {
    backgroundColor: '#26281C',
    paddingHorizontal: hp(2),
    // paddingVertical: hp(1),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  rangetitle: {
    color: colors.white,
    fontSize: fontSize.normal,
    fontFamily: Fonts.LightItalic,
    opacity: 0.8
  }
})
