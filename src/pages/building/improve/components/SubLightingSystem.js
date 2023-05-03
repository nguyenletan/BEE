import React from 'react'

import styled from 'styled-components'
import {
  getLightingFittingTypeImage,
  getLightingFittingTypeName,
} from 'reference-tables/LightingFittingType'

const Wrapper = styled.section`
  //border: 1px solid var(--bs-primary);
  //display: block;
  padding: 15px;
  font-size: 0.95rem;
  background: #fdba74;
  width: 200px;
  height: 225px;
  //box-shadow: 5px 3px 15px 15px #fff7ed;
  &.LED {
    background: #d5dfa3;
   
  }
  border-radius: 4px;
  line-height: 1.75rem;
`

const Icon = styled.img`
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 0 15px;
`

const Title = styled.h4`
  font-weight: 600;
  margin-bottom: .5rem;
  font-size: 1.2rem;
  height: 2.75rem ;
`

const OldNumberBulbs = styled.span`
  text-decoration: line-through;
`

const NewNumberBulbs = styled.span`
  color: #636c2e;
  font-weight: 700;
  font-size: 1.25rem;
`

const SubLightingSystem = ({ data }) => {

  return (
    <Wrapper className={data.lightingFittingTypeId === 1 ? 'LED' : ''}>
      <Icon src={getLightingFittingTypeImage(data.lightingFittingTypeId)}></Icon>
      <Title>{getLightingFittingTypeName(data.lightingFittingTypeId)}</Title>
      <p>
        Current: <OldNumberBulbs>{data.numberOfBulbs}</OldNumberBulbs> Bulbs <br/>
        New: <NewNumberBulbs>{
            data.lightingFittingTypeId !== 1
              ? data.numberOfBulbs - data.takeAwayBulbs
              : data.numberOfBulbs + data.addNewBulbs
        }</NewNumberBulbs> Bulbs
      </p>
      <p>Percentage ≈ {data.percentageOfFittingTypeUsed}%</p>
    </Wrapper>
  )
}

export default SubLightingSystem