import React, { useEffect, useState } from 'react'
import { Address, BuildingImage, Title } from './BuildingBlockStyle'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BuildingBlock = ({ data }) => {

  const [address, setAddress] = useState('');
  const { i18n } = useTranslation();

  useEffect(()=> {
    if(i18n.language === 'de') {
      setAddress(`${data.streetName} ${data.streetNumber}`)
    } else {
      setAddress(`${data.streetNumber} ${data.streetName}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, i18n.language])

  const url = data.statusId === 3 ? `/editing-building/${data.id}/general-information/` : `/building/${data.id}`
  return (
    <li>
      <Link to={url}>
        <BuildingImage className="shadow-lg" src={data.photo} alt={data.title} />
        <Title>{data.title}</Title>
        <Address>{address}</Address>
      </Link>
    </li>
  )
}

export default BuildingBlock
