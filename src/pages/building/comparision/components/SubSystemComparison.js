import React from 'react'
import styled from 'styled-components'
import coolingImg from '../../../../assets/images/cooling-load.png'
import heatingImg from '../../../../assets/images/heating-load.png'
import lightingImg from '../../../../assets/images/lighting-load.png'
import renewableImg from '../../../../assets/images/pv-system.png'
import mechVentImg from '../../../../assets/images/mech-vent-load.png'
import plugLoadsImg from '../../../../assets/images/plug-load.png'
import { getCurrentColor, getPotentialColor } from '../../../../Utilities'
import EnergySquare from './EnergySquare'

const SubSystemComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const SubSystemComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
`

const ListHeader = styled.div`
  font-size: 0.8rem;
  margin: auto;
  text-align: center;
`

const ListItem = styled.div`
  font-size: 0.85rem;
  margin: auto;
  text-align: center;
`

const ItemImg = styled.img`

`

const ItemImgSubTitle = styled.span`
  font-size: 0.75rem;
  display: block;
  margin: auto;
`

const ItemRow = styled.div`
  margin-bottom: 10px
`

const SubSystemComparison = () => {

  const subSystemComparisonData = {
    cooling: {
      currentEnergyPerformance: 'C',
      potentialBestInClass: 'B',
      currentCO2Performance: 'C',
      potentialCO2BestInClass: 'B'
    },
    heating: {
      currentEnergyPerformance: 'C',
      potentialBestInClass: 'A',
      currentCO2Performance: 'C',
      potentialCO2BestInClass: 'A'
    },
    lighting: {
      currentEnergyPerformance: 'D',
      potentialBestInClass: 'B',
      currentCO2Performance: 'D',
      potentialCO2BestInClass: 'B'
    },
    mechanicalVentilation: {
      currentEnergyPerformance: 'E',
      potentialBestInClass: 'C',
      currentCO2Performance: 'E',
      potentialCO2BestInClass: 'C'
    },
    renewable: {
      currentEnergyPerformance: 'E',
      potentialBestInClass: 'C',
      currentCO2Performance: 'E',
      potentialCO2BestInClass: 'C'
    },
    plugLoads: {
      currentEnergyPerformance: 'E',
      potentialBestInClass: 'C',
      currentCO2Performance: 'E',
      potentialCO2BestInClass: 'C'
    },
  }

  return (
    <SubSystemComparisonWrapper>
      <SubSystemComparisonTitle>Sub-System Comparison</SubSystemComparisonTitle>

      <ItemRow className="row">
        <ListHeader className="col-2"/>
        <ListHeader className="col-2">Current Energy Performance</ListHeader>
        <ListHeader className="col-2">Potential<br/>Best-in-class</ListHeader>
        <ListHeader className="col-1"/>
        <ListHeader className="col-2">Current C02 Performance</ListHeader>
        <ListHeader className="col-2">Potential<br/>Best-in-class</ListHeader>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-2">
          <ItemImg src={coolingImg} alt="cooling" height="45px"/>
          <ItemImgSubTitle>Cooling</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.cooling.currentEnergyPerformance)}
          text={subSystemComparisonData.cooling.currentEnergyPerformance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.cooling.potentialBestInClass)}
          text={subSystemComparisonData.cooling.potentialBestInClass}/></ListItem>
        <ListItem className="col-1"/>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.cooling.currentCO2Performance)}
          text={subSystemComparisonData.cooling.currentCO2Performance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.cooling.potentialCO2BestInClass)}
          text={subSystemComparisonData.cooling.potentialCO2BestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-2">
          <ItemImg src={heatingImg} alt="heating" height="45px"/>
          <ItemImgSubTitle>Heating</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.heating.currentEnergyPerformance)}
          text={subSystemComparisonData.heating.currentEnergyPerformance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.heating.potentialBestInClass)}
          text={subSystemComparisonData.heating.potentialBestInClass}/></ListItem>
        <ListItem className="col-1"/>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.heating.currentCO2Performance)}
          text={subSystemComparisonData.heating.currentCO2Performance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.heating.potentialCO2BestInClass)}
          text={subSystemComparisonData.heating.potentialCO2BestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-2">
          <ItemImg src={lightingImg} alt="lighting" height="45px"/>
          <ItemImgSubTitle>Lighting</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.lighting.currentEnergyPerformance)}
          text={subSystemComparisonData.lighting.currentEnergyPerformance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.lighting.potentialBestInClass)}
          text={subSystemComparisonData.lighting.potentialBestInClass}/></ListItem>
        <ListItem className="col-1"/>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.lighting.currentCO2Performance)}
          text={subSystemComparisonData.lighting.currentCO2Performance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.lighting.potentialCO2BestInClass)}
          text={subSystemComparisonData.lighting.potentialCO2BestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-2">
          <ItemImg src={mechVentImg} alt="Mechanical Ventilation" height="45px"/>
          <ItemImgSubTitle>Mech. Vent.</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.mechanicalVentilation.currentEnergyPerformance)}
          text={subSystemComparisonData.mechanicalVentilation.currentEnergyPerformance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.mechanicalVentilation.potentialBestInClass)}
          text={subSystemComparisonData.mechanicalVentilation.potentialBestInClass}/></ListItem>
        <ListItem className="col-1"/>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.mechanicalVentilation.currentCO2Performance)}
          text={subSystemComparisonData.mechanicalVentilation.currentCO2Performance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.mechanicalVentilation.potentialCO2BestInClass)}
          text={subSystemComparisonData.mechanicalVentilation.potentialCO2BestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-2">
          <ItemImg src={renewableImg} alt="Renewable" height="45px"/>
          <ItemImgSubTitle>Renewable</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.renewable.currentEnergyPerformance)}
          text={subSystemComparisonData.renewable.currentEnergyPerformance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.renewable.potentialBestInClass)}
          text={subSystemComparisonData.renewable.potentialBestInClass}/></ListItem>
        <ListItem className="col-1"/>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.renewable.currentCO2Performance)}
          text={subSystemComparisonData.renewable.currentCO2Performance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.renewable.potentialCO2BestInClass)}
          text={subSystemComparisonData.renewable.potentialCO2BestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-2">
          <ItemImg src={plugLoadsImg} alt="Plug Loads" height="45px"/>
          <ItemImgSubTitle>Plug Loads</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.plugLoads.currentEnergyPerformance)}
          text={subSystemComparisonData.plugLoads.currentEnergyPerformance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.plugLoads.potentialBestInClass)}
          text={subSystemComparisonData.plugLoads.potentialBestInClass}/></ListItem>
        <ListItem className="col-1"/>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.plugLoads.currentCO2Performance)}
          text={subSystemComparisonData.plugLoads.currentCO2Performance}/></ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.plugLoads.potentialCO2BestInClass)}
          text={subSystemComparisonData.plugLoads.potentialCO2BestInClass}/></ListItem>
      </ItemRow>

    </SubSystemComparisonWrapper>
  )
}

export default SubSystemComparison
