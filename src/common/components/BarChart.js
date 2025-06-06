import React from 'react'
import { View, Dimensions } from 'react-native'
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryTooltip
} from 'victory-native'

const BarChart = ({
  data,
  xKey,
  yKeys,
  chartWidth,
  chartHeight,
  barWidth = 20,
  colorScale = ['tomato', 'blue', 'green', 'orange'],
  xAxisLabel = '',
  yAxisLabel = '',
  showLegend = true,
  showDataLabels = true
}) => {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const isMultiple = Array.isArray(yKeys) && yKeys.length > 1

  const parsedData = data.map(item => {
    let parsedItem = { ...item }
    yKeys.forEach(key => {
      parsedItem[key] = parseFloat(item[key])
    })
    return parsedItem
  })

  return (
    <View
      style={{
        flex: 1,
        width: chartWidth || screenWidth,
        height: chartHeight || screenHeight / 2,
        paddingBottom: 40,
        marginBottom: 20
      }}>
      <VictoryChart
        domainPadding={{ x: isMultiple ? 60 : 40 }}
        theme={VictoryTheme.material}
        width={chartWidth || screenWidth}
        height={chartHeight || screenHeight / 2}>
        {showLegend && isMultiple && (
          <VictoryLegend
            x={50}
            y={10}
            orientation="horizontal"
            gutter={20}
            data={yKeys.map((key, index) => ({
              name: key,
              symbol: { fill: colorScale[index % colorScale.length] }
            }))}
          />
        )}

        <VictoryAxis
          label={xAxisLabel}
          style={{
            axisLabel: { padding: 30 },
            tickLabels: { padding: 10, angle: -30 }
          }}
        />
        <VictoryAxis
          dependentAxis
          label={yAxisLabel}
          style={{ axisLabel: { padding: 40 }, tickLabels: { padding: 5 } }}
        />

        {isMultiple ? (
          <VictoryGroup offset={barWidth * 1.5} colorScale={colorScale}>
            {yKeys.map((key, index) => (
              <VictoryBar
                key={index}
                data={parsedData}
                x={xKey}
                y={key}
                barWidth={barWidth}
                labels={({ datum }) => (showDataLabels ? datum[key] : '')}
                labelComponent={<VictoryTooltip />}
              />
            ))}
          </VictoryGroup>
        ) : (
          <VictoryBar
            data={parsedData}
            x={xKey}
            y={yKeys[0]}
            barWidth={barWidth}
            labels={({ datum }) => (showDataLabels ? datum[yKeys[0]] : '')}
            labelComponent={<VictoryTooltip />}
          />
        )}
      </VictoryChart>
    </View>
  )
}

export default BarChart
