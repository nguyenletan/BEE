import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import image1 from '../../assets/images/building1.jpg'
import image2 from '../../assets/images/building2.jpg'
import image3 from '../../assets/images/building3.jpg'
import Header from '../../components/Header'
import BuildingInfo from '../../components/BuildingInfo'
import { useParams } from 'react-router'
import BuildingHistoricalNav from '../../components/BuildingHistoricalNav'
import EnergyPerformance from './energyPerformance/EnergyPerformance'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Comparison from './comparision/Comparison'
import Improve from './improve/Improve'
import AssetReliability from './assetReliability/AssetReliability'
import { getBuildingById } from '../../api/BuildidingAPI'
import { useAuth } from '../../AuthenticateProvider'
import { findCountryByCountryCode } from '../../reference-tables/Country'
import { printDateTime } from '../../Utilities'

const BuildingWrapper = styled.div`

  @media (min-width: 1440px) {
    margin-left: 100px;
    margin-right: 100px;
  }
`

const Building = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const BuildingInfoDataArray = [
    {
      name: 'Design Excellence Center',
      image: image1,
      address: 'Neue Straße 111, 99999 Musterstadt',
      useType: 'Office',
      gfa: 25949,
      avgOccupancy: 90,
      storey: 7,
      constructed: '1980-1990',
      greenBuildingRating: 'LEED Gold',
      buildingInfoLastEdited: '25/03/2020',
      energyPerformance: {

        breakDownConsumption: [
          { id: 'cooling', value: 15, color: '#636c2e' },
          { id: 'heating', value: 39, color: '#87972f' },
          { id: 'lighting', value: 28, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 11, color: '#c1cf74' },
          { id: 'others', value: 8, color: '#d5dfa3' }],
        breakDownCost: [
          { id: 'cooling', value: 22, color: '#636c2e' },
          { id: 'heating', value: 12, color: '#87972f' },
          { id: 'lighting', value: 39, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 10, color: '#d5dfa3' }],
        breakDownCO2Emissions: [
          { id: 'cooling', value: 20, color: '#636c2e' },
          { id: 'heating', value: 19, color: '#87972f' },
          { id: 'lighting', value: 37, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 9, color: '#d5dfa3' }],

        electricalSystemInformation: {
          overallCoolingLoad: 5,
          overallHeatingLoad: 60,
          overallLightingLoad: 43,
          overallMechVentLoad: 2.3,
          pvSystemInstalledCapacity: 5,
        },

        incidentalGains: {
          roof: 5,
          wall: 60,
          openings: 43,
          floor: 2.3,
          plugLoads: 5,
        },
      },
    },
    {
      name: 'Hill Bay Central Bank',
      image: image2,
      address: '21 Hill Bay Boulevard, Rungapore 784398',
      useType: 'Office',
      gfa: 25949,
      avgOccupancy: 90,
      storey: 7,
      constructed: '1980-1990',
      greenBuildingRating: 'LEED Gold',
      buildingInfoLastEdited: '25/03/2020',
      energyPerformance: {
        breakDownConsumption: [
          { id: 'cooling', value: 15, color: '#636c2e' },
          { id: 'heating', value: 39, color: '#87972f' },
          { id: 'lighting', value: 28, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 11, color: '#c1cf74' },
          { id: 'others', value: 8, color: '#d5dfa3' }],
        breakDownCost: [
          { id: 'cooling', value: 22, color: '#636c2e' },
          { id: 'heating', value: 12, color: '#87972f' },
          { id: 'lighting', value: 39, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 10, color: '#d5dfa3' }],
        breakDownCO2Emissions: [
          { id: 'cooling', value: 20, color: '#636c2e' },
          { id: 'heating', value: 19, color: '#87972f' },
          { id: 'lighting', value: 37, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 9, color: '#d5dfa3' }],

        electricalSystemInformation: {
          overallCoolingLoad: 5,
          overallHeatingLoad: 60,
          overallLightingLoad: 43,
          overallMechVentLoad: 2.3,
          pvSystemInstalledCapacity: 5,
        },

        incidentalGains: {
          roof: 5,
          wall: 60,
          openings: 43,
          floor: 2.3,
          plugLoads: 5,
        },
      },
    },
    {
      name: 'People Square Middle',
      image: image3,
      address: 'People Square Middle, 18 Plus Street, Rungapore 239475',
      useType: 'Office',
      gfa: 25949,
      avgOccupancy: 90,
      storey: 7,
      constructed: '1980-1990',
      greenBuildingRating: 'LEED Gold',
      buildingInfoLastEdited: '25/03/2020',
      energyPerformance: {
        breakDownConsumption: [
          { id: 'cooling', value: 15, color: '#636c2e' },
          { id: 'heating', value: 39, color: '#87972f' },
          { id: 'lighting', value: 28, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 11, color: '#c1cf74' },
          { id: 'others', value: 8, color: '#d5dfa3' }],
        breakDownCost: [
          { id: 'cooling', value: 22, color: '#636c2e' },
          { id: 'heating', value: 12, color: '#87972f' },
          { id: 'lighting', value: 39, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 10, color: '#d5dfa3' }],
        breakDownCO2Emissions: [
          { id: 'cooling', value: 20, color: '#636c2e' },
          { id: 'heating', value: 19, color: '#87972f' },
          { id: 'lighting', value: 37, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 9, color: '#d5dfa3' }],

        electricalSystemInformation: {
          overallCoolingLoad: 5,
          overallHeatingLoad: 60,
          overallLightingLoad: 43,
          overallMechVentLoad: 2.3,
          pvSystemInstalledCapacity: 5,
        },

        incidentalGains: {
          roof: 5,
          wall: 60,
          openings: 43,
          floor: 2.3,
          plugLoads: 5,
        },
      },

    },
  ]

  const [building, setBuilding] = useState(null)

  useEffect(() => {
    async function fetchAPI () {
      const idToken = await user.getIdToken()
      const tmp = await getBuildingById(id, idToken)
      console.log(tmp)
      setBuilding(tmp)
    }

    //  eslint-disable-next-line
    if (id < 3) {
      setBuilding(BuildingInfoDataArray[id - 1])
    } else {
      fetchAPI()
    }
    //  eslint-disable-next-line
  }, [])

  //const BuildingInfoData = id < 3 ? BuildingInfoDataArray[id - 1] : null

  const { path } = useRouteMatch()
  return (
    <>
      <Header/>
      {building && (
        id < 3 ? (
          <BuildingWrapper>
            <BuildingInfo
              name={building.name}
              image={building.image}
              address={building.address}
              useType={building.useType}
              tfa={building.gfa}
              tfaUnit={'m2'}
              avgOccupancy={building.avgOccupancy}
              storey={building.storey}
              constructed={building.constructed}
              greenBuildingRating={building.greenBuildingRating}
              buildingInfoLastEdited={building.buildingInfoLastEdited}
            />

            <BuildingHistoricalNav/>

            <Switch>
              <Route path={`${path}/energy-performance`}>
                <EnergyPerformance data={building.energyPerformance}/>
              </Route>
              <Route path={`${path}/comparison`}>
                <Comparison data={{ buildingName: building.name, id: id }}/>
              </Route>
              <Route path={`${path}/improve`}>
                <Improve data={building.energyPerformance}/>
              </Route>
              <Route path={`${path}/asset-reliability`}>
                <AssetReliability data={building.energyPerformance}/>
              </Route>
              <Redirect to={`${path}/energy-performance`}/>
            </Switch>
          </BuildingWrapper>

        ) : (
          <BuildingWrapper>
            <BuildingInfo
              name={building.name}
              image={building.photo}
              address={building.streetAddress + ', ' + building.city + ', ' +
              findCountryByCountryCode(building.countryCode)?.name + ', ' + building.postCode}
              useType={building.useTypeName}
              tfa={building.grossInteriorArea}
              tfaUnit={building.grossInteriorAreaUnit}
              storey={building.storeysAboveGround + building.storeysBelowGround}
              constructed={building.completionYear}
              greenBuildingRating={building.sustainabilityRatingSchemeName + ' / ' + building.sustainabilityRatingName}
              buildingInfoLastEdited={building.updatedAt
                ? printDateTime(building.updatedAt, 'en-GB')
                : printDateTime(building.createdAt, 'en-GB')}
            />

            <BuildingHistoricalNav/>

            <Switch>
              <Route path={`${path}/energy-performance`}>
                <EnergyPerformance data={building?.energyPerformance}/>
              </Route>
              <Route path={`${path}/comparison`}>
                <Comparison data={{ buildingName: building.name, id: id }}/>
              </Route>
              <Route path={`${path}/improve`}>
                <Improve data={building.energyPerformance}/>
              </Route>
              <Route path={`${path}/asset-reliability`}>
                <AssetReliability data={building.energyPerformance}/>
              </Route>
              <Redirect to={`${path}/energy-performance`}/>
            </Switch>

          </BuildingWrapper>
        )

      )}
    </>
  )
}

export default Building
