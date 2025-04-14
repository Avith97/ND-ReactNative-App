import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements';
import React from 'react'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import CustomImageBackground from '../../common/components/background/CustomImageBackground'
import { hp, wp } from '../../common/functions/dimensions'
import CustomDropdown from '../../common/components/dropdown/CustomDropdown'
import CustomButton from '../../common/components/buttons/CustomButton'
import CustomDateTimePicker from '../../common/components/datepicker/CustomDateTimePicker'

const RegistrationUI = (props) => {
    return (
        <View style={{ flex: 1, }}>
            {/* <Text>RegistrationUI</Text> */}
            <CustomImageBackground>
                <View style={{ flex: 1, width: wp(95), justifyContent: 'center' }}>
                    <View style={{ alignItems: "center" }}>
                        <Avatar
                            rounded
                            size={'xlarge'}
                            source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp' }}
                            avatarStyle={{ shadowOffset: { width: 10, height: 10 } }}
                        >
                            <Avatar.Accessory
                                size={hp(3)}
                                selectable
                                onPress={() => console.log('clicked on profile pic')}
                            // iconProps={{ name: 'edit', size: hp(3) }}
                            />
                        </Avatar>
                    </View>
                    <View style={{ marginVertical: hp(1.5), }}>
                        <CustomTextInput label="Email"
                            name={'userId'}
                            mandatory
                            onChangeText={props.handleChange}
                        />
                    </View>
                    <View style={{ marginVertical: hp(1.5), }}>
                        <CustomTextInput label="First name"
                            name={'firstName'}
                            mandatory
                            onChangeText={props.handleChange}
                        />
                    </View>
                    <View style={{ marginVertical: hp(1.5), }}>
                        <CustomTextInput label="Last name"
                            name={'lastName'}
                            mandatory
                            onChangeText={props.handleChange}
                        />
                    </View>
                    <View style={{ marginVertical: hp(1.5), }}>
                        <CustomDropdown
                            name={'gender'}
                            title="Gender"
                            label='Select'
                            mandatory
                            data={[{ gender: 'Male' }, { gender: 'Female' }, { gender: 'Other' }]}
                            onChangeText={props.handleChange}
                            valueExtractor={item => item.gender}
                            labelExtractor={item => item.gender}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: wp(25) }}>
                            <CustomDropdown
                                name={'c_num'}
                                title="Contact No"
                                label='Select'
                                mandatory
                                data={[{ country: 'IND' }, { country: 'GER' }, { country: 'USA' }]}
                                onChangeText={props.handleChange}
                                valueExtractor={item => item.country}
                                labelExtractor={item => item.country}
                            />
                        </View>
                        <View style={{ width: wp(62), marginLeft: wp(5), marginTop: hp(2.5) }}>
                            <CustomTextInput
                                name={'number'}
                                onChangeText={props.handleChange}
                                inputProps={{
                                    keyboardType: 'numeric',
                                    maxLength: 10,
                                    paddingVertical: hp(1),
                                }} />
                        </View>
                    </View>
                    <View>
                        <CustomDateTimePicker />
                    </View>
                    <View>
                        <CustomTextInput label="Postal(Zip/Pincode)"
                            name={'postal_code'}
                            mandatory
                            onChangeText={props.handleChange}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: hp(5),
                    }}>
                        <CustomButton title={'Submit'} name={'submit'} onPress={props.handleSubmit} />
                        <CustomButton title={'Cancel'} name={'cancel'} onPress={props.handleSubmit} />
                    </View>
                </View>
            </CustomImageBackground >
        </View >
    )
}

export default RegistrationUI