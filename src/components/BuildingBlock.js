import React from 'react'
import styled from 'styled-components'


const BuildingImage = styled.img`
  width: 270px;
  height: 150px;
  margin-right: 50px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 25px;
`

const Title = styled.h3`
  line-height: 1.2rem;
  margin-top: .5rem;
  font-weight: 700;
  font-size: 1.2rem;
`

const Address = styled.p`
  width: 280px;
`

const BuildingBlock = ({data}) => {
  return <li>
  <BuildingImage src={data.photo} alt={data.title}>
  </BuildingImage>
    <Title>{data.title}</Title>
    <Address>{data.address}</Address>
  </li>
}

export default BuildingBlock;