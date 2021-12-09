import React from 'react'
import styled from 'styled-components'
// import range from 'lodash/range'
// import shuffle from 'lodash/shuffle'
import { ResponsiveBump } from '@nivo/bump'
import BarBlock from 'pages/building/comparision/components/BarBlock'

const PerformanceComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
`

const PerformanceComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 10px;
  @media (min-width: 768px) {
    padding: 20px;
  }
  margin-top: 100px;
  margin-bottom: 40px;
  height: max(500px, 100vw / 4);
  min-width: 100%;
`

const LineChartWrapper =  styled.div`
  margin-top: 0;
  height: max(500px, 100vw / 4);
  width: calc(100% - 50px);
`

const PerformanceComparisonData = [
  {
    id: 'Design Excellent Center',
    data: [
      {
        x: 'Cooling',
        y: 3,
      },
      {
        x: 'Heating',
        y: 3,
      },
      {
        x: 'Lighting',
        y: 5,
      },
      {
        x: 'Mechanical Ventilation',
        y: 4,
      },
      {
        x: 'Roof',
        y: 3,
      },
      {
        x: 'Wall',
        y: 4,
      },
      {
        x: 'Openings',
        y: 3,
      },
      {
        x: 'Floor',
        y: 5,
      },
      {
        x: 'Renewables',
        y: 5,
      },
      {
        x: 'Plug Loads',
        y: 5,
      },
    ],
  },
  {
    id: 'Hill Bay Central Bank Center',
    data: [
      {
        x: 'Cooling',
        y: 2,
      },
      {
        x: 'Heating',
        y: 2,
      },
      {
        x: 'Lighting',
        y: 3,
      },
      {
        x: 'Mechanical Ventilation',
        y: 3,
      },
      {
        x: 'Roof',
        y: 5,
      },
      {
        x: 'Wall',
        y: 5,
      },
      {
        x: 'Openings',
        y: 4,
      },
      {
        x: 'Floor',
        y: 3,
      },
      {
        x: 'Renewables',
        y: 4,
      },
      {
        x: 'Plug Loads',
        y: 6,
      },

    ],
  },
  {
    id: 'F+E Campus',
    data: [
      {
        x: 'Cooling',
        y: 4,
      },
      {
        x: 'Heating',
        y: 3,
      },
      {
        x: 'Lighting',
        y: 4,
      },
      {
        x: 'Mechanical Ventilation',
        y: 5,
      },
      {
        x: 'Roof',
        y: 4,
      },
      {
        x: 'Wall',
        y: 4,
      },
      {
        x: 'Openings',
        y: 3,
      },
      {
        x: 'Floor',
        y: 5,
      },
      {
        x: 'Renewables',
        y: 2,
      },
      {
        x: 'Plug Loads',
        y: 2,
      },
    ],
  },
  {
    id: 'A',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },
    ],
  },
  {
    id: 'E',
    data: [
      {
        x: 'Cooling',
        y: 7,
      },

    ],
  },
  {
    id: 'F',
    data: [
      {
        x: 'Cooling',
        y: 7,
      },

    ],
  },
  {
    id: '',
    data: [
      {
        x: 'Cooling',
        y: 7,
      },

    ],
  },
]


const commonProps = {

  margin: { top: 0, right: 140, bottom: 108, left: 25 },
  titleOffsetX: -80,
  data: PerformanceComparisonData,
  spacing: 50,
  xOuterPadding: 0.2,
  pointSize: 12,
  activePointSize: 20,
  inactivePointSize: 6,
  pointBorderWidth: 1,
  activePointBorderWidth: 2,
  inactivePointBorderWidth: 1,
  lineWidth: 3.5,
  activeLineWidth: 6,
  inactiveLineWidth: 2,
  enableGridX: false,
  axisTop: false,
  axisLeft: null,
  yScale: { type: 'point' },
  pointBorderColor: { from: 'serie.color' },
  startLabel: false,
  colors: ['#AACC72', '#44D7B6', '#478D58', 'transparent', 'transparent', 'transparent', 'transparent'],
}

const PerformanceComparison = () => {
  return (
    <PerformanceComparisonWrapper>
      <PerformanceComparisonTitle>C02 Emissions - Sub-System Performance</PerformanceComparisonTitle>
      <div className="d-flex">
        <div className=" mt-2">
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#93d2f0" text="A"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#63bcf2" text="B"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#52a8d9" text="C"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#3c82c6" text="D"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#c4c4c4" text="E"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#a9a9a9" text="F"/>
          <BarBlock width="36px" backgroundColor="#8b8b8b" text="G"/>
        </div>
        <LineChartWrapper>
      <ResponsiveBump
        {...commonProps}


        //colors={['#87972F', '#636c2e', '#c1cf74', 'transparent', 'transparent', 'transparent', 'transparent']}
      />
        </LineChartWrapper>
      </div>
    </PerformanceComparisonWrapper>
  )
}

export default PerformanceComparison
