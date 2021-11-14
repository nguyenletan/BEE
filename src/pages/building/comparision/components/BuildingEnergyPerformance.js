import React from 'react'
import BarBlock from './BarBlock'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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

const BuildingEnergyPerformance = ({ improved }) => {
  const { t } = useTranslation('improvement')

  const Indicator = ({ text, backgroundColor, type }) => (
    improved === text && <>
      <BarBlock
        width="53px" backgroundColor={backgroundColor} text={text} isArrow textAlign="center"
        marginLeft="7px"
      />
      <IndicatorText>{t(type)}</IndicatorText>
    </>
  )

  return (
    <BuildingEnergyPerformanceWrapper className="d-flex justify-content-between">
      <BarWrapper className="d-flex" marginRight="30px">
        <BarChart>
          <BarHeader>{t('Building Energy')}<br/>{t('Performance')}</BarHeader>
          <div className="d-flex">
            <Hr/>
            <BarBlock width="36px" backgroundColor="#478D58" text="A" textAlign="center" paddingRight="0"/>
            <Indicator text="A" backgroundColor="#478D58" type="Improved"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="-12px">{t('Most Efficient')}</BarTitle>
            <BarBlock width="36px" backgroundColor="#63AE62" textAlign="center" text="B" paddingRight="0"/>
            <Indicator text="B" backgroundColor="#63AE62" type="Improved"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="10px"/>
            <BarBlock width="36px" backgroundColor="#AACC72" textAlign="center" text="C" paddingRight="0"/>
            <Indicator text="C" backgroundColor="#AACC72" type="Improved"/>
          </div>
          <div className="d-flex ">
            <BarTitle>{t('Average Performance')}</BarTitle>
            <BarBlock width="36px" backgroundColor="#F0EA6F" textAlign="center" text="D" paddingRight="0"/>
            <BarBlock
              width="53px" backgroundColor="#F0EA6F" text="D" isArrow textAlign="center"
              marginLeft="7px"
            />
            <IndicatorText>{t('Current')}</IndicatorText>
            <Indicator text="D" backgroundColor="#F0EA6F" type="Improved"/>
          </div>

          <div className="d-flex">
            <Hr marginTop="20px"/>
            <BarBlock width="36px" backgroundColor="#ecb75f" textAlign="center" text="E" paddingRight="0"/>
            <Indicator text="E" backgroundColor="#ecb75f" type="Improved"/>
          </div>
          <div className="d-flex ">
            <BarTitle marginTop="10px">{t('Least Efficient')}</BarTitle>
            <BarBlock width="36px" backgroundColor="#df7f4f" textAlign="center" text="F" paddingRight="0"/>
            <Indicator text="F" backgroundColor="#df7f4f" type="Improved"/>
          </div>
          <div className="d-flex">
            <Hr marginTop="35px"/>
            <BarBlock width="36px" backgroundColor="#d94545" textAlign="center" text="G" paddingRight="0"/>
            <Indicator text="G" backgroundColor="#d94545" type="Improved"/>
          </div>
        </BarChart>
      </BarWrapper>
    </BuildingEnergyPerformanceWrapper>
  )
}

export default BuildingEnergyPerformance
