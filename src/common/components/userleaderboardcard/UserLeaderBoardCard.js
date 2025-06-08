import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../functions/dimensions'
import { fontSize } from '../../../utils/constants/Fonts'
import { Avatar } from 'react-native-elements'

export default function UserLeaderBoardCard(props) {
  return (
    <View style={styles.userCard}>
      <Avatar
        rounded
        size={'large'}
        source={{
          uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
        }}
        avatarStyle={styles.avatarImage}></Avatar>
      <View>
        {props?.runnerActivityDetail?.firstName && <Text style={styles.nameTitle}>{props?.runnerActivityDetail?.firstName} {props?.runnerActivityDetail?.lastName}</Text>}
       {props?.runnerActivityDetail?.bibNumber  && <Text>BIB no: {props?.runnerActivityDetail?.bibNumber}</Text>}
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
    fontSize: fontSize.md,
    fontWeight: 800
  }
})
