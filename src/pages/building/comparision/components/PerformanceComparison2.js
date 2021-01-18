import React from 'react'
import styled from 'styled-components'

import { Line } from '@nivo/line'


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

const data = [{
  id: 'Design Excellent Center',
  data:
    [
      {
        'x': 'Cooling',
        'y': '5',

      },
      {
        'x': 'Heating',
        'y': '5'
      },
      {
        'x': 'Lighting',
        'y': '3'
      },
      {
        'x': 'Mechanical Ventilation',
        'y': '4'
      },
      {
        'x': 'Roof',
        'y': '5'
      },
      {
        'x': 'Wall',
        'y': '4'
      },
      {
        'x': 'Openings',
        'y': '5'
      },
      {
        'x': 'Floor',
        'y': '3'
      },
      {
        'x': 'Renewable',
        'y': '3'
      },
      {
        'x': 'Plug Loads',
        'y': '3'
      },
    ]
},
  {
    id: 'Hill Bay Central Bank Center',
    data:
      [
        {
          'x': 'Cooling',
          'y': '6',

        },
        {
          'x': 'Heating',
          'y': '6'
        },
        {
          'x': 'Lighting',
          'y': '5'
        },
        {
          'x': 'Mechanical Ventilation',
          'y': '5'
        },
        {
          'x': 'Roof',
          'y': '3'
        },
        {
          'x': 'Wall',
          'y': '3'
        },
        {
          'x': 'Openings',
          'y': '4'
        },
        {
          'x': 'Floor',
          'y': '5'
        },
        {
          'x': 'Renewable',
          'y': '4'
        },
        {
          'x': 'Plug Loads',
          'y': '2'
        },
      ]
  },
  {
    id: 'F+E Campus',
    data:
      [
        {
          'x': 'Cooling',
          'y': '4',

        },
        {
          'x': 'Heating',
          'y': '5'
        },
        {
          'x': 'Lighting',
          'y': '4'
        },
        {
          'x': 'Mechanical Ventilation',
          'y': '5'
        },
        {
          'x': 'Roof',
          'y': '4'
        },
        {
          'x': 'Wall',
          'y': '4'
        },
        {
          'x': 'Openings',
          'y': '5'
        },
        {
          'x': 'Floor',
          'y': '3'
        },
        {
          'x': 'Renewable',
          'y': '6'
        },
        {
          'x': 'Plug Loads',
          'y': '6'
        },
      ]
  }
]
const commonProperties = {
  width: 1200,
  height: 400,
  margin: { top: 20, right: 0, bottom: 20, left: 40 },
  data,
  animate: true,

  //enableSlices: 'x',
}



const PerformanceComparison2 = () => {

  return <PerformanceComparisonWrapper>
    <PerformanceComparisonTitle>Sub-System Performance</PerformanceComparisonTitle>

    <Line
      {...commonProperties}
      curve="monotoneX"
      data={data}
      useMesh={false}
      enableSlices={false}
      enablePoint={true}
      pointSize={12}
      pointColor={'#fff'}
      pointBorderWidth={1}
      enableGridX={false}
      lineWidth={1}
      yScale={{
        type: 'linear',
        min: 1,
        max: 7
      }}
      axisLeft={{
        tickValues: [1, 2, 3, 4, 5, 6, 7],
        format: value => {
          const labels = ['G', 'F', 'E', 'D', 'C', 'B', 'A',]
          return labels[value - 1]
        }
      }}
      pointBorderColor={{ from: 'serieColor' }}
      xScale={{ type: 'point' }}
      colors={['#87972F', '#636c2e', '#c1cf74']}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -25,
          itemWidth: 200,
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
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />

  </PerformanceComparisonWrapper>
}

export default PerformanceComparison2
