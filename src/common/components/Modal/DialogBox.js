import React from 'react'
import { Modal, View, StyleSheet, Text } from 'react-native'
import { wp } from '../../functions/dimensions'

const DialogBox = ({ visible, onClose, children, title }) => {
  if (!visible) return null

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  dialog: {
    width: wp(90),
    // padding: 10,
    paddingHorizontal: wp(10),
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#ccc',
    borderRadius: 50
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default DialogBox
