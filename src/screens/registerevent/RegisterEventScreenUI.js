import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    
  } from 'react-native';
  import React, {useState} from 'react';
  import {hp, wp} from '../../common/functions/dimensions';
  import {fontSize} from '../../utils/constants/Fonts';
  import Colors from '../../utils/constants/Colors';
  import CustomButton from '../../common/components/buttons/CustomButton';
import { CheckBox } from 'react-native-elements';
  
  export default function RegisterEventScreenUI(props) {
    const [agree, setAgree] = useState(false);
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Link-style heading */}
        <TouchableOpacity>
          <Text style={styles.registerLink}>Register Here</Text>
        </TouchableOpacity>
  
        {/* Input Fields */}
        {Array.from({length: 4}).map((_, index) => (
          <View key={index} style={styles.inputGroup}>
            <Text style={styles.label}>Label</Text>
            <TextInput style={styles.input} placeholder="Input" />
          </View>
        ))}
  
        {/* Terms checkbox */}
        <View style={styles.checkboxRow}>
          <CheckBox value={agree} onValueChange={setAgree} />
          <Text style={styles.termsText}>
            Agree to the all terms & conditions
          </Text>
        </View>
  
        {/* Buttons */}
        <CustomButton title="Continue" btnStyles={styles.primaryBtn} onPress={props.handleNavigate} />
        <CustomButton title="Cancel" btnStyles={styles.secondaryBtn} />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: wp(5),
      backgroundColor: Colors.white,
      flexGrow: 1,
    },
    registerLink: {
    //   color: 'blue',
    //   textDecorationLine: 'underline',
      marginBottom: hp(2),
      fontSize: fontSize.l,
    },
    inputGroup: {
      marginBottom: hp(2),
    },
    label: {
      fontSize: fontSize.s,
      marginBottom: hp(0.5),
      color: '#555',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.2),
      fontSize: fontSize.normal,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: hp(2),
    },
    termsText: {
      marginLeft: wp(0),
      fontSize: fontSize.s,
      color: '#333',
    },
    primaryBtn: {
      backgroundColor: '#C3E458',
      marginBottom: hp(2),
      paddingVertical: hp(1.5),
    },
    secondaryBtn: {
      backgroundColor: '#C3E458',
      paddingVertical: hp(1.5),
    },
  });
  