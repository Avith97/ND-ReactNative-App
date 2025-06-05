import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../../common/functions/dimensions';
import {fontSize} from '../../utils/constants/Fonts';
import Colors from '../../utils/constants/Colors';
import CustomButton from '../../common/components/buttons/CustomButton';
import {CheckBox, Input} from 'react-native-elements';
import CustomTextInput from '../../common/components/textInput/CustomTextInput';
import CustomDropdown from '../../common/components/dropdown/CustomDropdown';
import MultiSelectDropdown from '../../common/components/dropdown/MultiSelectDropdown';

export default function RegisterEventScreenUI(props) {
  const [agree, setAgree] = useState(false);

  const fieldKey = 'selectedCustomFields';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Link-style heading */}
      <TouchableOpacity>
        <Text style={styles.registerLink}>Register Here</Text>
      </TouchableOpacity>
      {/* Registration status */}
      {!props?.eventData?.isRegistrationOpen && (
        <Text style={{color: 'red', fontSize: fontSize.m}}>
          Registration Closed
        </Text>
      )}
      {/* Event status */}
      {props?.eventData?.eventState === 'DRAFT' && (
        <Text style={{color: 'orange', fontSize: fontSize.m}}>
          Registration not open Registration not open yet
        </Text>
      )}
      {props?.eventData?.eventState !== 'DRAFT' && props?.eventData?.isRegistrationOpen && (
        <>
          {/* participant type  */}
          {props?.eventData?.showParticipationType && (
            <CustomDropdown
              title={'Physical/Virtual'}
              name="participantType"
              label="Select Participation Type"
              itemData={[
                {participantType: 'Physical'},
                {
                  participantType: 'Virtual',
                },
              ]}
              onChangeText={props.handleChange}
              valueExtractor={item => item.participantType}
              labelExtractor={item => item.participantType}
            />
          )}

          {/* Activity Type */}
          <View style={{marginVertical: hp(1.5)}}>
            <CustomDropdown
              name="selectedActivity"
              title="Activity Type"
              label="Select"
              value={props?.selectedActivity?.displayName || ''}
              data={props?.eventData?.activities || []}
              onChangeText={(name, value) => props.handleChange(name, value)}
              valueExtractor={item => item}
              labelExtractor={item => item.displayName}
            />
          </View>

          {/*  secondary activity type */}

          {(props?.eventData?.showSecondaryActivityType === 'SHOW_ON_REG_INVITEE' ||
            props?.eventData?.showSecondaryActivityType === 'SHOW_ON_REG') &&
            props?.eventData?.secondaryActivityList && (
              <View>
                <Text>showSecondaryActivity</Text>

                {/* old code */}
                {/* <MultiSelectField title={'Secondary Activity Type'}
                                                items={secondaryActivityList}
                                                isRequired={false}
                                                selectedItems={secondaryActivity}
                                                onSelectedItemsChange={(e) => {
                                                    console.log(e)
                                                    setSecondaryActivity(e)
                                                }

                                                }
                                                hideTags
                                                displayKey={'name'}
                                            /> */}
              </View>
            )}
        </>
      )}
      {props?.eventData?.eventData?.showSuggestionOnRegisterEvent &&
        props?.eventData?.suggestedPoints && (
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text>Show suggestions</Text>
          </View>
        )}
      {/* show event category */}
      {props?.eventData?.showCategoryOnRegistration && (
        <View style={{marginVertical: hp(1.5)}}>
          <CustomDropdown
            name="selectedEventCategory"
            title="Event Category"
            label="Select"
            data={props?.eventData?.eventRunCategories || []}
            value={props?.selectedEventCategory?.category || ''}
            onChangeText={(name, value) => props.handleChange(name, value)}
            valueExtractor={item => item}
            labelExtractor={item => item?.category}
          />
        </View>
      )}

      {/* show runner group */}
      {props?.eventData?.showRunnerGroup && (
        <View style={{marginVertical: hp(1.5)}}>
          <MultiSelectDropdown
            name="selectedRunnerGroup"
            title="Fitness Group"
            label="Select"
            mandatory
            data={[{title: '', data: props?.eventData?.runnerGroupListDto?.data}]}
            multiSelect={false}
            value={props?.selectedRunnerGroup?.name || ''}
            onChange={(name, value) => {
              props.handleChange(name, value);
            }}
            valueExtractor={item => item}
            labelExtractor={item => item?.name || item?.groupName}
          />
        </View>
      )}

      {/* age group */}
      {props?.eventData?.showAgeGroup && (
        <View style={{marginVertical: hp(1.5)}}>
          <CustomDropdown
            name="selectedAgeGroup"
            title="Age Group"
            label="Select"
            mandatory
            data={props?.eventData?.ageGroupDTOList || []}
            value={props?.selectedAgeGroup?.groupName || ''}
            onChangeText={(name, value) => props.handleChange(name, value)}
            valueExtractor={item => item}
            labelExtractor={item => item?.groupName}
          />
        </View>
      )}

      {/* display increment => hold */}
      {/* show brief text => hold */}
      {/* show event description */}

      {/* customFields  */}
      {props?.eventData?.fields?.customFields?.length > 0 && (
        <View>
          {props?.eventData?.fields?.customFields?.map((groupField, index) => (
            <View>
              {groupField?.fieldType?.name === 'TEXT' ||
              groupField?.fieldType?.name === 'NUMBER' ? (
                <View style={{marginVertical: hp(1.5)}}>
                  <CustomTextInput
                    label={groupField?.displayName}
                    name={fieldKey}
                    mandatory
                    inputStyle={styles.textInputStyle}
                    onChangeText={(name, value) =>
                      props.handleChange(
                        name,
                        {value, fieldId: groupField?.customFieldId},
                        index,
                      )
                    }
                    inputProps={{
                      value: props?.selectedCustomFields?.[index]?.displayName,
                      placeholder: `Enter ${groupField?.displayName}`,
                    }}
                  />
                </View>
              ) : groupField?.fieldType?.name === 'SINGLE_SELECT' ? (
                <View style={{marginVertical: hp(1.5)}}>
                  <MultiSelectDropdown
                    name={fieldKey}
                    title={groupField?.displayName || ''}
                    onChange={(name, value) => {
                      console.log(name);
                      props.handleChange(
                        name,
                        {...value, fieldId: groupField?.customFieldId},
                        index,
                      );
                    }}
                    label="Select"
                    mandatory
                    data={[{title: '', data: groupField?.fieldOptions || []}]}
                    multiSelect={false}
                    value={props?.setSingleSelectCustom?.optionValue || ''}
                    valueExtractor={item => item}
                    labelExtractor={item =>
                      item?.optionValue || item?.groupName
                    }
                  />
                </View>
              ) : (
                <View style={{marginVertical: hp(1.5)}}>
                  <MultiSelectDropdown
                    name={fieldKey}
                    title={groupField?.displayName || ''}
                    label="Select"
                    onChange={(name, value) =>
                      props.handleChange(
                        name,
                        {...value, fieldId: groupField?.customFieldId},
                        index,
                      )
                    }
                    //
                    data={
                      [{title: '', data: groupField?.fieldOptions || []}] || []
                    }
                    multiSelect={true}
                    // value={props?.eventData?.selectedCustomFields?.optionValue || ''}
                    valueExtractor={item => item}
                    labelExtractor={item =>
                      item?.optionValue || item?.groupName
                    }
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Terms checkbox */}
      <View style={styles.checkboxRow}>
        <CheckBox
          checkedColor={Colors.primary}
          uncheckedColor={Colors.primary}
          checked={props?.isTermsAndCondition}
          onPress={() =>
            props.handleChange(
              'isTermsAndCondition',
              !props?.isTermsAndCondition,
            )
          }
        />
        <Text style={styles.termsText}>
          Agree to the all terms & conditions
        </Text>
      </View>
      {/* Buttons */}
      <CustomButton
        title="Continue"
        btnStyles={styles.primaryBtn}
        onPress={props.handleSubmit}
      />
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
    marginBottom: hp(1),
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
    marginVertical: hp(1),
  },
  termsText: {
    marginLeft: wp(0),
    fontSize: fontSize.normal,
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
