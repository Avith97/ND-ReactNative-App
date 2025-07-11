import { FlatList, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TeamTabUI from './TeamTabUI'
import { appsnackbar } from '../../../common/functions/snackbar_actions'
import axios from 'axios'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { TemplateService } from '../../../services/templates/TemplateService'
import { URL } from '../../../utils/constants/Urls'
import { services } from '../../../services/axios/services'
import { hp, wp } from '../../../common/functions/dimensions'
import Colors from '../../../utils/constants/Colors'

export default function TeamTab({ ...props }) {
  const [state, setState] = useState({
    teamsData: null
  })
  const [expandedTeamId, setExpandedTeamId] = useState(null)

  const [teamParticipant, setTeamParticipant] = useState()

  useEffect(() => {
    InitiateScreen()
  }, [props?.filters])

  async function InitiateScreen() {
    let resp = await getAllTeams()

    if (resp) {
      setState({ ...state, teamsData: resp?.teamDetails })
    }
  }

  async function getAllTeams(params) {
    try {
      // url
      let url = TemplateService?._eventID(
        URL.get_teams_url,
        props?.eventID || 2477
      )

      // API request for fetch ALl teams
      const response = await services._get(url, {
        params: { view: 'TEAMS', limit: props?.filters?.selectLimit?.value }
      })

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
      const programId = props?.eventID

      // API request for fetch single teams
      const response = await services._get(
        `${URL.get_single_team}/${programId}/${teamId}?leaderboard=true&teamId=${teamId}`
      )

      if (response?.type === 'success') {
        setTeamParticipant(response.data)
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
      <TeamTabUI
        title={item.teamName}
        data={teamParticipant?.teamMemberActivities} // should be loaded or default to []
        rank={item.teamRank}
        score={item.teamTotalSteps}
        backgroundColor={backgroundColor}
        expanded={expandedTeamId === item.id}
        onToggle={() => handleToggle(item.id)}
      />
    )
  }

  return (
    <>
      <Text style={{ fontSize: fontSize.m, fontFamily: Fonts.Medium }}>
        Teams Leaderboard
      </Text>
      {state?.teamsData?.length ? (
        <FlatList
          data={state?.teamsData || []}
          renderItem={renderTeam}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp(1.5) }}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: hp(2),
            color: Colors?.gray_05,
            fontFamily: Fonts.Regular
          }}>
          No teams data found
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
