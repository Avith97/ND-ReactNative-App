import { FlatList, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RunnerGroupTabUI from './RunnerGroupTabUI'
import { appsnackbar } from '../../../common/functions/snackbar_actions'
import axios from 'axios'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { TemplateService } from '../../../services/templates/TemplateService'
import { URL } from '../../../utils/constants/Urls'
import { services } from '../../../services/axios/services'
import { wp } from '../../../common/functions/dimensions'

export default function RunnerGroupTab({ ...props }) {
  const [state, setState] = useState({
    groupData: [
      {
        runnerGroupId: 3,
        runnerGroupName: 'Runner Group 3',
        teamOrGroup: 0,
        runnerGroupDistance: 970395.8999999996,
        runnerGroupRank: 1,
        runnerGroupTotalSteps: 1898447,
        runnerGroupTotalCompletionTime: 1556678,
        runnerGroupTotalCalories: 0,
        runnerGroupTotalWellnessPoint: 0
      },
      {
        runnerGroupId: 1,
        runnerGroupName: 'Runner Group 1',
        teamOrGroup: 0,
        runnerGroupDistance: 27266.8,
        runnerGroupRank: 2,
        runnerGroupTotalSteps: 37940,
        runnerGroupTotalCompletionTime: 6206,
        runnerGroupTotalCalories: 0,
        runnerGroupTotalWellnessPoint: 0
      }
    ]
  })
  const [expandedTeamId, setExpandedTeamId] = useState(null)

  const [groupParticipant, setGroupParticipant] = useState([])

  useEffect(() => {
    InitiateScreen()
  }, [props?.filters])

  async function InitiateScreen() {
    let resp = await getAllRunnerGroupDetail()

    if (resp) {
      setState({ ...state, groupData: resp?.runnerGroupDetailsDTO })
    }
  }

  async function getAllRunnerGroupDetail(params) {
    try {
      // url
      let url = TemplateService?._eventID(
        URL.runner_group,
        props?.eventID || 2477
      )

      // API request for fetch ALl teams
      const response = await services._get(url)

      if (response?.type === 'success') {
        return response?.data
      } else {
        appsnackbar.showErrMsg('Something went wrong!')
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      return []
    }
  }

  //   here I getting me team details
  async function handleToggle(teamId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    try {
      // Replace these with actual IDs if needed

      let url = TemplateService?._eventID(
        URL.get_runner_group,
        props?.eventID || 2477
      )
      // API request for fetch single teams
      const response = await services._get(`${url}/${teamId}`)

      if (response?.type === 'success') {
        setGroupParticipant(response.data?.particiapants?.[0]?.runnerActivities)
        setExpandedTeamId(prev => (prev === teamId ? null : teamId))
      } else {
        appsnackbar.showErrMsg('Something went wrong')
      }
    } catch (error) {
      console.log('Error fetching team details ')
    }
  }

  const renderTeam = ({ item, index }) => {
    const backgroundColors = ['#E5F9FF', '#FFEDE5', '#FFFAEB']
    const backgroundColor = backgroundColors[index % 3]

    return (
      <RunnerGroupTabUI
        title={item.runnerGroupName}
        data={groupParticipant} // should be loaded or default to []
        rank={item.runnerGroupRank}
        score={item.runnerGroupTotalSteps}
        backgroundColor={backgroundColor}
        expanded={expandedTeamId === item.runnerGroupId}
        onToggle={() => handleToggle(item.runnerGroupId)}
      />
    )
  }

  return (
    <>
      <Text style={{ fontSize: fontSize.m, fontFamily: Fonts.Medium }}>
        Teams Leaderboard
      </Text>
      <FlatList
        data={state?.groupData || []}
        renderItem={renderTeam}
        keyExtractor={item => item.runnerGroupId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(1.5) }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
