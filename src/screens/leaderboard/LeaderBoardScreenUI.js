import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import { iconType } from '../../assets/icons/Icons'
import { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import { hp, wp } from '../../common/functions/dimensions'
import { Avatar } from 'react-native-elements'

export default function LeaderBoardScreenUI() {
  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom:hp(1.5)}}>
        <CustomTextInput
          name={'firstname'}
          inputStyle={{...styles.textInputStyle}}
          // onChangeText={props?.handleChange}
          inputProps={{
            // flex: 1,
            //   value: props.firstname,
            placeholder: 'Name / BIB no.',
          }}
          leftIcon={{
            type: iconType.feather,
            name: 'search',
            size: fontSize.l,
            color: Colors.red,
          }}
        />
      </View>

      <View style={styles.userCard}>

      <Avatar
          rounded
          size={'large'}
          source={{
            uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp',
          }}
          avatarStyle={styles.avatarImage}>
        
        </Avatar>
        <View>
        <Text style={styles.nameTitle}>Lakhan Mahadu Nemane</Text>
        <Text>BIB no: 1628</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    userCard:{
        backgroundColor:"#BCD64E2B",
        paddingVertical:hp(1),
        paddingHorizontal:wp(3),
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    nameTitle:{
        fontSize:fontSize.md,
        fontWeight:600
    }
})