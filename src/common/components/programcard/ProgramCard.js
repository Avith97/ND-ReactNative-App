import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import CustomButton from '../buttons/CustomButton'
import { hp, wp } from '../../functions/dimensions'
import Colors from '../../../utils/constants/Colors'
import Icons, { iconType } from '../../../assets/icons/Icons'
import { Images } from '../../../utils/constants/Images'

const ProgramCard = ({
  title,
  duration = '20 min',
  calories = 332,
  image,
  status,
  minWidth,
  registered,
  program,
  buttonName,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...styles.card, width: minWidth }}>
      <ImageBackground
        source={image || Images.program_card_bg_image}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <View style={styles.gradientOverlay} />
        <View
          style={{
            ...styles.statusTag,
            backgroundColor:
              // props.eventStatus === 'Not Started Yet'
              //   ? '#AFEA0DB2'
              // :
              props.eventStatus === 'Completed' || buttonName === 'Register'
                ? '#EC6B47AB'
                : Colors.primary
          }}>
          <Text style={styles.statusText}>
            {buttonName === 'Register' ? 'Not Register' : props.eventStatus}
          </Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <CustomButton
          title={buttonName}
          name={'register'}
          onPress={() => props?.handleNavigate(program, registered)}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
            backgroundColor: Colors.primary
          }}
          btnTitleStyles={{
            ...styles.textStyle
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            width: wp(90),
            gap: 10,
            alignItems: 'center'
          }}>
          <Icons
            name={'calendar-o'}
            type={iconType.fa}
            size={14}
            color="#D9D9D9"
          />
          <Text style={{ color: '#D9D9D9', fontFamily: Fonts.Italic }}>
            {props.localStartDate} - {props.localEndDate}{' '}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          {/* <Text style={styles.detailText}>⏱ {duration}</Text> */}
          {/* <Text style={styles.detailText}>🔥 {calories} Kcal</Text> */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: wp(100),
    // marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden'
  },
  image: {
    height: hp(20),
    padding: 10,
    justifyContent: 'space-between',
    resizeMode: 'cover'
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)' // dark overlay
  },

  imageStyle: {
    borderRadius: 12
  },
  statusTag: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.app_primary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10
  },
  statusText: {
    fontSize: fontSize.s,
    color: Colors.gray_01,
    fontFamily: Fonts.Regular
  },
  title: {
    color: '#fff',
    fontSize: fontSize.m,
    // fontWeight: 'bold'
    fontFamily: Fonts.Medium
  },
  btnStyles: {
    width: wp(4),
    height: hp(4.5),
    borderRadius: 8
  },

  detailsRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 5,
    gap: 10
  },
  detailText: {
    color: '#fff',
    fontSize: fontSize.normal,
    fontFamily: Fonts.Regular
  }
})

export default ProgramCard
