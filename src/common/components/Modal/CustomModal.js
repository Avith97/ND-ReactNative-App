import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const CustomModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Handle Android back button
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Render the children passed from the parent */}
          {children}
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Transparent background overlay
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center'
  },
  closeButton: {
    marginTop: 20
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default CustomModal
