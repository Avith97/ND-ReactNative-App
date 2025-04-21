import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import Svg from 'react-native-svg';

const PieProgressBar = ({ percentage = 80 }) => {
  const completed = percentage;
  const remaining = 100 - percentage;

  return (
    <View style={styles.container}>
      <Svg width={230} height={230}>
        <VictoryPie
          standalone={false}
          width={230}
          height={230}
          data={[
            { x: 'Completed', y: completed },
            { x: 'Remaining', y: remaining },
          ]}
          innerRadius={48}
          cornerRadius={20}
          labels={() => null}
          colorScale={['#AFEA0D', 'gray']}
          startAngle={0}
          endAngle={360}
        />
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={styles.percentageText}>{`${completed}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    color: "white",
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    color: "white",
    fontWeight: 'bold',
  },
});

export default PieProgressBar;