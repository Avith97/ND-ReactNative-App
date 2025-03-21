import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BarChart from '../../common/components/Charts/BarChart';

export default function DashboardCharts() {
  const sampleData = {
    yAxis: 'distance',
    xAxis: 'startDateLocal',
    runnerActivityDetails: [
      {
        startDateLocal: '17-10',
        distance: 4868.5,
      },
      {
        startDateLocal: '18-10',
        distance: 3855.12,
      },
      {
        startDateLocal: '19-10',
        distance: 7168.51,
      },
      {
        startDateLocal: '20-10',
        distance: 4320.99,
      },
      {
        startDateLocal: '21-10',
        distance: 8614.6,
      },
      {
        startDateLocal: '22-10',
        distance: 2686.48,
      },
      {
        startDateLocal: '23-10',
        distance: 12055.15,
      },
    ],
    eventTarget: 0,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bar Chart</Text>
      <BarChart
        data={sampleData?.runnerActivityDetails}
        xKey="startDateLocal"
        yKeys={['distance']}
        barWidth={13}
        chartHeight={300}
      />
      <Text style={styles.title}>Single Bar Chart</Text>
      {/* <BarChart
        data={sampleData}
        xKey="category"
        yKeys={['value']}
        barWidth={13}
        chartHeight={300}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, // Added padding
    backgroundColor: '#f2f2f2', // Light background for better contrast
    flex: 1, // To take full height
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
});
