import React from 'react'
import styled from 'styled-components'
// import range from 'lodash/range'
// import shuffle from 'lodash/shuffle'
import { ResponsiveBump  } from '@nivo/bump'

const PerformanceComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const PerformanceComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 10px;
  @media (min-width: 768px) {
    padding: 20px;
  }
  margin-top: 40px;
  margin-bottom: 40px;
  height: max(500px, 100vw / 4);
  min-width: 100%;
`

// const PerformanceComparisonData = [
//   {
//     id: `Design Excellent Center`,
//     data: [
//       {
//         x: 1,
//         y: 'A'
//       },
//       {
//         x: 1,
//         y: 'B'
//       }
//     ]
//   },
//   {
//     id: `Hill Bay Central Bank Center`,
//     data: [
//       {
//         x: 1,
//         y: 'A'
//       },
//       {
//         x: 1,
//         y: 'B'
//       }
//     ]
//   }
// ]

const PerformanceComparisonData = [
  {
    id: '',
    data: [
      {
        x: null,
        y: 'A',
      },
    ],
  },
  {
    id: 'Design Excellent Center',
    data: [
      {
        x: 'Cooling',
        y: 'C',
      },
      {
        x: 'Heating',
        y: 'C',
      },
      {
        x: 'Lighting',
        y: 'C',
      },
      {
        x: 'Mechanical Ventilation',
        y: 'D',
      },
      {
        x: 'Roof',
        y: 'C',
      },
      {
        x: 'Wall',
        y: 'D',
      },
      {
        x: 'Openings',
        y: 'C',
      },
      {
        x: 'Floor',
        y: 'E',
      },
      {
        x: 'Renewables',
        y: 'E',
      },
      {
        x: 'Plug Loads',
        y: 'E',
      },
    ],
  },
  {
    id: 'Hill Bay Central Bank Center',
    data: [
      {
        x: 'Cooling',
        y: 'B',
      },
      {
        x: 'Heating',
        y: 'B',
      },
      {
        x: 'Lighting',
        y: 'C',
      },
      {
        x: 'Mechanical Ventilation',
        y: 'C',
      },
      {
        x: 'Roof',
        y: 'E',
      },
      {
        x: 'Wall',
        y: 'E',
      },
      {
        x: 'Openings',
        y: 'D',
      },
      {
        x: 'Floor',
        y: 'C',
      },
      {
        x: 'Renewables',
        y: 'D',
      },
      {
        x: 'Plug Loads',
        y: 'F',
      },

    ],
  },
  {
    id: 'F+E Campus',
    data: [
      {
        x: 'Cooling',
        y: 'D',
      },
      {
        x: 'Heating',
        y: 'C',
      },
      {
        x: 'Lighting',
        y: 'D',
      },
      {
        x: 'Mechanical Ventilation',
        y: 'E',
      },
      {
        x: 'Roof',
        y: 'D',
      },
      {
        x: 'Wall',
        y: 'D',
      },
      {
        x: 'Openings',
        y: 'C',
      },
      {
        x: 'Floor',
        y: 'E',
      },
      {
        x: 'Renewables',
        y: 'B',
      },
      {
        x: 'Plug Loads',
        y: 'B',
      },
    ],
  },

  {
    id: 'E',
    data: [
      {
        x: 'Cooling',
        y: 'G',
      },

    ],
  },
  {
    id: 'F',
    data: [
      {
        x: 'Cooling',
        y: 'G',
      },

    ],
  },
  {
    id: '',
    data: [
      {
        x: 'Cooling',
        y: 'G',
      },

    ],
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
  lineWidth: 3,
  activeLineWidth: 6,
  inactiveLineWidth: 2,
  enableGridX: false,
  axisTop: false,
  yScale: { type: 'point' },
  pointBorderColor: { from: 'serie.color' },
  startLabel: false,
  colors: ["transparent", '#AACC72', '#44D7B6', '#478D58'],
  legends: [{
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: -35,
        itemWidth: 180,
        itemHeight: 20,
        itemsSpacing: 4,
        symbolSize: 20,
        symbolShape: 'circle',
        itemDirection: 'left-to-right',
        itemTextColor: '#777',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          }],
      }],
}

const PerformanceComparison = () => {
  return (
    <PerformanceComparisonWrapper>
      <PerformanceComparisonTitle>Sub-System Performance</PerformanceComparisonTitle>
      <ResponsiveBump
        {...commonProps}
        

        //colors={['#87972F', '#636c2e', '#c1cf74', 'transparent', 'transparent', 'transparent', 'transparent']}
      />

    </PerformanceComparisonWrapper>
  )
}

export default PerformanceComparison
