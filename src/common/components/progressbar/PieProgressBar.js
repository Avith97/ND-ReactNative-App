import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { VictoryPie } from 'victory-native'
import Svg from 'react-native-svg'
import Colors from '../../../utils/constants/Colors'
import { fontSize } from '../../../utils/constants/Fonts'
import Icons, { iconType } from '../../../assets/icons/Icons'

const PieProgressBar = ({
  percentage = 80,
  leaderboard = false,
  program = false
}) => {
  const completed = percentage
  const remaining = 100 - percentage

  return (
    <View style={styles.container}>
      <Svg width={200} height={200}>
        <VictoryPie
          standalone={false}
          width={200}
          height={200}
          data={[
            { x: 'Completed', y: completed },
            { x: 'Remaining', y: remaining }
          ]}
          innerRadius={70}
          cornerRadius={10}
          labels={() => null}
          colorScale={['#AFEA0D', 'gray']}
          startAngle={0}
          endAngle={360}
        />
      </Svg>
      <View style={styles.labelContainer}>
        {leaderboard ? (
          <View style={{ alignItems: 'center' }}>
            <Icons
              type={iconType.feather}
              name={'user-check'}
              size={10}
              color={Colors.primary}
            />
            <Text style={{ color: Colors.primary }}>1,37,885</Text>
            <Text
              style={{
                color: 'white',
                fontSize: fontSize.s,
                textAlign: 'center'
              }}>
              Step Walk
            </Text>
            <Text style={{ color: 'white' }}>1,60,000</Text>
          </View>
        ) : program ? (
          <View style={{ alignItems: 'center' }}>
            <Icons
              type={iconType.feather}
              name={'user-check'}
              size={10}
              color={Colors.primary}
            />
            <Text style={styles.percentageText}>{`${completed}%`}</Text>
            <Text style={{ color: Colors.primary }}>Progress</Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Icons
              type={iconType.material}
              name={'spa'}
              size={15}
              color={Colors.primary}
            />
            <Text style={styles.percentageText}>{`${completed}%`}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center'
  },
  percentageText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default PieProgressBar
