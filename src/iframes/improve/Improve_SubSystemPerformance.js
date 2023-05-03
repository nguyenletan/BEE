import SubSystemPerformance from 'pages/building/comparision/components/SubSystemPerformance'
import React from 'react'

const ImproveSubSystemPerformance = () => {
  const subSystemPerformanceData = {
    data: [
      {
        name: 'Energy Usage Intensity',
        'Minimum Requirement': 46,
        'Current Performance': 53,
        'Potential Best In Class': 76,
      },
      {
        name: 'Cooling Efficiency',
        'Minimum Requirement': 30,
        'Current Performance': 28,
        'Potential Best In Class': 70,
      },
      {
        name: 'Heating Efficiency',
        'Minimum Requirement': 40,
        'Current Performance': 53,
        'Potential Best In Class': 76,
      },
      {
        name: 'Lighting Efficiency',
        'Minimum Requirement': 40,
        'Current Performance': 38,
        'Potential Best In Class': 76,
      },
      {
        name: 'Mechanical Ventilation Efficiency',
        'Minimum Requirement': 49,
        'Current Performance': 51,
        'Potential Best In Class': 68,
      },
      {
        name: 'Envelope Performance',
        'Minimum Requirement': 20,
        'Current Performance': 72,
        'Potential Best In Class': 76,
      },
      {
        name: 'Renewables Usage',
        'Minimum Requirement': 19,
        'Current Performance': 53,
        'Potential Best In Class': 64,
      },
    ],
    keys: ['Potential Best In Class', 'Current Performance', 'Minimum Requirement'],
    indexBy: ['name'],
  }

  return (
    <SubSystemPerformance data={subSystemPerformanceData}/>
  )
}
export default ImproveSubSystemPerformance

