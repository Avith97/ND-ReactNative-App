import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { Images } from '../../utils/constants/Images'
import { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'

const notifications = [
  {
    id: '1',
    message:
      '🎯 Congratulations! You crushed your workout goal today. Keep it up!',
    time: '1h ago',
    read: false
  },
  {
    id: '2',
    message:
      '💡 Motivation Tip: Small progress each day adds up to big results. Stay consistent!',
    time: '3h ago',
    read: false
  },
  {
    id: '3',
    message:
      "⏰ Reminder: Don't forget your evening stretch session. Your body will thank you!",
    time: '8h ago',
    read: true
  },
  {
    id: '4',
    message: "🔥 You just completed 5 workouts in a row. You're on fire!",
    time: '1 Day ago',
    read: true
  },
  {
    id: '5',
    message: "🏋️‍♂️ Time to smash today's leg day workout. Let's go!",
    time: '2 Days ago',
    read: true
  },
  {
    id: '6',
    message:
      '🥇 New Achievement Unlocked: "Consistency King" - 30 days active!',
    time: '3 Days ago',
    read: true
  }
]

const NotificationItem = ({ item }) => {
  const backgroundColor = item.read ? '#FFFFFF' : '#F2F6F8' // White if read, light grey if unread

  return (
    <View style={[styles.notificationContainer, { backgroundColor }]}>
      <Image source={Images.app_logo} style={styles.icon} />
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  )
}

const NotificationListScreenUi = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //    backgroundColor:"#fff",
    // padding: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 12
  },
  messageContainer: {
    flex: 1
  },
  messageText: {
    fontSize: fontSize.normal,
    color: '#333',
    marginBottom: 8
  },
  timeText: {
    fontSize: fontSize.s,
    color: '#A0A0A0'
  }
})

export default NotificationListScreenUi
