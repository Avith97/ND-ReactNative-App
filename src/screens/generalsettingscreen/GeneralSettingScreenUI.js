import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomModal from '../../common/components/Modal/CustomModal'
import { FlatList } from 'react-native'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import { hp, wp } from '../../common/functions/dimensions'
import DialogBox from '../../common/components/Modal/DialogBox'
import CustomButton from '../../common/components/buttons/CustomButton'
import { store } from '../../redux/store'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import Strings from '../../utils/constants/Strings'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { useNavigation } from '@react-navigation/native'

export default function GeneralSettingScreenUI(props) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={item?.disable}
        style={styles.renderItem}
        onPress={() => props.handleChange(item.id)}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.value}</Text>
      </TouchableOpacity>
    )
  }

  const navigation = useNavigation() // Access navigation

  const handleNavigate = () => {
    navigation.navigate(Strings.NAVIGATION.auth) // Now works!
  }

  const handleDelete = async () => {
    try {
      const userId = store.getState().auth?.id
      const deleteUrl = [URL.delete_user, userId].join('/')

      // Call the delete service correctly
      const resp = await services._delete(
        deleteUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`
          }
        }
      )

      if (resp?.type === 'success') {
        const message = resp?.data?.success?.verbose
        // console.log('User deleted successfully:', message)

        // ✅ Navigate to login screen
        handleNavigate()
      } else {
        appsnackbar.showErrMsg('Something went wrong!')
      }
    } catch (error) {
      // console.log('Error delete screen get details', error)
      appsnackbar.showErrMsg('Something went wrong!')
    } finally {
      props.setModalVisible(false)
    }
  }

  return (
    <View>
      {/* Custom Modal */}
      <DialogBox
        visible={props.modalVisible}
        onClose={() => props.setModalVisible(false)}
        title="Delete Account">
        <Text
          style={{
            fontSize: fontSize.normal,
            marginBottom: 10,
            fontFamily: Fonts.Regular
          }}>
          Are you sure you want to delete your account?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            paddingVertical: 10
          }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.setModalVisible(false)}>
              <Text
                style={{
                  fontSize: fontSize.m,
                  color: 'black',
                  fontFamily: Fonts.Regular
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                handleDelete()
              }}>
              <Text
                style={{
                  fontSize: fontSize.m,
                  color: '#F55346',
                  fontFamily: Fonts.Regular
                }}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DialogBox>

      <FlatList
        data={props.settingsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // keyExtractor={(item, index) => `${valueExtractor(item)}-${index}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  renderItem: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
    marginVertical: hp(1),
    borderRadius: 12
  },
  title: {
    fontSize: fontSize.m,
    fontFamily: Fonts.Medium
  },
  subtitle: {
    color: Colors.gray_06,
    fontSize: fontSize.normal,
    fontWeight: Fonts.Regular
  }
})
