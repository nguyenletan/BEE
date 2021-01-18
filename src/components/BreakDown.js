import React from 'react'
import styled from 'styled-components'
import { Pie } from '@nivo/pie'

const BreakDownBlock = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
  margin-right: 30px;
`

const BreakDownTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0;
`

const BreakDownSubTitle = styled.p`
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 0;
`
const Ul = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  font-size: 0.85rem;
  margin-bottom: 30px;
`

const Label = styled.label`
  text-transform: capitalize;
`

const BreakDown = (props) => {
  const { title, data, subTitle } = props

  const commonProperties = {
    width: 350,
    height: 280,
    margin: { top: 20, right: 80, bottom: 0, left: 80 },
    data: data,
    animate: true,
  }

  // const legends = [
  //   {
  //     anchor: 'bottom',
  //     direction: 'row',
  //     translateY: 56,
  //     itemWidth: 100,
  //     itemHeight: 18,
  //     itemTextColor: '#fff',
  //     symbolSize: 18,
  //     symbolShape: 'circle',
  //     effects: [
  //       {
  //         on: 'hover',
  //         style: {
  //           itemTextColor: '#000',
  //         },
  //       },
  //     ],
  //   },
  // ]

  //console.log(commonProperties.data)

  // const LabelComponent = (d) => {
  //   const { label, value } = d
  //   const names = label.split(' ')
  //   return (
  //     label
  //   )
  // }

  const list = data.map(x => <li className="d-flex justify-content-between" key={x.id}>
    <Label>{x.id}:</Label>
    <span>{x.value}%</span>
  </li>)

  return <BreakDownBlock className="">
    <BreakDownTitle>{title}</BreakDownTitle>
    <BreakDownSubTitle>{subTitle}</BreakDownSubTitle>
    <Pie {...commonProperties}
         innerRadius={0.82}
         fit={true}
         startAngle={-120}
         colors={{ datum: 'data.color' }}
         tooltipFormat={value => `${value + '%'}`}
         //radialLabel={LabelComponent}
         radialLabelsLinkColor={{
           from: 'color',
         }}
         radialLabelsLinkHorizontalLength={10}
         radialLabelsTextXOffset={3}
         radialLabelsLinkStrokeWidth={2}
         radialLabelsTextColor={{
           from: 'color',
           modifiers: [['darker', 1.2]],
         }}
         enableSliceLabels={false}
    />
    <Ul>
      {list}
    </Ul>

  </BreakDownBlock>
}

export default BreakDown