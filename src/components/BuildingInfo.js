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
`

const GeneralInformation = styled.section`
  margin-left: 10px;

`

const BuildingTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--primary);
  font-weight: 700;
  padding-left: 15px;
  
`

const BuildingAddress = styled.p`
  padding-left: 15px;
`

const BuildingLastEdited = styled.p`
  color: var(--gray);
  padding-left: 15px;
`

const BuildingInfo = (props) => {
  const { name, image, address, useType,gfa, avgOccupancy, storey, buildingInfoLastEdited, constructed, greenBuildingRating } = props
  return <BuildingInfoWrapper className="d-flex justify-content-left">
    <BuildingImage src={image}/>
    <GeneralInformation className="flex-grow-1">
      <BuildingTitle>{name}</BuildingTitle>
      <BuildingAddress className="ml-1 mb-2">{address}</BuildingAddress>
      <div className="row ml-1 mb-2">
        <div className="col-3">
          <p className="mb-1">Use Type</p>
          <p className="mb-0">{useType}</p>
        </div>
        <div className="col-3">
          <p className="mb-1">GFA</p>
          <p className="mb-0">{gfa}m2</p>
        </div>
        <div className="col-3">
          <p className="mb-1">Avg. Occupancy</p>
          <p className="mb-0">{avgOccupancy}%</p>
        </div>
      </div>

      <div className="row ml-1 mb-2">
        <div className="col-3">
          <p className="mb-1">Storey</p>
          <p className="mb-0">{storey}</p>
        </div>
        <div className="col-3">
          <p className="mb-1">Constructed</p>
          <p className="mb-0">{constructed}m2</p>
        </div>
        <div className="col-3">
          <p className="mb-1">Green Building Rating</p>
          <p className="mb-0">{greenBuildingRating}%</p>
        </div>
      </div>
      <BuildingLastEdited className="ml-1">Last Edited: {buildingInfoLastEdited}</BuildingLastEdited>
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