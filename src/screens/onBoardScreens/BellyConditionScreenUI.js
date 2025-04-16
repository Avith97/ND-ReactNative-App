import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Strings from '../../utils/constants/Strings';
import {Images} from '../../utils/constants/Images';
import { hp, wp } from '../../common/functions/dimensions';

// Define all static labels in a constants object
const LABELS = {
  heading: 'Choose your belly condition',
  subText: 'Knowing your goals helps us tailor your experience',
  bellyOptions: [{title:'Belly 1' , ImageUrl:Images.belly1}, {title:'Belly 2' , ImageUrl:Images.belly2}, {title:'Belly 3' , ImageUrl:Images.belly3}, {title:'Belly 4' , ImageUrl:Images.belly4},{title:'Belly 5' , ImageUrl:Images.belly5}],
  continueButton: 'Continue',
  
};

export default function BellyConditionScreenUI(props) {
  const [selectedBelly, setSelectedBelly] = useState(null);

  const handleContinue = () => {
    props.navigation.navigate(Strings.NAVIGATION.exerciseType);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        {/* === Belly Condition Section === */}
        <Text style={[styles.heading]}>{LABELS.heading}</Text>
        <Text style={styles.subText}>{LABELS.subText}</Text>

        <View style={styles.bellyGrid}>
          {LABELS.bellyOptions.map((belly, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedBelly(belly)}
              style={[
                styles.bellyBox,
                selectedBelly?.title === belly.title && styles.bellySelected,
              ]}>
              <Image
                source={belly.ImageUrl}
                style={{width: wp(35), height: hp(15), borderRadius:10}}
              />
              {/* <Text style={{marginVertical:5}}>{belly.title}</Text> */}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueText}>{LABELS.continueButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
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
  continueText: {fontWeight: 'bold'},
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
    paddingVertical:8,
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
  },
  bellySelected: {
    borderColor: '#00cc00',
    backgroundColor: '#eaffea',
  },
});
