import React from 'react'
import styled from 'styled-components'

import { Radar } from '@nivo/radar'
import {
  coolingSVG,
  envelopeSVG,
  heatingSVG,
  lightingSVG,
  mechVentSVG,
  renewableSVG
} from '../../../../SvgConstants'

const CurrentSubSystemHealthWrapper = styled.div`
  border-radius: 20px;
  background-color: #fafafa;
  padding: 20px;
  
`

const CurrentSubSystemHealthTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`
const CurrentSubSystemHealthList = styled.ul`
  font-size: 1rem;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;

  margin: 0;
  li {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }
`


const CurrentSubSystemHealth = ({data}) => {

  console.log(data)
  const LabelComponent = (props) => {
    const { id, anchor, angle } = props
    let texts = ''
    let iconSVG = ''
    let translateX = anchor === 'end' ? -50 : anchor === 'middle' ? -20 : -10
    let translateY = angle < 0 ? -60 : -30

    switch (id) {
      case 'Cooling':
        iconSVG = coolingSVG()
        texts = <>
          <text
            y={50} x={0}
            style={{ fontSize: 12, fill: '#343a40' }}>{id}
          </text>
        </>
        translateX = -5
        translateY = -25
        break
      case 'Heating':
        iconSVG = heatingSVG()
        texts = <>
          <text
            y={50} x={-6}
            style={{ fontSize: 12, fill: '#343a40' }}>{id}
          </text>
        </>
        translateX = -10
        translateY = -40
        break
      case 'Mechanical Ventilation':
        iconSVG = mechVentSVG()
        texts = <>
          <text
            y={50} x={-13}
            style={{ fontSize: 12, fill: '#343a40' }}>Mechanical
          </text>
          <text
            y={66} x={-6}
            style={{ fontSize: 12, fill: '#343a40' }}>Ventilation
          </text>
        </>
        translateX = -15
        translateY = -40
        break
      case 'Lighting Efficacy':
        iconSVG = lightingSVG()
        texts = <>
          <text
            y={50} x={-13}
            style={{ fontSize: 12, fill: '#343a40' }}>Lighting
          </text>
          <text
            y={66} x={-13}
            style={{ fontSize: 12, fill: '#343a40' }}>Efficacy
          </text>
        </>
        translateX = -5
        translateY = -20
        break
      case 'Mechanical Ventilation Efficiency':
        iconSVG = mechVentSVG()
        texts = <>
          <text
            y={50} x={-13}
            style={{ fontSize: 12, fill: '#343a40' }}>Mechanical
          </text>
          <text
            y={66} x={-40}
            style={{ fontSize: 12, fill: '#343a40' }}>Ventilation Efficiency
          </text>
        </>
        translateX = -20
        translateY = -22
        break
      case 'Envelope Performance':
        iconSVG = envelopeSVG()
        texts = <>
          <text
            y={50} x={0}
            style={{ fontSize: 12, fill: '#343a40' }}>Envelope
          </text>
          <text
            y={66} x={-10}
            style={{ fontSize: 12, fill: '#343a40' }}>Performance
          </text>
        </>
        translateX = -30
        translateY = -30
        break
      case 'Renewables Usage':
        iconSVG = renewableSVG()
        texts = <>
          <text
            y={50} x={-10}
            style={{ fontSize: 12, fill: '#343a40' }}>Envelope
          </text>
          <text
            y={66} x={-30}
            style={{ fontSize: 12, fill: '#343a40' }}>Performance
          </text>
        </>
        translateX = -30
        translateY = -30
        break
      default:
        break
    }

    return (
      <g transform={`translate(${translateX} ${translateY})`}>
        {iconSVG}
        {texts}
      </g>
    )
  }

  const commonProperties = {
    width: 300,
    height: 300,
    margin: { top: 40, right: 40, bottom: 0, left: 40 },
    ...data,
    indexBy: 'name',
    animate: true,
    gridShape: "circular",
    dotSize: 0,
    dotBorderColor: "#fff",
    dotBorderWidth: 0,
    enableDotLabel: false,
    gridLabelOffset: 36,
    gridLabel: LabelComponent,
    fillOpacity: .9,
    borderWidth: 1,
    blendMode: 'multiply',
    gridLevels: 3,


  }

  const list = data.data.map(item => (
    <li><label>{item.name}:</label> <span>{item.value}</span></li>
  ))

  return (
    <CurrentSubSystemHealthWrapper className="mb-4">
      <CurrentSubSystemHealthTitle>Current Sub-System Health</CurrentSubSystemHealthTitle>
      <Radar {...commonProperties}  colors={['#87972f']}/>
      <CurrentSubSystemHealthList>
        {list}
      </CurrentSubSystemHealthList>
    </CurrentSubSystemHealthWrapper>
  )
}

export default CurrentSubSystemHealth