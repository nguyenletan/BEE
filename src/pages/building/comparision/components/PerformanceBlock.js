import React from 'react'
import BarBlock from './BarBlock'
import styled from 'styled-components'

const PerformanceBlockWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`

const Hr = styled.hr`
  width: 100px;
  border: 0;
  border-top: 1px solid #bbb;
  display: block;
  margin: ${props => props.marginTop ? props.marginTop : '0px'} 0 0;

`
const BarTitle = styled.h4`
  font-size: 0.9rem;
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
  margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
`

const BarIndicator = styled.div`

`

const BarIndicatorHeader = styled.div`
  margin-bottom: 20px;
  font-size: 0.85rem;
  height: 45px;
`

const BarIndicatorBody = styled.div`

`
const BarIndicatorColumn = styled.div`
  border-right: 1px solid #bbb;
`

const BarChart = styled.div`
  margin-right: 20px;
`

const PerformanceBlock = ({ data }) => {

  return (
    <PerformanceBlockWrapper className="d-flex justify-content-between">

      <BarWrapper className="d-flex" marginRight="20px">

        <BarChart>
          <BarHeader>Building Energy Performance</BarHeader>
          <div className="d-flex">
            <Hr/>
            <BarBlock width="85px" backgroundColor="#478D58" text="A"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="-12px">Most Efficient</BarTitle>
            <BarBlock width="108px" backgroundColor="#63AE62" text="B"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="10px"/>
            <BarBlock width="126px" backgroundColor="#AACC72" text="C"/>
          </div>
          <div className="d-flex ">
            <BarTitle>Average Performance</BarTitle>
            <BarBlock width="149px" backgroundColor="#F0EA6F" text="D"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="20px"/>
            <BarBlock width="172px" backgroundColor="#ecb75f" text="E"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="10px">Least Efficient</BarTitle>
            <BarBlock width="200px" backgroundColor="#df7f4f" text="F"/>
          </div>
          <div className="d-flex">
            <Hr marginTop="35px"/>
            <BarBlock width="220px" backgroundColor="#d94545" text="G"/>
          </div>
        </BarChart>
        <BarIndicator>
          <BarIndicatorHeader className="row">
            <div className="col-6">Current</div>
            <div className="col-6">Potential<br/>Best-In-Class</div>
          </BarIndicatorHeader>

          <BarIndicatorBody>
            <div className="row">
              <BarIndicatorColumn className="col-6">
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="64px" backgroundColor="#F0EA6F" text="D" isArrow={true} textAlign="center"/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text="" marginBottom="0px"/>
              </BarIndicatorColumn>
              <div className="col-6">
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="64px" backgroundColor="#63AE62" text="B" isArrow={true} textAlign="center"/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text="" marginBottom="0px"/>
              </div>
            </div>
          </BarIndicatorBody>
        </BarIndicator>
      </BarWrapper>

      <BarWrapper className="d-flex">

        <BarChart>
          <BarHeader>CO2 Emissions Performance</BarHeader>
          <div className="d-flex">
            <Hr/>
            <BarBlock width="85px" backgroundColor="#93d2f0" text="A"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="-12px">Most Efficient</BarTitle>
            <BarBlock width="108px" backgroundColor="#63bcf2" text="B"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="10px"/>
            <BarBlock width="126px" backgroundColor="#52a8d9" text="C"/>
          </div>
          <div className="d-flex ">
            <BarTitle>Average Performance</BarTitle>
            <BarBlock width="149px" backgroundColor="#3c82c6" text="D"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="20px"/>
            <BarBlock width="172px" backgroundColor="#c4c4c4" text="E"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="10px">Least Efficient</BarTitle>
            <BarBlock width="200px" backgroundColor="#a9a9a9" text="F"/>
          </div>
          <div className="d-flex">
            <Hr marginTop="35px"/>
            <BarBlock width="220px" backgroundColor="#8b8b8b" text="G"/>
          </div>
        </BarChart>
        <BarIndicator>
          <BarIndicatorHeader className="row">
            <div className="col-6">Current</div>
            <div className="col-6">Potential<br/>Best-In-Class</div>
          </BarIndicatorHeader>

          <BarIndicatorBody>
            <div className="row">
              <BarIndicatorColumn className="col-6">
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="64px" backgroundColor="#3c82c6" text="D" isArrow={true} textAlign="center"/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text="" marginBottom="0px"/>
              </BarIndicatorColumn>
              <div className="col-6">
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="64px" backgroundColor="#63bcf2" text="B" isArrow={true} textAlign="center"/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text=""/>
                <BarBlock width="1px" backgroundColor="transparent" text="" marginBottom="0px"/>
              </div>
            </div>
          </BarIndicatorBody>
        </BarIndicator>
      </BarWrapper>
    </PerformanceBlockWrapper>
  )
}

export default PerformanceBlock