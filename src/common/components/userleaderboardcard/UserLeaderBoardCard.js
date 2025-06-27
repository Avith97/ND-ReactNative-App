import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { Avatar } from 'react-native-elements'
import { BASE_URL } from '../../../utils/constants/Urls'

export default function UserLeaderBoardCard(props) {
  console.log(props?.runnerActivityDetail)

  return (
    <View style={styles.userCard}>
      <Avatar
        rounded
        size={'large'}
        source={{
          uri:
            BASE_URL.replace('/api/v1/', '/') +
            props?.runnerActivityDetail?.profileLink
        }}
        avatarStyle={styles.avatarImage}></Avatar>
      <View>
        {props?.runnerActivityDetail?.firstName && (
          <Text style={styles.nameTitle}>
            {props?.runnerActivityDetail?.firstName}{' '}
            {props?.runnerActivityDetail?.lastName}
          </Text>
        )}
        {props?.runnerActivityDetail?.bibNumber && (
          <Text style={styles.bibTitle}>
            BIB no: {props?.runnerActivityDetail?.bibNumber}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: '#BCD64E2B',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: hp(2)
  },
  nameTitle: {
    fontSize: fontSize.m,
    // fontWeight: 800,
    fontFamily: Fonts.SemiBold
  },
  bibTitle: {
    fontSize: fontSize.normal,
    // fontWeight: 800,
    fontFamily: Fonts.Medium
  }
})
