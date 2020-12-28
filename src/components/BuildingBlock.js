import React from 'react'
import { Address, BuildingImage, Title } from './BuildingBlockStyle'

const BuildingBlock = ({ data }) => {
  return <li>
    <BuildingImage src={data.photo} alt={data.title}>
    </BuildingImage>
    <Title>{data.title}</Title>
    <Address>{data.address}</Address>
  </li>
}

export default BuildingBlock