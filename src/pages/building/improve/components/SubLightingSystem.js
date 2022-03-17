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
  height: 200px;
  //box-shadow: 5px 3px 15px 15px #fff7ed;
  &.LED {
    background: #d5dfa3;
   
  }
  border-radius: 4px;
  line-height: 1.75rem;
`

const Icon = styled.img`
  width: 81px;
  height: 81px;
  display: block;
  margin: 0 0 15px;
`

const Title = styled.h4`
  font-weight: 600;
  margin-bottom: .5rem;
`

const OldNumberBulbs = styled.span`
  text-decoration: line-through;
`

const SubLightingSystem = ({ data }) => {

  return (
    <Wrapper className={data.lightingFittingTypeId === 1 ? 'LED' : ''}>
      <Icon src={getLightingFittingTypeImage(data.lightingFittingTypeId)}></Icon>
      <Title>{getLightingFittingTypeName(data.lightingFittingTypeId)}</Title>
      <p>
        Number of Bulbs: <OldNumberBulbs>{data.numberOfBulbs}</OldNumberBulbs> => <strong>{
          data.lightingFittingTypeId !== 1
            ? data.numberOfBulbs - data.takeAwayBulbs
            : data.numberOfBulbs + data.addNewBulbs
      }</strong>
      </p>
      <p>Percentage ≈ {data.percentageOfFittingTypeUsed}%</p>
    </Wrapper>
  )
}

export default SubLightingSystem