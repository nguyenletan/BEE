import React from 'react'
import styled from 'styled-components'
import roofImg from '../../../../assets/images/roof.png'
import wallImg from '../../../../assets/images/wall.png'
import openingsImg from '../../../../assets/images/opening.png'
import floorImg from '../../../../assets/images/floor.png'
import { getCurrentColor } from '../../../../Utilities'
import EnergySquare from './EnergySquare'

const FacilityEnvelopeElementsComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const FacilityEnvelopeElementsComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
  margin-right: 20px;
`

const ListHeader = styled.div`
  font-size: 0.85rem;
  margin: auto;
  text-align: center;
`

const ListItem = styled.div`
  font-size: 0.85rem;
  margin: auto;
  text-align: center;
`

const ItemImg = styled.img`
  width: 63px;
  display: block;
`

const ItemImgSubTitle = styled.span`
  font-size: 0.7rem;
  display: block;
  margin: auto;
`

const ItemRow = styled.div`
  margin-bottom: 20px;
  padding: 5px;
  &:hover {
    box-shadow: 1px 1px 5px 3px #ddd;
  }
`

const FacilityEnvelopeElementsComparison = () => {

  const facilityEnvelopeComparisonData = {
    roof: { current: 'C', potentialBestInClass: 'A' },
    wall: { current: 'D', potentialBestInClass: 'B' },
    openings: { current: 'C', potentialBestInClass: 'B' },
    floor: { current: 'E', potentialBestInClass: 'C' },
  }

  return (
    <FacilityEnvelopeElementsComparisonWrapper>
      <FacilityEnvelopeElementsComparisonTitle>Facility Envelope Elements
        Comparison</FacilityEnvelopeElementsComparisonTitle>

      <ItemRow className="row">
        <ListHeader className="col-4"/>
        <ListHeader className="col-4">Current Energy Performance</ListHeader>
        <ListHeader className="col-4">Potential<br/>Best-in-class</ListHeader>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-4">
          <ItemImg src={roofImg} alt="Roof"/>
          <ItemImgSubTitle>Roof</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-4"><EnergySquare color={getCurrentColor(facilityEnvelopeComparisonData.roof.current)}
                                                  text={facilityEnvelopeComparisonData.roof.current}/></ListItem>
        <ListItem className="col-4"><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.roof.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.roof.potentialBestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-4">
          <ItemImg src={wallImg} alt="Wall"/>
          <ItemImgSubTitle>Wall</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-4"><EnergySquare color={getCurrentColor(facilityEnvelopeComparisonData.wall.current)}
                                                  text={facilityEnvelopeComparisonData.wall.current}/></ListItem>
        <ListItem className="col-4"><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.wall.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.wall.potentialBestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-4">
          <ItemImg src={openingsImg} alt="openings"/>
          <ItemImgSubTitle>Openings</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-4"><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.openings.current)}
          text={facilityEnvelopeComparisonData.openings.current}/></ListItem>
        <ListItem className="col-4"><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.openings.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.openings.potentialBestInClass}/></ListItem>
      </ItemRow>

      <ItemRow className="row">
        <ListItem className="col-4">
          <ItemImg src={floorImg} alt="floor"/>
          <ItemImgSubTitle>floor</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-4"><EnergySquare color={getCurrentColor(facilityEnvelopeComparisonData.floor.current)}
                                                  text={facilityEnvelopeComparisonData.floor.current}/></ListItem>
        <ListItem className="col-4"><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.floor.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.floor.potentialBestInClass}/></ListItem>
      </ItemRow>
    </FacilityEnvelopeElementsComparisonWrapper>
  )
}

export default FacilityEnvelopeElementsComparison
