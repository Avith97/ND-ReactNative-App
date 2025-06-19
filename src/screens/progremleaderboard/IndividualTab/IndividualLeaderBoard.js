import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IndividualLeaderBoardUI from './IndividualLeaderBoardUI'
import axios from 'axios'
import { TemplateService } from '../../../services/templates/TemplateService'
import { URL } from '../../../utils/constants/Urls'
import { services } from '../../../services/axios/services'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

export default function IndividualLeaderBoard(props) {
  let { eventData } = useSelector(store => store)

  const [state, setState] = useState({
    selectedTab: 'Male',
    MaleParticipant: null,
    FemaleParticipant: null
  })

  let isFocused = useIsFocused()

  const [options] = useState({
    tabs: [
      { id: 0, title: 'Male' },
      { id: 1, title: 'Female' }
    ]
  })

  useEffect(() => {
    InitiateScreen()
  }, [
    isFocused,
    props?.filters?.selectedWeek?.toDate,
    props?.filters?.selectedWeek?.fromDate,
    props?.filters?.selectLimit?.value,
    props?.filters?.activity,
    props?.filters?.category,
    props?.selectedCategory?.id
  ])

  async function formatData(data = []) {
    return data?.map((item, index) => ({
      id: item.runnerId?.toString() || index.toString(),
      name: `${item.firstName} ${item.lastName || ''}`.trim(),
      score: item.totalSteps || 0,
      backgroundColor:
        index % 3 === 0 ? '#E6F7FF' : index % 3 === 1 ? '#FFECE6' : '#FFF7E6',
      avatar: item.profileLink
        ? `https://192.168.1.49:8443/${item.profileLink}`
        : 'https://img.icons8.com/3d-fluency/94/user-male-circle.png'
    }))
  }

  async function InitiateScreen() {
    const res = await getIndividualDetail()

    const male = await formatData(res?.particiapants?.[0]?.maleActivities)
    const female = await formatData(res?.particiapants?.[0]?.femaleActivities)

    setState(prev => ({
      ...prev,
      MaleParticipant: male,
      FemaleParticipant: female
    }))
  }

  async function getIndividualDetail() {
    try {
      // /public/leaderboard
      let url = TemplateService._eventID(
        URL?.get_individual_url,
        props?.eventID
      )

      const resp = await services._get(url, {
        params: {
          activity:
            props?.filters?.activity?.type ||
            props?.selectedActivity?.type ||
            eventData?.program?.result?.activityList?.[0]?.subActivityType ||
            'STEPS',
          categoryId:
            props?.filters?.category?.id || props?.selectedCategory?.id || 4417,
          activityPriority: 'PRIMARY',
          ...(props?.filters?.selectedWeek?.fromDate && {
            fromDate: props?.filters.selectedWeek?.fromDate
          }),
          ...(props?.filters?.selectedWeek?.toDate && {
            toDate: props?.filters?.selectedWeek?.toDate
          }),
          ...(props?.filters?.selectLimit?.value && {
            limit: props?.filters?.selectLimit.value
          })
        }
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

  const onTabChange = tab => {
    setState(prev => ({ ...prev, selectedTab: tab }))
  }

  return (
    <View style={styles.container}>
      <IndividualLeaderBoardUI
        {...options}
        {...state}
        data={
          state?.selectedTab?.title === 'Female'
            ? state.FemaleParticipant
            : state?.MaleParticipant
        }
        onTabChange={onTabChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
