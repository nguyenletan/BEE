import React from 'react'
import styled from 'styled-components'
import home1Img from '../assets/images/home1.png'
import home2Img from '../assets/images/home2.png'
import plugLoadImg from '../assets/images/plug-load.png'



const IncidentalGainsWrapper = styled.div`
  width: 95%;
  margin: 0 auto 30px;
`

const IncidentalGainsTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 15px;
`

const IncidentalGainsList = styled.ul`
  list-style-type: none;
`

const IncidentalGainsItem = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px;
  width: 210px;
`

const IncidentalGainsItemTitle = styled.h5`
  font-size: 1rem;
  font-weight: 700;
`
const IncidentalGainsItemValue = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
`

const IncidentalGainsItemImage = styled.img`
  height: auto;
`

const IncidentalGains = (props) => {
  const {
    roof,
    wall,
    plugLoads,
    openings,
    floor
  } = props
  return (
    <IncidentalGainsWrapper>
      <IncidentalGainsTitle>Incidental Gains & Other Information</IncidentalGainsTitle>
      <IncidentalGainsList className="d-flex justify-content-between">

        <IncidentalGainsItem className="d-flex justify-content-between align-items-center">
          <div className="mr-1">
            <IncidentalGainsItemTitle>Roof</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{roof}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={home1Img} alt="Roof" width="33"/>
        </IncidentalGainsItem>

        <IncidentalGainsItem className="d-flex justify-content-between align-items-center">
          <div className="mr-3">
            <IncidentalGainsItemTitle>Wall</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{wall}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={home1Img} alt="Wall" width="33"/>
        </IncidentalGainsItem>

        <IncidentalGainsItem className="d-flex justify-content-between align-items-center">
          <div className="mr-3">
            <IncidentalGainsItemTitle>Openings</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{openings}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={home2Img} alt="Openings" width="33"/>
        </IncidentalGainsItem>

        <IncidentalGainsItem className="d-flex justify-content-between align-items-center">
          <div className="mr-3">
            <IncidentalGainsItemTitle>Floor</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{floor}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={home1Img} alt="Floor" width="33"/>
        </IncidentalGainsItem>

        <IncidentalGainsItem className="d-flex justify-content-between align-items-center">
          <div className="mr-3">
            <IncidentalGainsItemTitle>Plug Loads</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{plugLoads}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={plugLoadImg} alt="Plug Loads" width="33"/>
        </IncidentalGainsItem>

      </IncidentalGainsList>
    </IncidentalGainsWrapper>
  )
}

export default IncidentalGains