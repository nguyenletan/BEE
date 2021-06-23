import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BuildingInfoWrapper = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
`

const BuildingImage = styled.img`
  width: 320px;
  border-radius: 15px;
  height: 219px;
  margin-bottom: 30px;
`

const GeneralInformation = styled.section`
  @media (min-width: 1024px) {
    padding-left: 10px;
  }
`

const BuildingTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--bs-primary);
  font-weight: 700;
  padding-left: 0px;
  width: 100%;


  @media (min-width: 1024px) {
    padding-left: 15px;
    padding-bottom: .5em;
  }
`

const BuildingAddress = styled.p`
  padding-left: 15px;
  width: 100%;
  @media (min-width: 1024px) {
  }
`

const BuildingLastEdited = styled.p`
  color: var(--gray);
  padding-left: 15px;
`

const TypeCol = styled.p`
  display: inline;
  padding-right: .5em;
  @media (min-width: 740px) {
    display: block;
  }
`


const BuildingInfo = (props) => {
  const { name, image, address, useType,gfa, avgOccupancy, storey, buildingInfoLastEdited, constructed, greenBuildingRating } = props
  return <BuildingInfoWrapper className="d-flex justify-content-start flex-wrap">
    <BuildingImage src={image}/>
    <GeneralInformation className="flex-grow-1">
      <BuildingTitle>{name}</BuildingTitle>
      <BuildingAddress className="ms-1 mb-2">{address}</BuildingAddress>
      <div className="row mư-1 mb-2 w-100">
        <div className="col-12 col-md-4 col-lg-3">
          <TypeCol className="mb-1">Use Type</TypeCol>
          <TypeCol className="mb-0">{useType}</TypeCol>
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <TypeCol className="mb-1">GFA</TypeCol>
          <TypeCol className="mb-0">{gfa}m2</TypeCol>
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <TypeCol className="mb-1">Avg. Occupancy</TypeCol>
          <TypeCol className="mb-0">{avgOccupancy}%</TypeCol>
        </div>
      </div>

      <div className="row ms-1 mb-2">
        <div className="col-12 col-md-4 col-lg-3">
          <TypeCol className="mb-1">Storey</TypeCol>
          <TypeCol className="mb-0">{storey}</TypeCol>
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <TypeCol className="mb-1">Constructed</TypeCol>
          <TypeCol className="mb-0">{constructed}m2</TypeCol>
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <TypeCol className="mb-1">Green Building Rating</TypeCol>
          <TypeCol className="mb-0">{greenBuildingRating}</TypeCol>
        </div>
      </div>
      <BuildingLastEdited className="ms-1">Last Edited: {buildingInfoLastEdited}</BuildingLastEdited>
    </GeneralInformation>
  </BuildingInfoWrapper>

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
  buildingInfoLastEdited: PropTypes.string
}

export default BuildingInfo