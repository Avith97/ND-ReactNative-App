import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GeneralSettingScreenUI from './GeneralSettingScreenUI'
import Colors from '../../utils/constants/Colors'
import Strings from '../../utils/constants/Strings'

export default function GeneralSettingScreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [options] = useState({
    settingsData: [
      {
        id: '1',
        name: 'Units Of Measure',
        value: 'Metric System',
        options: ['cm', 'ft'],
        disable: true
      },
      {
        id: '2',
        name: 'Language',
        value: 'English',
        options: ['kg', 'lbs'],
        disable: true
      },
      {
        id: '3',
        name: 'Delete Account',
        value: 'Permanently delete your account and all personal data.',
        disable: false
      }
    ]
  })

  const handleChange = name => {
    if (name === '1') {
      props.navigation.navigate(Strings.NAVIGATION.unitsettings)
    } else if (name === '2') {
      props.navigation.navigate(Strings.NAVIGATION.languagesettings)
    } else if (name === '3') {
      setModalVisible(true)
    }
  }
  return (
    <View style={styles.container}>
      <GeneralSettingScreenUI
        {...options}
        handleChange={handleChange}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white
  }
})
