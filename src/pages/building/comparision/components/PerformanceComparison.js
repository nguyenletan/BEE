import React from 'react'
import styled from 'styled-components'
// import range from 'lodash/range'
// import shuffle from 'lodash/shuffle'
import { Bump } from '@nivo/bump'

const PerformanceComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const PerformanceComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
`

// const data2 = [
//   {
//     id: `Design Excellent Center`,
//     data: [
//       {
//         x: 1,
//         y: 1
//       },
//       {
//         x: 1,
//         y: 2
//       }
//     ]
//   },
//   {
//     id: `Hill Bay Central Bank Center`,
//     data: [
//       {
//         x: 1,
//         y: 1
//       },
//       {
//         x: 1,
//         y: 2
//       }
//     ]
//   }
// ]

const PerformanceComparisonData = [

  {
    id: `Design Excellent Center`,
    data: [
      {
        x: 'Cooling',
        y: 3
      },
      {
        x: 'Heating',
        y: 3
      },
      {
        x: 'Lighting',
        y: 5
      },
      {
        x: 'Mechanical Ventilation',
        y: 4
      },
      {
        x: 'Roof',
        y: 3
      },
      {
        x: 'Wall',
        y: 4
      },
      {
        x: 'Openings',
        y: 3
      },
      {
        x: 'Floor',
        y: 5
      },
      {
        x: 'Renewables',
        y: 5
      },
      {
        x: 'Plug Loads',
        y: 5
      },
    ]
  },
  {
    id: `Hill Bay Central Bank Center`,
    data: [
      {
        x: 'Cooling',
        y: 2
      },
      {
        x: 'Heating',
        y: 2
      },
      {
        x: 'Lighting',
        y: 3
      },
      {
        x: 'Mechanical Ventilation',
        y: 3
      },
      {
        x: 'Roof',
        y: 5
      },
      {
        x: 'Wall',
        y: 5
      },
      {
        x: 'Openings',
        y: 4
      },
      {
        x: 'Floor',
        y: 3
      },
      {
        x: 'Renewables',
        y: 4
      },
      {
        x: 'Plug Loads',
        y: 6
      },

    ]
  },
  {
    id: `F+E Campus`,
    data: [
      {
        x: 'Cooling',
        y: 4
      },
      {
        x: 'Heating',
        y: 3
      },
      {
        x: 'Lighting',
        y: 4
      },
      {
        x: 'Mechanical Ventilation',
        y: 5
      },
      {
        x: 'Roof',
        y: 4
      },
      {
        x: 'Wall',
        y: 4
      },
      {
        x: 'Openings',
        y: 3
      },
      {
        x: 'Floor',
        y: 5
      },
      {
        x: 'Renewables',
        y: 2
      },
      {
        x: 'Plug Loads',
        y: 2
      },
    ]
  },
  {
    id: `A`,
    data: [
      {
        x: 'Cooling',
        y: 1
      },
    ]
  },
  {
    id: `E`,
    data: [
      {
        x: 'Cooling',
        y: 7
      },

    ]
  },
  {
    id: `F`,
    data: [
      {
        x: 'Cooling',
        y: 7
      },

    ]
  },
  {
    id: ``,
    data: [
      {
        x: 'Cooling',
        y: 7
      },

    ]
  },
]

// const generateData = () => {
//   const years = range(2000, 2005)
//   const ranks = range(1, 7)
//
//   const series = ranks.map(rank => {
//     return {
//       id: `F+E ${rank}`,
//       data: [],
//     }
//   })
//
//   years.forEach(year => {
//     shuffle(ranks).forEach((rank, i) => {
//       console.log(rank)
//       console.log(i)
//       series[i].data.push({
//         x: 2000,
//         y: 1,
//         //extra: Math.random(),
//       })
//     })
//   })
//
//   return series
// }

// const data = generateData()
// console.log(data)
// console.log(PerformanceComparisonData)
// console.log(shuffle([1, 2, 3]))

const commonProps = {
  width: 1110,
  height: 360,
  margin: { top: 40, right: 40, bottom: 40, left: 40 },
  titleOffsetX: -80,
  data: PerformanceComparisonData,
  spacing: 80,
  pointSize: 12,
  activePointSize: 18,
  inactivePointSize: 6,
  pointColor: '#fafafa',
  pointBorderWidth: 1,
  activePointBorderWidth: 2,
  inactivePointBorderWidth: 1,
  lineWidth: 1,
  activeLineWidth: 2,
  enableGridX: false,
  axisTop: false

}

const PerformanceComparison = () => {

  return <PerformanceComparisonWrapper>
    <PerformanceComparisonTitle>Sub-System Performance</PerformanceComparisonTitle>
    <Bump  {...commonProps}
           pointBorderColor={{ from: 'serie.color' }}
           startLabel={false}
           colors={['#87972F', '#636c2e', '#c1cf74', 'transparent', 'transparent', 'transparent', 'transparent']}/>

  </PerformanceComparisonWrapper>
}

export default PerformanceComparison
