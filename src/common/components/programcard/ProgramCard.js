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
  duration,
  calories,
  image,
  status,
  minWidth,
  ...props
}) => {
  return (
    <TouchableOpacity style={{...styles.card, width: minWidth}}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.statusTag}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <CustomButton
          title={'Register Here'}
          name={''}
          onPress={props?.handleSubmit}
          btnStyles={{
            ...styles.btnStyles,
            elevation: 5,
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
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: 160,
    padding: 10,
    justifyContent: 'space-between',
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
