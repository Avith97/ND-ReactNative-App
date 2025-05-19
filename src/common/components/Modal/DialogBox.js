import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

const DialogBox = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: 350,
    padding: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DialogBox;
