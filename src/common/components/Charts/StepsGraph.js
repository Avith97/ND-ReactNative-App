import React, { useState } from 'react';
import { View } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryTooltip,
} from 'victory-native';

const stepsData = {
  mySteps: [
    { x: 'MON', y: 200 },
    { x: 'TUE', y: 220 },
    { x: 'WED', y: 330 },
    { x: 'THUR', y: 250 },
    { x: 'FRI', y: 510 },
    { x: 'SAT', y: 800 },
    { x: 'SUN', y: 790 },
  ],
  maxSteps: [
    { x: 'MON', y: 300 },
    { x: 'TUE', y: 290 },
    { x: 'WED', y: 400 },
    { x: 'THUR', y: 350 },
    { x: 'FRI', y: 300 },
    { x: 'SAT', y: 700 },
    { x: 'SUN', y: 700 },
  ],
};

export default function StepsGraph() {
  const [selectedPoint, setSelectedPoint] = useState(stepsData.mySteps[0]); // Default to Monday

  return (
    <View style={{backgroundColor:"red"}}>
      <VictoryChart domainPadding={{ x: 20, y: 20 }}>
        {/* Legend */}
        <VictoryLegend
          x={0}
          y={0}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fontSize: 12 } }}
          data={[
            { name: 'My Steps', symbol: { fill: '#5A4FCF' } },
            { name: 'Max Steps of the Day', symbol: { fill: '#DA3BCF' } },
          ]}
        />

        {/* Axes */}
        <VictoryAxis style={{ tickLabels: { fontSize: 12 } }} />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 10 } }}
          tickFormat={(t) => `${t}`}
        />

        {/* My Steps Line */}
        <VictoryLine
          data={stepsData.mySteps}
          interpolation="natural"
          style={{ data: { stroke: '#5A4FCF', strokeWidth: 3 } }}
        />

        {/* Max Steps Line */}
        <VictoryLine
          data={stepsData.maxSteps}
          interpolation="natural"
          style={{ data: { stroke: '#DA3BCF', strokeWidth: 2 } }}
        />

        {/* All points with press handler */}
        <VictoryScatter
          data={stepsData.mySteps}
          size={6}
          style={{
            data: {
              fill: ({ datum }) =>
                datum.x === selectedPoint.x ? '#fff' : '#5A4FCF',
              stroke: ({ datum }) =>
                datum.x === selectedPoint.x ? '#89C500' : '#5A4FCF',
              strokeWidth: ({ datum }) => (datum.x === selectedPoint.x ? 4 : 2),
            },
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: (_, props) => {
                  const clickedDatum = props.datum;
                  setSelectedPoint(clickedDatum);
                  return [];
                },
              },
            },
          ]}
          labels={({ datum }) =>
            datum.x === selectedPoint.x ? `Steps walk\n${datum.y}` : ''
          }
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ fill: '#f5f5f5', stroke: '#ccc' }}
              style={{ fontSize: 10 }}
              activateData={true}
            />
          }
        />
      </VictoryChart>
    </View>
  );
}
