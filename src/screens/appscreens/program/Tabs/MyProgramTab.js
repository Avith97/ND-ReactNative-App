// react native imports
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// common components
import ProgramCard from '../../../../common/components/programcard/ProgramCard'

// constants utils
import { hp } from '../../../../common/functions/dimensions'
import Colors from '../../../../utils/constants/Colors'
import { Images } from '../../../../utils/constants/Images'
import NoDataFound from '../../../../common/components/nodatafound/NoDataFound'

export default function MyProgramTab(props) {
  return (
    <View style={styles.programList}>
      {props.programs?.length > 0 ? (
        props.programs.map((item, index) => (
          <View key={index} style={styles.cardSpacing}>
            <ProgramCard
              {...item}
              image={Images?.program_card_bg_image}
              minWidth={'100%'}
              handleNavigate={() => props.handleNavigate(item)}
            />
          </View>
        ))
      ) : (
        <NoDataFound />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  programList: {
    gap: hp(2) // vertical space between cards
  },
  cardSpacing: {
    width: '100%'
  }
})
