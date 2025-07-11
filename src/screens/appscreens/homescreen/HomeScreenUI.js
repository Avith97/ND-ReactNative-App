import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import PieProgressBar from '../../../common/components/progressbar/PieProgressBar'
import { hp, wp } from '../../../common/functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import Colors from '../../../utils/constants/Colors'
import EventCard from '../../../common/components/eventcard/EventCard'
import NotRespondingCard from '../../../common/components/notrespondingcard/NotRespondingCard'
import moment from 'moment'
import NoDataFound from '../../../common/components/nodatafound/NoDataFound'
import CircularProgress from '../../../common/components/Charts/CircularProgress'
import { colors } from 'react-native-elements'
import CustomImageBackground from '../../../common/components/background/CustomImageBackground'
import ProgramCard from '../../../common/components/programcard/ProgramCard'
import { programCardFormattedData } from '../../../common/functions/helper'

export default function HomeScreenUI(props) {
  let { isLoggedIn } = props

  const [loading, setloading] = useState(false)

  return (
    <CustomImageBackground opacity={1} style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 5, marginBottom: hp(1.5) }}>
          <Text
            style={{
              fontSize: fontSize.m,
              fontFamily: Fonts.SemiBold
            }}>
            {isLoggedIn ? 'Welcome' : 'Welcome!'}
          </Text>
          <Text style={styles.subTitle}>
            {isLoggedIn
              ? "You're doing good today!"
              : 'A step Towards Healthy Life !'}
          </Text>
        </View>

        {props?.HomeScreenData?.events?.length ||
        props?.HomeScreenData?.registeredEvents?.length ? (
          <>
            {/* progress card */}
            {props?.HomeScreenData?.events?.length && (
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
                        To - {props?.progressEvent?.eventEndDate}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center'
                    // backgroundColor:"red",
                    // padding:hp(1)
                  }}>
                  {/* <PieProgressBar percentage={props?.HomeScreenData?.progressBar} /> */}
                  <CircularProgress
                    percentage={props?.HomeScreenData?.progressBar}
                    iconName="leaf"
                    radius={wp(16)}
                  />
                </View>
              </View>
            )}

            {/* ongoing events */}
            {props?.HomeScreenData?.events?.length && (
              <FlatList
                data={props?.HomeScreenData?.events || []}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ marginVertical: hp(1) }}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, gap: hp(1) }}>
                    <EventCard
                      title={item?.eventName}
                      {...item}
                      handleNavigate={props.handleNavigate}
                    />
                  </View>
                )}
              />
            )}

            {/* registered events but upcoming */}
            <View style={{ marginVertical: hp(0) }}>
              {props?.HomeScreenData?.events?.length === 0 &&
                props?.HomeScreenData?.registeredEvents?.map((item, index) => {
                  let event = programCardFormattedData(item)

                  return (
                    <ProgramCard
                      key={index}
                      {...event}
                      program={event?.program || event}
                      handleNavigate={props.handleNavigateDetail}
                    />
                  )
                })}
            </View>
          </>
        ) : (
          <>
            <NoDataFound
              subTitle={
                "It seems like you haven't tracked any activities yet. Please visit program section for registration."
              }
            />
          </>
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
    paddingVertical: hp(0.5),
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
