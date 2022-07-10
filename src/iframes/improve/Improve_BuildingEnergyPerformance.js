import React from 'react'
import BuildingEnergyPerformance from 'pages/building/comparision/components/BuildingEnergyPerformance'

const ImproveBuildingEnergyPerformance = () => {
  const energyPerformance = { current: 'D', improved: 'C' }

  return (
    <BuildingEnergyPerformance improved={energyPerformance}/>
  )
}
export default ImproveBuildingEnergyPerformance

