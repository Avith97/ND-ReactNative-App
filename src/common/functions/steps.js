export const health_utils = {
  sum: steps => {
    const totalSteps = steps.records.reduce(
      (sum, record) => sum + record.count,
      0
    )
    return totalSteps
  },
  filter_by_package_name: data => {
    return data.records.filter(
      record => record.metadata.dataOrigin === 'com.events.necessarydevilapp'
    )
  },

  total_steps: data => {
    const filteredData = steps.filter_by_package_name(data)
    return steps.sum(filteredData)
  }
}
