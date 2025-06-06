import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { hp, wp } from '../../functions/dimensions' // Adjust if you use another method for responsive units
import Icons, { iconType } from '../../../assets/icons/Icons'
import CustomButton from '../buttons/CustomButton'
import Strings from '../../../utils/constants/Strings'

const NotRespondingCard = ({ onClose, handleNavigate }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <Icons
          name="close"
          size={16}
          type={iconType.material}
          color="#C2BEBE"
        />
      </TouchableOpacity>

      <Text style={styles.messageText}>
        It’s not too late to boost your wellbeing. Submit response for today!
      </Text>

      <CustomButton
        title="Submit Response"
        name={Strings.NAVIGATION.submitresponse}
        btnStyles={{
          ...styles.submitButton,
          elevation: 5
        }}
        onPress={handleNavigate}
        btnTitleStyles={styles.submitText}
      />
    </View>
  )
}

export default NotRespondingCard

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FDECE6',
    borderRadius: 12,
    padding: 16,
    marginVertical: hp(2),
    position: 'relative',
    flexDirection: 'column',
    gap: 12
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4
  },
  messageText: {
    color: '#E17B73',
    fontSize: 14,
    fontWeight: '500'
  },
  submitButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#E17B73',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13
  }
})
