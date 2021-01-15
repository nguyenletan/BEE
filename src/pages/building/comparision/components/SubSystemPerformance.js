import React from 'react'
import styled from 'styled-components'
import {Radar} from '@nivo/radar'

const SubSystemPerformanceTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const SubSystemPerformanceWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
  margin-right: 20px;
`

const subSystemPerformanceData = {
  data: [
    {
      name: 'Energy Usage Intensity',
      Minimum_Requirement: 46,
      Current_Performance: 53,
      Potential_Best_In_Class: 76
    },
    {
      name: 'Cooling Efficiency',
      Minimum_Requirement: 30,
      Current_Performance: 28,
      Potential_Best_In_Class: 70
    },
    {
      name: 'Heating Efficiency',
      Minimum_Requirement: 40,
      Current_Performance: 53,
      Potential_Best_In_Class: 76
    },
    {
      name: 'Lighting Efficacy',
      Minimum_Requirement: 40,
      Current_Performance: 38,
      Potential_Best_In_Class: 76
    },
    {
      name: 'Mechanical Ventilation Efficiency',
      Minimum_Requirement: 49,
      Current_Performance: 51,
      Potential_Best_In_Class: 68
    },
    {
      name: 'Envelope Performance',
      Minimum_Requirement: 20,
      Current_Performance: 72,
      Potential_Best_In_Class: 76
    },
    {
      name: 'Renewables Usage',
      Minimum_Requirement: 19,
      Current_Performance: 53,
      Potential_Best_In_Class: 64
    },
  ],
  keys: ['Minimum_Requirement', 'Current_Performance', 'Potential_Best_In_Class']
}

const SubSystemPerformance = () => {

  const commonProperties = {
    width: 450,
    height: 350,
    margin: { top: 120, right: 0, bottom: 40, left: 0 },
    ...subSystemPerformanceData,
    indexBy: 'name',
    animate: true
  }

  // const curveOptions = ['linearClosed', 'basisClosed', 'catmullRomClosed', 'cardinalClosed']

  const LabelComponent = ({ id, anchor }) => {
    console.log(id)
    const names = id.split(' ')
    const texts = names.map((name, index) => <text
      y={index * 16}
      style={{ fontSize: 12, fill: '#343a40' }}>{name}</text>)
    return (
      <g transform={`translate(${anchor === 'end' ? -60 : anchor === 'middle' ? -30 : 0}, -20)`}>

        {texts}
        {/*<text*/}
        {/*  y={24}*/}
        {/*  style={{*/}
        {/*    fontSize: 24,*/}
        {/*    fontWeight: 'bold',*/}
        {/*    fill: '#3a9896',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  +{Math.round(Math.random() * 100)}%*/}
        {/*</text>*/}
      </g>
    )
  }

  return <SubSystemPerformanceWrapper>
    <SubSystemPerformanceTitle>Sub-System Performance</SubSystemPerformanceTitle>

    <Radar
      {...commonProperties}
      gridShape="linear"
      dotSize={0}
      dotBorderColor="#fff"
      dotBorderWidth={0}
      enableDotLabel={false}
      gridLabelOffset={36}
      gridLabel={LabelComponent}
      fillOpacity={0.5}
      borderWidth={1}
      colors={['#478D58', '#63AE62', '#AACC72',]}
      legends={[
        {
          anchor: 'top-center',
          direction: 'row',
          translateX: 0,
          translateY: -105,
          itemWidth: 145,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  </SubSystemPerformanceWrapper>
}

export default SubSystemPerformance
