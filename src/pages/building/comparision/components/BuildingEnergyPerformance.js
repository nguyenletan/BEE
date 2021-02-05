import React from 'react'
import BarBlock from './BarBlock'
import styled from 'styled-components'


const BuildingEnergyPerformanceWrapper = styled.div`


`

const Hr = styled.hr`
  width: 100px;
  border: 0;
  border-top: 1px solid #bbb;
  display: block;
  margin: ${props => props.marginTop ? props.marginTop : '0px'} 0 0;
`

const BarTitle = styled.h4`
  font-size: 0.85rem;
  width: 100px;
  padding-right: 10px;
  margin: 0 0 ${props => props.marginBottom ? props.marginBottom : '0px'};
  margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
`

const BarHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 20px;
  height: 45px;
`

const BarWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 20px 20px;
  margin-right: ${props => props.marginRight ? props.marginRight : '0px'};;
`

const BarChart = styled.div`

`

const IndicatorText = styled.span`
  margin-left: 7px;
  font-size: 0.85rem;
  line-height: 36px;
`

const BuildingEnergyPerformance = () => {
  return (
    <BuildingEnergyPerformanceWrapper className="d-flex justify-content-between">
      <BarWrapper className="d-flex" marginRight="30px">
        <BarChart>
          <BarHeader>Building Energy<br/>Performance</BarHeader>
          <div className="d-flex">
            <Hr/>
            <BarBlock width="36px" backgroundColor="#478D58" text="A" textAlign="center" paddingRight="0"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="-12px">Most Efficient</BarTitle>
            <BarBlock width="36px" backgroundColor="#63AE62" textAlign="center" text="B" paddingRight="0"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="10px"/>
            <BarBlock width="36px" backgroundColor="#AACC72" textAlign="center" text="C" paddingRight="0" />
            <BarBlock width="53px" backgroundColor="#AACC72" text="C" isArrow={true} textAlign="center" marginLeft="7px"/>
            <IndicatorText>Improved</IndicatorText>
          </div>
          <div className="d-flex ">
            <BarTitle>Average Performance</BarTitle>
            <BarBlock width="36px" backgroundColor="#F0EA6F" textAlign="center" text="D" paddingRight="0"/>
            <BarBlock width="53px" backgroundColor="#F0EA6F" text="D" isArrow={true} textAlign="center" marginLeft="7px"/>
            <IndicatorText>Current</IndicatorText>
          </div>

          <div className="d-flex">
            <Hr marginTop="20px"/>
            <BarBlock width="36px" backgroundColor="#ecb75f" textAlign="center" text="E" paddingRight="0"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="10px">Least Efficient</BarTitle>
            <BarBlock width="36px" backgroundColor="#df7f4f" textAlign="center" text="F" paddingRight="0"/>
          </div>
          <div className="d-flex">
            <Hr marginTop="35px"/>
            <BarBlock width="36px" backgroundColor="#d94545" textAlign="center" text="G" paddingRight="0"/>
          </div>
        </BarChart>
      </BarWrapper>
    </BuildingEnergyPerformanceWrapper>
  )
}

export default BuildingEnergyPerformance