import { FlatList, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appsnackbar } from '../../../common/functions/snackbar_actions'
import axios from 'axios'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'
import { TemplateService } from '../../../services/templates/TemplateService'
import { URL } from '../../../utils/constants/Urls'
import { services } from '../../../services/axios/services'
import AgeGroupTabUI from './AgeGroupTabUI'
import { wp } from '../../../common/functions/dimensions'

export default function AgeGroupTab({ ...props }) {
  const [state, setState] = useState({
    ageGroupData:null
  })
  const [expandedTeamId, setExpandedTeamId] = useState(null)

  
    useEffect(() => {
      InitiateScreen()
    }, [])
  
    async function InitiateScreen() {
      let resp = await getAgeWiseData()
  console.log(resp , "getting me dta");
  
      if (resp) {
        setState({ ...state, ageGroupData: resp })
      }
    }
  
    async function getAgeWiseData(params) {
      try {
  
        // url
        let url = TemplateService?._eventID(
          URL.get_age_wise_data,
          props?.eventData?.id || 2477
        )
  
        // API request for fetch ALl teams
        const response = await services._get(url, { params: {view:"AGE_GROUPS"  } })
        
        if (response?.type === 'success') {
          return response?.data
        } else {
          appsnackbar.showErrMsg("Something went wrong!")
          
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
        return []
      }
    }
  

  //   here I getting me team details
  async function handleToggle(teamId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    setExpandedTeamId(prev => (prev === teamId ? null : teamId))
  }

  const renderTeam = ({ item, index }) => {
    const backgroundColors = ['#E5F9FF', '#FFEDE5', '#FFFAEB']
    const backgroundColor = backgroundColors[index % 2]

    return (
      <>
        <AgeGroupTabUI
          title={item.groupName}
          data={item?.participantsDto} // should be loaded or default to []
          rank={item.teamRank}
          totalSteps={item.teamTotalDistance}
          backgroundColor={backgroundColor}
          expanded={expandedTeamId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      </>
    )
  }

  return (
    <>
      <Text style={{ fontSize: fontSize.m, fontFamily: Fonts.Medium }}>
        Age Group Leaderboard
      </Text>
      <FlatList
        data={state?.ageGroupData?.ageGroupDTOs || []}
        renderItem={renderTeam}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:wp(1.5)}}
      />

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
