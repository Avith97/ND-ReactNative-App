// React core +  react native components
import {
 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';

// Utils function Dimensions
import {hp, wp} from '../../../common/functions/dimensions';

// Define all static labels in a constants object
import {en as LABELS} from '../../../utils/labels/en';

export default function BellyConditionScreenUI(props) {
  const [selectedBelly, setSelectedBelly] = useState(null);

  return (
    <View style={props.childContainerStyle}>
      <View style={styles.ContentContainer}>
        {/* === Belly Condition Section === */}
        <Text style={[styles.heading]}>{LABELS.bellyConditionHeading}</Text>
        <Text style={styles.subText}>{LABELS.bellyConditionSubText}</Text>

        <View style={styles.bellyGrid}>
          {props?.bellyOptions.map((belly, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => props.handleChange('selectedBelly', belly)}
              style={[
                styles.bellyBox,
                props.selectedBelly?.title === belly.title &&
                  styles.bellySelected,
              ]}>
              <Image
                source={belly.ImageUrl}
                style={{width: wp(35), height: hp(15), borderRadius: 10}}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  ContentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  heading: {fontSize: 20, fontWeight: 'bold', marginTop: 20},
  subText: {fontSize: 14, color: '#666', marginBottom: 15},
  continueBtn: {
    backgroundColor: '#BFFF00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bellyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  bellyBox: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    // justifyContent: 'center',
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
  },
  bellySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
});
