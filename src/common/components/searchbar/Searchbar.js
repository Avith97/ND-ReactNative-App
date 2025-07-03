import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Colors from '../../../utils/constants/Colors'
import { hp, wp } from '../../functions/dimensions'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import Icons, { iconType } from '../../../assets/icons/Icons'

const SearchBar = props => {
  const [focused, setFocused] = useState(false)

  const drpRef = useRef(null)

  const [dropdownButtonLayout, setDropdownButtonLayout] = useState(null)
  const [drpPosition, setdrpPosition] = useState(0)

  const handleDropdownButtonLayout = event => {
    const { x, y, height } = event.nativeEvent.layout
    // console.log('myheight --->', height, x, y)
    setDropdownButtonLayout({ x, y, height })
    getPosition()
  }

  useLayoutEffect(() => {
    getPosition()
  }, [])

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

  const searchListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.resultRow}
        onPress={() => props?.handleSearchedItemPress(item)}
        activeOpacity={0.7}>
        {/* Step Icon */}
        <View style={{ marginRight: wp(2) }}>
          <Icons name="Step" size={30} color={Colors.gray_01} />
        </View>

        {/* Name and Bib */}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.bibText}>Bib: {item.bibNumber}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      {props.label && (
        <Text style={{ ...styles.label, ...props?.labelStyle }}>
          {props?.label}
          {props?.mandatory && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      )}

      <View
        ref={drpRef}
        style={[
          styles.inputWrapper,
          focused && {
            borderColor: Colors.primary,
            borderWidth: 2,
            borderRadius: 6
          },
          // props.wrapperStyle,
          {
            backgroundColor: '#FFFAEB'
          }
        ]}>
        <Icons
          name="search"
          type={iconType?.material}
          size={23}
          color={Colors.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.textInputStyle,
            { paddingLeft: wp(9) },
            props.inputStyle
          ]}
          placeholderTextColor={Colors.gray}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={text => props?.onChangeText?.(props.name, text)}
          onLayout={handleDropdownButtonLayout}
          {...props?.inputProps}
        />
      </View>

      {/* search result  */}
      {props?.searchResultData?.length > 0 && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            maxHeight: hp(40),
            minHeight: hp(21),
            width: wp(90),
            position: 'absolute',
            // top:hp,
            top: drpPosition.y + hp(6),
            //   left: drpPosition.pageX / 1 ,
            zIndex: 1
          }}>
          <View style={{ marginTop: hp(2), zIndex: 1 }}>
            <FlatList
              data={props.searchResultData}
              keyExtractor={(item, index) =>
                item.runnerId?.toString() || index.toString()
              }
              ItemSeparatorComponent={() => <View style={{ height: hp(1) }} />}
              contentContainerStyle={{ paddingHorizontal: wp(1.5) }}
              renderItem={searchListItem}
            />
          </View>
        </View>
      )}
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.normal,
    marginBottom: hp(0.5)
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 0,
    borderColor: 'grey',
    borderRadius: 6,
    backgroundColor: 'white'
  },
  textInputStyle: {
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3),
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular,
    color: '#000'
  },
  searchIcon: {
    position: 'absolute',
    top: '28%',
    left: wp(3),
    zIndex: 1
  },

  /// search result list view
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp(2),
    backgroundColor: '#F4F4F4',
    borderRadius: 8
    // marginBottom: 8
  },
  textContainer: {
    flexDirection: 'column'
  },
  nameText: {
    fontSize: fontSize.normal,
    // fontWeight: '600',
    fontFamily: Fonts.Regular,
    color: '#333'
  },
  bibText: {
    fontSize: fontSize.s,
    // fontWeight: '600',
    fontFamily: Fonts.Regular,
    color: '#666'
  }
})
