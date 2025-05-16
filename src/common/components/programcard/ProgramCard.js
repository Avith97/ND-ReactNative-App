import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {fontSize} from '../../../utils/constants/Fonts';
import CustomButton from '../buttons/CustomButton';
import {hp, wp} from '../../functions/dimensions';
import Colors from '../../../utils/constants/Colors';

const ProgramCard = ({
  title,
  duration = '20 min',
  calories = 332,
  image,
  status,
  minWidth,
  registered,
  program,

  ...props
}) => {
  return (
    <TouchableOpacity style={{...styles.card, width: minWidth}}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.gradientOverlay} />
        <View
          style={{
            ...styles.statusTag,
            backgroundColor: !registered ? '#EC6B47AB' : Colors.primary,
          }}>
          <Text style={styles.statusText}>
            {registered ? 'Not yet started' : 'Not Registered'}
          </Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <CustomButton
          title={registered ? 'View Detail' : 'Register Now'}
          name={'register'}
          onPress={() => props?.handleNavigate(program, registered)}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
            backgroundColor: Colors.primary,
          }}
          btnTitleStyles={{
            ...styles.textStyle,
          }}
        />

        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>⏱ {duration}</Text>
          <Text style={styles.detailText}>🔥 {calories} Kcal</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(100),
    // marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: hp(20),
    padding: 10,
    justifyContent: 'space-between',
    resizeMode: 'contain',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // dark overlay
  },

  imageStyle: {
    borderRadius: 12,
  },
  statusTag: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.app_primary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusText: {
    fontSize: fontSize.normal,
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  btnStyles: {
    width: wp(4),
    height: hp(4.5),
    borderRadius: 8,
  },

  detailsRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 5,
    gap: 10,
  },
  detailText: {
    color: '#fff',
    fontSize: fontSize.normal,
  },
});

export default ProgramCard;
