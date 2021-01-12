import React from 'react'
import { Address, BuildingImage, Title } from './BuildingBlockStyle'
import { Link } from 'react-router-dom'

const BuildingBlock = ({ data }) => {
  return <li>
    <Link to={'/building/' + data.id}>
      <BuildingImage src={data.photo} alt={data.title}>
      </BuildingImage>
      <Title>{data.title}</Title>
      <Address>{data.address}</Address>
    </Link>
  </li>
}

export default BuildingBlock