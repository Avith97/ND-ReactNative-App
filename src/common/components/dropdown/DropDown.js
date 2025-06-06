import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import ViewPropTypes from 'deprecated-react-native-prop-types'
import { wp, hp } from '../../functions/dimensions'

const Dropdown = props => {
  const {
    label,
    error,
    animationDuration,
    fontSize,
    labelFontSize,
    baseColor,
    textColor,
    itemColor,
    selectedItemColor,
    dropdownPosition,
    itemCount,
    itemPadding,
    itemTextStyle,
    dropdownOffset,
    dropdownMargins,
    data,
    value,
    containerStyle,
    overlayStyle,
    pickerStyle,
    shadeOpacity,
    valueExtractor,
    labelExtractor,
    propsExtractor,
    onChangeText,
    showTriangle,
    placeholderTextColor,
    style,
    disabled,
    title,
    name
    // ...props
  } = props

  const [isVisible, setIsVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(
    data.find(item => valueExtractor(item) === value) || null
  )
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [dropdownButtonLayout, setDropdownButtonLayout] = useState(null)
  const [drpPosition, setdrpPosition] = useState(0)
  const drpRef = useRef(null)

  const toggleDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 0 : 1,
      duration: animationDuration,
      useNativeDriver: true
    }).start(() => setIsVisible(!isVisible))
  }

  const handleSelect = (item, index) => {
    setSelectedItem(item)
    setIsVisible(false)
    onChangeText?.(name, valueExtractor(item), index, data)
  }

  const renderItem = ({ item, index }) => {
    const isSelected =
      selectedItem && valueExtractor(item) === valueExtractor(selectedItem)

    return (
      <TouchableOpacity
        style={[
          styles.item,
          { paddingVertical: itemPadding },
          isSelected && { backgroundColor: selectedItemColor }
        ]}
        onPress={() => handleSelect(item, index)}
        {...propsExtractor(item, index)}>
        <Text
          style={[
            styles.itemText,
            itemTextStyle,
            { color: isSelected ? '#fff' : itemColor }
          ]}>
          {labelExtractor(item)}
        </Text>
      </TouchableOpacity>
    )
  }

  const handleDropdownButtonLayout = event => {
    const { x, y, height } = event.nativeEvent.layout
    // console.log('myheight --->', height, x, y)
    setDropdownButtonLayout({ x, y, height })
    getPosition()
  }

  const renderAccessory = () => {
    return (
      <View style={styles.accessory}>
        <View style={styles.triangle} />
      </View>
    )
  }

  // useEffect(() => {
  //     getPosition()
  // }, [])

  useLayoutEffect(() => {
    getPosition()
  }, [isVisible])

  const getPosition = () => {
    drpRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      // console.log('Local X:', x);
      // console.log('Local Y:', y);
      // console.log('Width:', width);
      // console.log('Height:', height);
      // console.log('Page X:', pageX);
      // console.log('Page Y:', pageY);
      setdrpPosition({ x, y, width, height, pageX, pageY })
    })
  }

  return (
    <View ref={drpRef} style={[styles.container, containerStyle]}>
      {/* {title && (
                <Text style={[styles.label, { fontSize: labelFontSize, color: baseColor }]}>
                    {title}
                </Text>
            )} */}
      {/* <Label
                label={label}
                fontSize={14}
                activeFontSize={12}
                baseColor={baseColor}
                tintColor={textColor}
                errorColor="red"
                value={value}
            // labelAnimation={labelAnimation}
            // focusAnimation={labelAnimation}
            /> */}
      <TouchableOpacity
        disabled={disabled || !data?.length}
        style={{
          ...styles.dropdownButton,
          ...style
        }}
        onPress={toggleDropdown}
        onLayout={handleDropdownButtonLayout}>
        <TextInput
          numberOfLines={1}
          style={[
            styles.textInput,
            {
              fontSize: labelFontSize,
              color: selectedItem ? textColor : baseColor
            }
          ]}
          value={selectedItem ? labelExtractor(selectedItem) : ''}
          placeholder={label}
          editable={false}
          placeholderTextColor={placeholderTextColor}
        />
        {showTriangle && renderAccessory()}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {isVisible && dropdownButtonLayout && data?.length && (
        <>
          {/* <StatusBar translucent backgroundColor={`rgba(0, 0, 0, ${shadeOpacity})`} /> */}
          <Modal transparent animationType="none">
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
              <View
                style={[
                  styles.overlay,
                  { backgroundColor: `rgba(0, 0, 0, ${shadeOpacity})` },
                  overlayStyle
                ]}
              />
            </TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dropdown,
                pickerStyle,
                {
                  opacity: fadeAnim,
                  top: drpPosition.pageY + dropdownOffset.top,
                  left: drpPosition.pageX / 1 + dropdownOffset.left,
                  marginHorizontal: dropdownMargins.min,
                  maxHeight: itemCount * 40
                }
              ]}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  `${valueExtractor(item)}-${index}`
                }
              />
            </Animated.View>
          </Modal>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  textInput: {
    flex: 1
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  item: {
    paddingHorizontal: 12
  },
  itemText: {
    fontSize: 16
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4
  },
  accessory: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0, 0, 0, 0.54)',
    marginRight: wp(1)
  },
  // triangle: {
  //     width: 0,
  //     height: 0,
  //     borderLeftWidth: 6,
  //     borderRightWidth: 6,
  //     borderBottomWidth: 8,
  //     borderLeftColor: 'transparent',
  //     borderRightColor: 'transparent',
  //     borderBottomColor: 'rgba(0, 0, 0, 0.54)',
  // },
  overlay: {
    ...StyleSheet.absoluteFillObject
  }
})

// export const dropdown_default_props = {
Dropdown.defaultProps = {
  disabled: false,
  label: '',
  error: '',
  animationDuration: 225,
  fontSize: 16,
  baseColor: 'rgba(0, 0, 0, .38)',
  textColor: 'rgba(0, 0, 0, .87)',
  itemColor: 'rgba(0, 0, 0, .54)',
  selectedItemColor: 'rgba(0, 0, 0, .87)',
  placeholderTextColor: 'rgba(0, 0, 0, .38)',
  itemCount: 4,
  itemPadding: 8,
  dropdownOffset: { top: hp(5), left: 0 },
  dropdownMargins: { min: 8, max: 16 },
  data: [],
  value: '',
  shadeOpacity: 0.4,
  valueExtractor: item => item.value,
  labelExtractor: item => item.label,
  propsExtractor: () => null,
  onChangeText: () => {},
  showTriangle: true,
  style: {}
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  animationDuration: PropTypes.number,
  fontSize: PropTypes.number,
  baseColor: PropTypes.string,
  textColor: PropTypes.string,
  itemColor: PropTypes.string,
  selectedItemColor: PropTypes.string,
  itemCount: PropTypes.number,
  itemPadding: PropTypes.number,
  dropdownOffset: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number
  }),
  dropdownMargins: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  shadeOpacity: PropTypes.number,
  valueExtractor: PropTypes.func,
  labelExtractor: PropTypes.func,
  propsExtractor: PropTypes.func,
  onChangeText: PropTypes.func,
  showTriangle: PropTypes.bool,
  style: ViewPropTypes.ViewPropTypes.style,
  // style: PropTypes.object,
  placeholderTextColor: PropTypes.string
}

export default Dropdown
