import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Switch } from 'react-native-elements'
import { fontSize } from '../../utils/constants/Fonts'

export default function NotificationSettingScreenUI(props) {
  const [settings, setSettings] = useState({
    workoutReminder: true,
    goalProgress: true,
    dailySummary: true,
    achievementChallenge: true,
    motivationTips: true,
    appAnnouncement: true
  })

  const toggleSwitch = key => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries({
        workoutReminder: 'Workout Reminder',
        goalProgress: 'Goal Progress',
        dailySummary: 'Daily Summary',
        achievementChallenge: 'Achievement & Challenge',
        motivationTips: 'Motivation Tips',
        appAnnouncement: 'App Announcement'
      }).map(([key, label]) => (
        <View style={styles.row} key={key}>
          <Text style={styles.label}>{label}</Text>
          <Switch
            value={settings[key]}
            onValueChange={() => toggleSwitch(key)}
            trackColor={{ false: '#ccc', true: '#D5E862' }}
            thumbColor={settings[key] ? '#91c12f' : '#f4f3f4'}
          />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
    // borderBottomWidth: 0.4,
    // borderColor: '#e0e0e0',
  },
  label: {
    fontSize: fontSize.md,
    color: '#222'
  }
})
