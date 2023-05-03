import React from 'react'
import CO2EmissionsPerformance from 'pages/building/comparision/components/CO2EmissionsPerformance'

const ImproveCO2EmissionsPerformance = () => {
  const co2EmissionsPerformance = { current: 'D', improved: 'C' }

  return (
    <CO2EmissionsPerformance improved={co2EmissionsPerformance.improved}/>
  )
}
export default ImproveCO2EmissionsPerformance

