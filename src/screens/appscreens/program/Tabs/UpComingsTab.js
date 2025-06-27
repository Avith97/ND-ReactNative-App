// react native components
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// constants utils
import { fontSize } from '../../../../utils/constants/Fonts'

import Colors from '../../../../utils/constants/Colors'

// common components
import ProgramCard from '../../../../common/components/programcard/ProgramCard'
import { hp } from '../../../../common/functions/dimensions'
import Strings from '../../../../utils/constants/Strings'
import { Images } from '../../../../utils/constants/Images'
import NoDataFound from '../../../../common/components/nodatafound/NoDataFound'
import { en } from '../../../../utils/labels/en'

export default function UpComingsTab(props) {
  return (
    <View style={styles.programList}>
      {props?.programs?.length > 0 ? (
        props?.programs?.map((item, index) => (
          <View key={index} style={styles.cardSpacing}>
            <ProgramCard
              {...item}
              image={Images?.program_card_bg_image}
              buttonName="Register"
              minWidth={'100%'}
              handleNavigate={() => props?.handleNavigate(item)}
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
  },
  noFoundTitle: {
    fontSize: fontSize.md,
    color: Colors.gray_06,
    textAlign: 'center'
  }
})
