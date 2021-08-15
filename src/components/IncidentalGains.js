import React from 'react'
import styled from 'styled-components'
import roofImg from '../assets/images/roof.png'
import wallImg from '../assets/images/wall.png'
import floorImg from '../assets/images/floor.png'
import openingImg from '../assets/images/opening.png'
//import plugLoadImg from '../assets/images/plug-load.png'

const IncidentalGainsWrapper = styled.div`
  width: 100%;
  margin: 0 auto 30px;
`

const IncidentalGainsTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 15px;
`

const IncidentalGainsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  @media(min-width: 768px) {
    padding: 0 20px ;
  }
`

const IncidentalGainsItem = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px 20px;
  @media(min-width: 1024px) {
    margin-right: 0;
  }
`

const IncidentalGainsItemTitle = styled.h5`
  font-size: .95rem;
  font-weight: 500;
`
const IncidentalGainsItemValue = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--bs-primary);
`

const IncidentalGainsItemImage = styled.img`
  height: auto;
`

const IncidentalGains = (props) => {
  const {
    roof,
    wall,
    openings,
    floor
  } = props
  return (
    <IncidentalGainsWrapper>
      <IncidentalGainsTitle>Incidental Gains & Other Information</IncidentalGainsTitle>
      <IncidentalGainsList className='d-flex justify-content-start row'>

        <IncidentalGainsItem className='d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center me-2'>
          <div className='me-1'>
            <IncidentalGainsItemTitle>Roof</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{roof}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={roofImg} alt='Roof' width='33' />
        </IncidentalGainsItem>

        <IncidentalGainsItem className='d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center me-2'>
          <div className='me-3'>
            <IncidentalGainsItemTitle>Wall</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{wall}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={wallImg} alt='Wall' width='33' />
        </IncidentalGainsItem>

        <IncidentalGainsItem className='d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center me-2'>
          <div className='me-3'>
            <IncidentalGainsItemTitle>Openings</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{openings}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={openingImg} alt='Openings' width='33' />
        </IncidentalGainsItem>

        <IncidentalGainsItem className='d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center me-2'>
          <div className='me-3'>
            <IncidentalGainsItemTitle>Floor</IncidentalGainsItemTitle>
            <IncidentalGainsItemValue>{floor}W/m2</IncidentalGainsItemValue>
          </div>
          <IncidentalGainsItemImage src={floorImg} alt='Floor' width='33' />
        </IncidentalGainsItem>

        {/*<IncidentalGainsItem className='d-flex col col-6 col-lg-2 mb-3 mb-lg-0 justify-content-start align-items-center me-2'>*/}
        {/*  <div className='me-3'>*/}
        {/*    <IncidentalGainsItemTitle>Plug Loads</IncidentalGainsItemTitle>*/}
        {/*    <IncidentalGainsItemValue>{plugLoads}W/m2</IncidentalGainsItemValue>*/}
        {/*  </div>*/}
        {/*  <IncidentalGainsItemImage src={plugLoadImg} alt='Plug Loads' width='33' />*/}
        {/*</IncidentalGainsItem>*/}

      </IncidentalGainsList>
    </IncidentalGainsWrapper>
  )
}

export default IncidentalGains
