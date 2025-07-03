import React from 'react'
import { View, Dimensions } from 'react-native'
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryTooltip,
  VictoryLabel
} from 'victory-native'
import Colors from '../../../utils/constants/Colors'
import Fonts, { fontSize } from '../../../utils/constants/Fonts'

const BarChart = ({
  data,
  xKey,
  yKeys,
  chartWidth,
  chartHeight,
  barWidth = 20,
  colorScale = [],
  xAxisLabel = '',
  yAxisLabel = '',
  showLegend = true,
  showDataLabels = true,
  legendPosition = 'bottom'
}) => {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const isMultiple = Array.isArray(yKeys) && yKeys.length > 1

  const parsedData = (data || []).map(item => {
    let parsedItem = { ...item }
    yKeys.forEach(key => {
      parsedItem[key] = parseFloat(item[key])
    })
    return parsedItem
  })

  // Dynamically calculate bar width and domain padding
  const maxBars = parsedData.length * (isMultiple ? yKeys.length : 1)
  const calculatedBarWidth = Math.min(barWidth, (screenWidth - 40) / maxBars)
  const calculatedDomainPadding = Math.max(20, calculatedBarWidth * 2)

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
        domainPadding={{ x: calculatedDomainPadding }}
        theme={VictoryTheme.material}
        width={chartWidth || screenWidth}
        height={chartHeight || screenHeight / 2}>
        {showLegend && isMultiple && (
          <VictoryLegend
            x={legendPosition === 'top' ? 50 : 190}
            y={legendPosition === 'top' ? 10 : chartHeight - 20}
            orientation={legendPosition === 'top' ? 'horizontal' : 'horizontal'}
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
            axis: { stroke: 'transparent' },
            grid: { stroke: 'transparent' },
            axisLabel: {
              padding: 30,
              fontSize: fontSize.medium, // customize as per your setup
              fontFamily: Fonts.SemiBold,
              fill: '#333'
            },
            tickLabels: {
              fontSize: fontSize.small,
              fontFamily: Fonts.Regular,
              fill: '#555'
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          label={yAxisLabel}
          tickFormat={tick =>
            typeof tick === 'number' ? tick.toFixed(0) : tick
          }
          style={{
            axis: { stroke: 'transparent' },
            axisLabel: {
              padding: 40,
              fontSize: fontSize.s, // customize as per your setup
              fontFamily: Fonts.Medium,
              fill: '#333'
            },
            tickLabels: {
              fontSize: fontSize.s,
              fontFamily: Fonts.Regular,
              fill: '#555'
            }
          }}
        />
        {/* Render bars based on whether it's multiple series or single series */}

        {isMultiple ? (
          <VictoryGroup
            offset={calculatedBarWidth * 1.5}
            colorScale={colorScale}>
            {yKeys.map((key, index) => (
              <VictoryBar
                key={index}
                data={parsedData}
                x={xKey}
                y={key}
                barWidth={calculatedBarWidth}
                labels={({ datum }) => (showDataLabels ? datum[key] : '')}
                labelComponent={
                  <VictoryLabel
                    dy={-5}
                    style={{
                      fontSize: fontSize.small,
                      fontFamily: Fonts.Regular,
                      fill: '#000'
                    }}
                  />
                }
              />
            ))}
          </VictoryGroup>
        ) : (
          <VictoryBar
            colorScale={colorScale}
            style={{
              data: { fill: Colors.primary, fontFamily: Fonts.Regular }
            }}
            data={parsedData}
            x={xKey}
            y={yKeys[0]}
            barWidth={calculatedBarWidth}
            labels={({ datum }) =>
              datum[yKeys[0]] === 0 ? '' : showDataLabels ? datum[yKeys[0]] : ''
            }
            labelComponent={
              <VictoryLabel
                dy={-5}
                style={{
                  fontSize: fontSize.small,
                  fontFamily: Fonts.Regular,
                  fill: '#000'
                }}
              />
            }
          />
        )}
      </VictoryChart>
    </View>
  )
}

export default BarChart
