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
  padding: 20px;
  margin-right: ${props => props.marginRight ? props.marginRight : '0px'};;
`

const BarChart = styled.div`

`

const IndicatorText = styled.span`
  margin-left: 7px;
  font-size: 0.85rem;
  line-height: 36px;
`

const CO2EmissionsPerformance = () => {
  return (
    <BuildingEnergyPerformanceWrapper className="d-flex justify-content-between">
      <BarWrapper className="d-flex" marginRight="20px">
        <BarChart>
          <BarHeader>Building Energy Performance</BarHeader>
          <div className="d-flex">
            <Hr/>
            <BarBlock width="36px" backgroundColor="#93d2f0" text="A" textAlign="center" paddingRight="0"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="-12px">Most Efficient</BarTitle>
            <BarBlock width="36px" backgroundColor="#63bcf2" textAlign="center" text="B" paddingRight="0"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="10px"/>
            <BarBlock width="36px" backgroundColor="#52a8d9" textAlign="center" text="C" paddingRight="0" />
            <BarBlock width="53px" backgroundColor="#52a8d9" text="C" isArrow={true} textAlign="center" marginLeft="7px"/>
            <IndicatorText>Improved</IndicatorText>
          </div>
          <div className="d-flex ">
            <BarTitle>Average Performance</BarTitle>
            <BarBlock width="36px" backgroundColor="#3c82c6" textAlign="center" text="D" paddingRight="0"/>
            <BarBlock width="53px" backgroundColor="#3c82c6" text="D" isArrow={true} textAlign="center" marginLeft="7px"/>
            <IndicatorText>Current</IndicatorText>
          </div>

          <div className="d-flex">
            <Hr marginTop="20px"/>
            <BarBlock width="36px" backgroundColor="#c4c4c4" textAlign="center" text="E" paddingRight="0"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="10px">Least Efficient</BarTitle>
            <BarBlock width="36px" backgroundColor="#a9a9a9" textAlign="center" text="F" paddingRight="0"/>
          </div>
          <div className="d-flex">
            <Hr marginTop="35px"/>
            <BarBlock width="36px" backgroundColor="#8b8b8b" textAlign="center" text="G" paddingRight="0"/>
          </div>
        </BarChart>
      </BarWrapper>
    </BuildingEnergyPerformanceWrapper>
  )
}

export default CO2EmissionsPerformance