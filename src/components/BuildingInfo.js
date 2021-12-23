import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { formatNumber } from 'Utilities'
import { Link } from 'react-router-dom'
import { findCountryNameByCountryCode } from 'reference-tables/Country'

import { useTranslation } from 'react-i18next'

const BuildingInfoWrapper = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
`

const BuildingImage = styled.img`
  width: 370px;
  border-radius: 15px;
  height: 288px;
  object-fit: cover;
  margin-top: 6px;
`

const GeneralInformation = styled.section`
  font-size: 1.1rem;
  margin-bottom: 15px;
  @media (min-width: 1024px) {
    padding-left: 10px;
  }
`

const Label = styled.label`
  color: var(--darkgray);
`

const BuildingTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--bs-primary);
  font-weight: 700;
  padding-left: 0;
  width: 100%;
  
  @media (min-width: 1024px) {
    padding-left: 15px;
    padding-bottom: .5em;
  }
`

const TypeCol = styled.p`
  display: inline;
  padding-right: .5em;
  @media (min-width: 740px) {
    display: block;
  }
`

const BuildingInfo = (props) => {
  const {
    id,
    name,
    image,
    streetNumber,
    streetName,
    city,
    state,
    countryCode,
    postCode,
    useType,
    tfa,
    tfaUnit,
    storey,
    buildingInfoLastEdited,
    email,
    constructed,
    greenBuildingRating,
    totalOperatingHours,
  } = props

  const { t, i18n } = useTranslation(['generalBuildingInformation', 'common']);
  const [countryName, setCountryName] = useState()

  useEffect(()=> {
    setCountryName(findCountryNameByCountryCode(countryCode, i18n.language))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, i18n.language])

  return (
    <BuildingInfoWrapper className="d-flex justify-content-start flex-wrap">
      <BuildingImage src={image}/>
      <GeneralInformation className="flex-grow-1">
        <BuildingTitle>{name}</BuildingTitle>

        <div className="row ms-2 mb-4 w-100">
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Building No')}.</Label> {streetNumber}</TypeCol>
            <TypeCol className="mb-0"><Label>State.</Label> {state}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Street')}.</Label> {streetName} </TypeCol>
            <TypeCol className="mb-0"><Label>{t('Post Code')}.</Label> {postCode}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-6">
            <TypeCol className="mb-1"><Label>{t('City')}.</Label> {city}</TypeCol>
            <TypeCol className="mb-0"><Label>{t('Country')}.</Label> {countryName}</TypeCol>
          </div>
        </div>

        <div className="row ms-2 mb-1 w-100">
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Use Type')}</Label></TypeCol>
            <TypeCol className="mb-0">{t(useType, {ns: 'common'})}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Total Floor Area (Internal)')}</Label></TypeCol>
            <TypeCol className="mb-0">{formatNumber(tfa, 0)} {tfaUnit}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-6">
            <TypeCol className="mb-1"><Label>{t('Green Building Rating')}</Label></TypeCol>
            <TypeCol className="mb-0">{greenBuildingRating}</TypeCol>
          </div>
        </div>

        <div className="row ms-2 mb-4 w-100">
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Storey')}</Label></TypeCol>
            <TypeCol className="mb-0">{storey}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Constructed')}</Label></TypeCol>
            <TypeCol className="mb-0">{constructed}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Total operating hours')}</Label></TypeCol>
            <TypeCol className="mb-0">{totalOperatingHours?.toFixed(0)}</TypeCol>
          </div>
        </div>

        <div className="row ms-2 w-100">
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Last Edited')}:</Label></TypeCol>
            <TypeCol className="mb-0">{buildingInfoLastEdited}</TypeCol>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <TypeCol className="mb-1"><Label>{t('Edited by')}:</Label></TypeCol>
            <TypeCol className="mb-0">{email}</TypeCol>
          </div>
        </div>

      </GeneralInformation>
      <div>
        <button className="btn btn-sm btn-outline-primary mt-3">
          <Link to={"/editing-building/" + id + "/general-information"} >{t('Edit')}</Link></button>
      </div>
    </BuildingInfoWrapper>
  )
}

BuildingInfo.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  useType: PropTypes.string.isRequired,
  gfa: PropTypes.number,
  avgOccupancy: PropTypes.number,
  storey: PropTypes.number,
  constructed: PropTypes.string,
  greenBuildingRating: PropTypes.string,
  buildingInfoLastEdited: PropTypes.string,
}

export default BuildingInfo
