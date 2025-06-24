import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RegisterEventScreenUI from './RegisterEventScreenUI'
import Strings from '../../utils/constants/Strings'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { URL } from '../../utils/constants/Urls'
import { services } from '../../services/axios/services'
import Loader from '../../common/components/loader/Loader'
import { useSelector } from 'react-redux'
import { TemplateService } from '../../services/templates/TemplateService'

export default function RegisterEventScreen(props) {
  const [state, setState] = useState({
    eventData: null,

    // user Input
    isTermsAndCondition: false,
    selectedActivity: null,
    selectedEventCategory: null,
    selectedAgeGroup: null,
    selectedCustomFields: [],
    setMultiSelectCustom: null,
    setSingleSelectCustom: null,
    selectedRunnerGroup: null
  })

  const { eventData, auth } = useSelector(store => store)

  useEffect(() => {
    initiateScreen()
  }, [])

  async function initiateScreen() {
    let resp = await getDetails()
    if (resp) {
      // setting here response in state
      // setState(resp);
      setState({ ...state, eventData: resp })
    }
  }

  async function getDetails() {
    try {
      // join like event/2481

      let url = TemplateService?._eventID(URL.get_event, eventData?.id)
      let resp = await services?._get(url, {
        params: { requestView: 'REGISTER_EVENT' }
      })

      if (resp?.type === 'success') {
        return resp?.data
      } else
        appsnackbar.showErrMsg('Something went wrong, please try again later.')
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong, please try again later.')
      return
    }
  }

  async function handleChange(params, val, index) {
    if (params === 'cancel') {
      props.navigation.goBack()
    }
    if (index !== undefined && index !== null) {
      setState(prev => {
        const updatedArray = [...(prev[params] || [])]
        updatedArray[index] = val
        return {
          ...prev,
          [params]: updatedArray
        }
      })
    } else {
      setState({
        ...state,
        [params]: val
      })
    }
  }

  function validate(params) {
    const customFields = state?.eventData?.fields?.customFields || []
    const selectedFields = state?.selectedCustomFields || []
    let isValid = true

    // 1. Check if registration is closed
    if (!state?.eventData?.isRegistrationOpen) {
      isValid = false
      appsnackbar.showErrMsg('Registration is not open.')
      return isValid
    }

    // 2. Check if an activity is selected
    if (!state?.selectedActivity) {
      isValid = false
      appsnackbar.showErrMsg('Please select an activity.')
      return isValid
    }

    // 3. Check if event category is selected
    if (
      state?.eventData?.showCategoryOnRegistration &&
      !state?.selectedEventCategory
    ) {
      isValid = false
      appsnackbar.showErrMsg('Please select an event category.')
      return isValid
    }

    // 4. Check if age group is selected
    if (state?.eventData?.showAgeGroup && !state?.selectedAgeGroup) {
      isValid = false
      appsnackbar.showErrMsg('Please select an age group.')
      return isValid
    }

    // 5. Validate dynamic custom fields

    if (customFields.length > 0) {
      for (let i = 0; i < customFields.length; i++) {
        const field = customFields[i]
        if (!field.requiredField) continue

        const selected = selectedFields[i]

        if (!selected) {
          appsnackbar.showErrMsg(
            `Please fill required field: ${field.displayName}`
          )
          isValid = false
          return isValid
        }

        // Handle TEXT / NUMBER fields
        if (
          field.fieldType.name === 'TEXT' ||
          field.fieldType.name === 'NUMBER'
        ) {
          const val = selected?.value
          if (!val || val.trim?.() === '') {
            appsnackbar.showErrMsg(
              `Please fill required field ${field.displayName}`
            )
            isValid = false
            return isValid
          }
        }

        // Handle MULTI_SELECT fields
        else if (field.fieldType.name === 'MULTI_SELECT') {
          const options = Object.values(selected).filter(
            v => typeof v === 'object'
          )
          if (!options.length) {
            appsnackbar.showErrMsg(
              `Please select at least one option for ${field.displayName}`
            )
            isValid = false
            return isValid
          }
        }

        // Handle SINGLE_SELECT fields
        else if (field.fieldType.name === 'SINGLE_SELECT') {
          const option = selected?.[0]
          if (!option || !option.optionValue) {
            appsnackbar.showErrMsg(
              `Please select an option for ${field.displayName}`
            )
            isValid = false
            return isValid
          }
        }
      }
    }

    // 6. Check if Terms & Conditions are accepted
    if (!state?.isTermsAndCondition) {
      isValid = false
      appsnackbar.showErrMsg('Please accept the Terms and Conditions.')
      return isValid
    }

    return isValid
  }

  async function handleSubmit(params, value) {
    let isValid = validate()
    if (!isValid) return
    let transformed = []

    try {
      transformed =
        state?.selectedCustomFields?.flatMap(entry => {
          if ('value' in entry) {
            return [
              {
                fieldId: entry.fieldId,
                fieldValue: entry.value
              }
            ]
          } else {
            return Object.keys(entry)
              .filter(key => !isNaN(key))
              .map(key => ({
                fieldId: entry.fieldId,
                fieldOptionId: entry[key].id,
                fieldValue: entry[key].optionValue
              }))
          }
        }) || []
    } catch (error) {
      console.error(
        'Error during field transformation:',
        error,
        state?.selectedCustomFields
      )
    }

    let syncObj = {
      userId: auth?.id || null,
      eventId: eventData?.id || null,
      ...(state?.eventData?.showCategoryOnRegistration && {
        categoryId: state?.selectedEventCategory?.id || null
      }),
      isTermsNcondition: state?.isTermsAndCondition,
      ...(state?.eventData?.fields?.customFields?.length > 0 && {
        fieldValues: {
          runnerId: auth?.runnerId || null,
          eventId: eventData?.id || null,
          fields: transformed || []
        }
      }),
      ...(props?.eventData?.showRunnerGroup && {
        groupDetails: state?.selectedRunnerGroup?.[0],
        runnerGroup: state?.selectedRunnerGroup?.[0]?.name,
        runnerGroupCity: state?.selectedRunnerGroup?.[0]?.city
      }),
      ...(props?.eventData?.showAgeGroup && {
        ageGroupId: state?.selectedAgeGroup?.id || null
      }),
      items: [],
      employeeCode: '',
      paymentStatus: 'SUCCESS',
      paymentMode: 'NOT_APPLICABLE'
    }

    try {
      // API request
      let resp = await services._post(URL.register_event, syncObj)

      // Response Handle

      if (resp?.status === 'error') {
        appsnackbar.showErrMsg(
          resp?.error_data?.verbose || 'Something went wrong'
        )
      } else if (resp?.type === 'success') {
        appsnackbar.showSuccessMsg(
          resp?.data?.success?.verbose || 'Thank you for registering.'
        )
        props.navigation.navigate(Strings.NAVIGATION.consent, {
          isRegistered: true
        })

        return resp.data
      } else {
        appsnackbar.showErrMsg('Something went wrong, please try again later.')

        return
      }
    } catch (error) {}
  }

  return (
    <View style={{ flex: 1 }}>
      <Loader />
      <RegisterEventScreenUI
        {...state}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
