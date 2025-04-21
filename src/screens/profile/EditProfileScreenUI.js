import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-elements';
import CustomButton from '../../common/components/buttons/CustomButton';
import {hp, wp} from '../../common/functions/dimensions';
import {maskNumber} from '../../common/functions/masknumber';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';

export default function EditProfileScreenUI(props) {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Avatar
          rounded
          size={'xlarge'}
          source={{
            uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
          }}
          avatarStyle={styles.avatarImage}
          //   avatarStyle={{shadowOffset: {width: 10, height: 10}}}
        >
          <Avatar.Accessory
            size={hp(4)}
            onPress={() => console.log('clicked on profile pic')}
            iconProps={{
              name: 'edit',
              size: hp(2),
              color: 'black',
              backgroundColor: 'red',
            }}
            style={styles.accessoryStyle}
          />
        </Avatar>

        <Text style={styles.title}>Lakhan Nemane</Text>
        <Text style={styles.numberText}>{maskNumber(9834201623)}</Text>
        <Text style={styles.emailText}>lnemane7@gmail.com</Text>
      </View>

      {/* form  */}
      <View>
        <ScrollView>
          <View style={{marginVertical: hp(1.5) }}>
            <CustomTextInput
              label="First name"
              name={'firstName'}
              mandatory
              inputStyle={{...styles.textInputStyle}}
              onChangeText={props.handleChange}
            />

            <CustomTextInput
              label="First name"
              name={'firstName'}
              mandatory
              inputStyle={{...styles.textInputStyle}}
              onChangeText={props.handleChange}
            />
          </View>

          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: wp(45),
  },
});
