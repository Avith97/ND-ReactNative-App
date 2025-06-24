import React, {
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  forwardRef
} from 'react'
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { hp, wp } from '../../functions/dimensions'
import Icons from '../../../assets/icons/Icons'
import CustomWebView from '../webview/CustomWebView'
import {
  htmlContent,
  htmlPrivacypolicyContent
} from '../../../data/static_data/temp'

const ToastModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState([])
  const timerRef = useRef(null)
  const [timeout, settimeout] = useState(null)

  useImperativeHandle(ref, () => ({
    show: ({ data, timeout }) => {
      setModalData(data || [])
      setVisible(true)
      settimeout(timeout) // setTimeout for auto-hide enable/disable after action
      setTimer(true, timeout)
      // if (timeout) {
      //     settimeout(timeout)
      //     if (timerRef.current) clearTimeout(timerRef.current);
      //     timerRef.current = setTimeout(() => {
      //         setVisible(false);
      //     }, timeout);
      // }
    },
    hide: () => {
      setVisible(false)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }))

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const setTimer = (set, timeout) => {
    if (set && timeout) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setVisible(false)
      }, timeout)
    } else if (!set) {
      if (timerRef.current) clearTimeout(timerRef.current)
      // setVisible(false);{
    }
  }

  const handleAction = (id, action) => {
    setTimer(false)
    // console.log(Request ID: ${id}, Action: ${action});
    // Optional: remove the item from list after action
    setModalData(prev => prev.filter(item => item.id !== id))
    setTimer(true, timeout)
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      {!props.children ? (
        <>
          <CustomWebView html={htmlPrivacypolicyContent} />
          <Button title="Close" onPress={() => setVisible(false)} />
        </>
      ) : (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{props?.children}</View>
        </View>
      )}
    </Modal>
  )
})

export default ToastModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    // backgroundColor: 'red',
    padding: 16,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    minHeight: hp(43)
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  card: {
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 4
  },
  title: {
    marginLeft: wp(2),
    fontSize: 16,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 14,
    color: '#333'
  },
  module: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8
  },
  approve: {
    backgroundColor: '#4CAF50'
  },
  reject: {
    backgroundColor: '#F44336'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
