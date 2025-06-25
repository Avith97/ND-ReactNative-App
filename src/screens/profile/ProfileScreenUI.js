import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Icon } from 'react-native-elements'
import { hp } from '../../common/functions/dimensions'
import CustomButton from '../../common/components/buttons/CustomButton'
import { FlatList } from 'react-native-gesture-handler'
import { fontSize } from '../../utils/constants/Fonts'
import { maskNumber } from '../../common/functions/masknumber'
import Strings from '../../utils/constants/Strings'
import { BASE_URL } from '../../utils/constants/Urls'

export default function ProfileScreenUI(props) {
  const settingsData = [
    {
      id: '1',
      icon: 'user',
      label: 'Profile Settings',
      link: Strings.NAVIGATION.editprofile
    },
    // {
    //   id: '2',
    //   icon: 'bell',
    //   label: 'Notification Settings',
    //   link: Strings.NAVIGATION.notificationsetting,
    // },
    {
      id: '3',
      icon: 'sliders',
      label: 'General Settings',
      link: Strings.NAVIGATION.generalsetting
    },
    {
      id: '4',
      icon: 'link',
      label: 'Activity Sync',
      link: Strings.NAVIGATION.activitysync
    },
    {
      id: '5',
      icon: 'file-text',
      label: 'Terms & Conditions',
      link: Strings.NAVIGATION.terms_condition
    },
    {
      id: '6',
      icon: 'file-text',
      label: 'Privacy Policy',
      link: Strings.NAVIGATION.privacy_policy
    },
    {
      id: '7',
      icon: 'help-circle',
      label: 'Support',
      link: Strings.NAVIGATION.customer_support
    },
    { id: '8', icon: 'help-circle', label: 'Logout', link: 'logout' }
  ]

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0
    const isLast = index === settingsData.length - 1

    return (
      <TouchableOpacity
        style={[
          styles.item,
          isFirst && styles.firstItem,
          isLast && styles.lastItem,
          !isLast && styles.withBorder
        ]}
        onPress={() => props.handleNavigate(item.link)}>
        <View style={styles.row}>
          {/* <Icon name={item.icon} size={20} color="#000" /> */}
          <Text style={styles.label}>{item.label}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#000" />
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <Avatar
          rounded
          size={'xlarge'}
          // source={{
          //   uri: props?.AvatarURl
          //     ? props?.AvatarURl
          //     : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
          // }}

          source={{
            // uri: "https://192.168.1.49:8443/Profile%20Photos/runner_3675/profilePhoto-20250619_125550-1-.jpeg"
            // uri:"https://192.168.1.49:8443/Profile%20Photos/runner_3675/profilePhoto-20250620_035514-1-.jpeg"
            uri:
              BASE_URL.replace('/api/v1/', '/') +
              props?.userDetails?.profilePictureLink
          }}
          avatarStyle={styles.avatarImage}
          //   avatarStyle={{shadowOffset: {width: 10, height: 10}}}
        >
          <Avatar.Accessory
            size={hp(4)}
            onPress={() => props?.handleUploadImage()}
            iconProps={{
              name: 'edit',
              size: hp(2),
              color: 'black',
              backgroundColor: 'red'
            }}
            style={styles.accessoryStyle}
          />
        </Avatar>

        {(props?.userDetails?.user?.firstName ||
          props?.userDetails?.user?.lastName) && (
          <Text
            style={
              styles.title
            }>{`${props?.userDetails?.user?.firstName} ${props?.userDetails?.user?.lastName}`}</Text>
        )}
        {props?.userDetails?.user?.contactNumber && (
          <Text style={styles.numberText}>
            {maskNumber(props?.userDetails?.user?.contactNumber)}
          </Text>
        )}
        {props?.userDetails && (
          <Text style={styles.emailText}>
            {props?.userDetails?.user?.email}
          </Text>
        )}
        <CustomButton title="Check BMI Score" onPress={props?.handleNavigate} />
      </View>

      <View style={{ marginTop: hp(2) }}>
        <FlatList
          data={settingsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: 600,
    paddingVertical: 6
  },
  numberText: {
    fontSize: fontSize.normal,
    fontWeight: 600
  },
  emailText: {
    fontSize: fontSize.normal,
    paddingVertical: 8
  },
  listContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10
  },
  item: {
    backgroundColor: '#79777714',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  firstItem: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  lastItem: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginLeft: 12,
    fontSize: fontSize.md,
    color: '#000',
    fontWeight: 600
  }
})
