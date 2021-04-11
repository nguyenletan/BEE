import React from 'react'
import styled from 'styled-components'
import SmallBreakDown from '../../../../../components/SmallBreakDown'

const Wrapper = styled.div`
  width: 100%;
`

const RowItem = styled.div`
  font-size: .9rem;
`

const ColItem = styled.div``

const ObsolescenceMoreInfo = () => {
  const data = [
    {
      id: 'used',
      label: 'Used',
      value: 236850,
      color: '#87972f',
      remaining: 77691
    },
    {
      id: 'remaining',
      label: 'Remaining',
      value: 77691,
      color: '#ecedef',
      remaining: 77691
    }
  ]

  return (
    <Wrapper>
      <RowItem className="row">
        <ColItem className="col col-4 mb-4">
          <SmallBreakDown title="Annual Energy Savings (MWh)"
                     startAngle={-0}
                     data={data}
                     innerRadius={0.88}
                     isCenteredPercentage={true}
                     marginRight="0px"
                     valueFontSize="18px"
                     enableRadialLabels={false}
                     noCenterText={true}
          />
        </ColItem>
        <ColItem className="col col-4 mb-4">
          <SmallBreakDown title="Annual Energy Cost Savings ($1000)"
                          startAngle={-0}
                          data={data}
                          innerRadius={0.88}
                          isCenteredPercentage={true}
                          marginRight="0px"
                          valueFontSize="18px"
                          enableRadialLabels={false}
                          noCenterText={true}
          />
        </ColItem>
        <ColItem className="col col-4 mb-4">
          <SmallBreakDown title="Annual CO2 Emissions Avoided (Tons/yr)"
                          startAngle={-0}
                          data={data}
                          innerRadius={0.88}
                          isCenteredPercentage={true}
                          marginRight="0px"
                          valueFontSize="18px"
                          enableRadialLabels={false}
                          noCenterText={true}
          />
        </ColItem>
        <ColItem className="col col-4 mb-4">
          <SmallBreakDown title="Current Efficiency"
                          startAngle={-0}
                          data={data}
                          innerRadius={0.88}
                          isCenteredPercentage={true}
                          marginRight="0px"
                          valueFontSize="18px"
                          enableRadialLabels={false}
                          noCenterText={true}
          />
        </ColItem>
        <ColItem className="col col-4 mb-4">
          <SmallBreakDown title="New Efficiency"
                          startAngle={-0}
                          data={data}
                          innerRadius={0.88}
                          isCenteredPercentage={true}
                          marginRight="0px"
                          valueFontSize="18px"
                          enableRadialLabels={false}
                          noCenterText={true}
          />
        </ColItem>
        <ColItem className="col col-4">
          <SmallBreakDown title="Annual Maintenance Cost Savings ($1000/Yr)"
                          startAngle={-0}
                          data={data}
                          innerRadius={0.88}
                          isCenteredPercentage={true}
                          marginRight="0px"
                          valueFontSize="18px"
                          enableRadialLabels={false}
                          noCenterText={true}
          />
        </ColItem>
      </RowItem>
    </Wrapper>
  )

}

export default ObsolescenceMoreInfo