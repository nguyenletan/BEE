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
  const [isLoading, setIsLoading] = useState(false)

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

  const [generalBuildingInformation, setGeneralBuildingInformation] = useState(null)

  useEffect(() => {
    async function fetchAPI () {
      setIsLoading(true)
      const idToken = await user.getIdToken()
      const tmp = await getBuildingById(id, idToken)
      // console.log(tmp)
      setGeneralBuildingInformation(tmp)
      setIsLoading(false)
    }

    //  eslint-disable-next-line
    if (id < 3) {
      setGeneralBuildingInformation(BuildingInfoDataArray[id - 1])
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
      {isLoading ? (
        <BuildingWrapper>
          <div className="d-flex justify-content-start flex-wrap">
            <h2 className="skeleton-box skeleton-square-box2"/>
            <div>
              <p className="skeleton-box skeleton-header-box"/>
              <p className="skeleton-box skeleton-line-box"/>
              <p className="skeleton-box skeleton-line-box"/>

              <p className="skeleton-box skeleton-line-box2"/>
              <p className="skeleton-box skeleton-line-box2"/>

              <p className="skeleton-box skeleton-line-box3"/>
              <p className="skeleton-box skeleton-line-box3"/>
            </div>
          </div>
          <div className="d-flex justify-content-start flex-wrap mt-4">
            <p className="skeleton-box skeleton-header-box"/>
            <p className="skeleton-box skeleton-header-box"/>
            <p className="skeleton-box skeleton-header-box"/>
            <p className="skeleton-box skeleton-header-box"/>
            <p className="skeleton-box skeleton-header-box"/>
          </div>
          <div className="d-flex justify-content-start flex-wrap mt-3">
            <p className="skeleton-box skeleton-line-box3"/>
            <p className="skeleton-box skeleton-line-box3"/>
            <p className="skeleton-box skeleton-line-box4"/>
            <p className="skeleton-box skeleton-line-box4"/>
            <p className="skeleton-box skeleton-line-box4"/>
            <p className="skeleton-box skeleton-line-box4"/>
            <p className="skeleton-box skeleton-line-box4"/>
          </div>
        </BuildingWrapper>) : (
        <>
          {generalBuildingInformation && (
            id < 3 ? (
              <BuildingWrapper>
                <BuildingInfo
                  name={generalBuildingInformation.name}
                  image={generalBuildingInformation.image}
                  address={generalBuildingInformation.address}
                  useType={generalBuildingInformation.useType}
                  tfa={generalBuildingInformation.gfa}
                  tfaUnit={'m2'}
                  avgOccupancy={generalBuildingInformation.avgOccupancy}
                  storey={generalBuildingInformation.storey}
                  constructed={generalBuildingInformation.constructed}
                  greenBuildingRating={generalBuildingInformation.greenBuildingRating}
                  buildingInfoLastEdited={generalBuildingInformation.buildingInfoLastEdited}
                />

                <BuildingHistoricalNav/>

                <Switch>
                  <Route path={`${path}/energy-performance`}>
                    <EnergyPerformance data={generalBuildingInformation.energyPerformance}
                                       consumptionBreakdown={BuildingInfoDataArray[id -
                                       1].energyPerformance.breakDownConsumption}
                                       costBreakdown={BuildingInfoDataArray[id - 1].energyPerformance.breakDownCost}
                                       co2EmissionsBreakdown={BuildingInfoDataArray[id -
                                       1].energyPerformance.breakDownCO2Emissions}
                    />
                  </Route>
                  <Route path={`${path}/comparison`}>
                    <Comparison data={{ buildingName: generalBuildingInformation.name, id: id }}/>
                  </Route>
                  <Route path={`${path}/improve`}>
                    <Improve
                      consumptionBreakdown={BuildingInfoDataArray[id - 1].energyPerformance.breakDownConsumption}
                      costBreakdown={BuildingInfoDataArray[id - 1].energyPerformance.breakDownCost}
                      co2EmissionsBreakdown={BuildingInfoDataArray[id - 1].energyPerformance.breakDownCO2Emissions}
                      data={generalBuildingInformation.energyPerformance}/>
                  </Route>
                  <Route path={`${path}/asset-reliability`}>
                    <AssetReliability data={generalBuildingInformation.energyPerformance}/>
                  </Route>
                  <Redirect to={`${path}/energy-performance`}/>
                </Switch>
              </BuildingWrapper>

            ) : (

              <BuildingWrapper>

                <BuildingInfo
                  id={id}
                  propId={generalBuildingInformation.prop.propId}
                  name={generalBuildingInformation.prop.name}
                  image={generalBuildingInformation.prop.photo}
                  address={generalBuildingInformation.prop.streetAddress + ', ' + generalBuildingInformation.prop.city +
                  ', ' +
                  findCountryByCountryCode(generalBuildingInformation.prop.countryCode)?.name + ', ' +
                  generalBuildingInformation.prop.postCode}
                  useType={generalBuildingInformation.prop.useTypeName}
                  tfa={generalBuildingInformation.prop.grossInteriorArea}
                  tfaUnit={generalBuildingInformation.prop.grossInteriorAreaUnit}
                  storey={generalBuildingInformation.prop.storeysAboveGround +
                  generalBuildingInformation.prop.storeysBelowGround}
                  constructed={generalBuildingInformation.prop.completionYear + ' - ' +
                  (generalBuildingInformation.prop.completionYear + 10)}
                  greenBuildingRating={generalBuildingInformation.prop.sustainabilityRatingSchemeName + ' - ' +
                  generalBuildingInformation.prop.sustainabilityRatingName}
                  buildingInfoLastEdited={generalBuildingInformation.prop.updatedAt
                    ? printDateTime(generalBuildingInformation.prop.updatedAt, 'en-GB')
                    : printDateTime(generalBuildingInformation.prop.createdAt, 'en-GB')}
                  totalOperatingHours={generalBuildingInformation.totalOperatingHours}
                />

                <BuildingHistoricalNav/>

                <Switch>
                  <Route path={`${path}/energy-performance`}>
                    <EnergyPerformance electricConsumptions={generalBuildingInformation.electricConsumptions}
                                       annualCost={generalBuildingInformation.annualCost}
                                       annualConsumption={generalBuildingInformation.annualConsumption}
                                       annualCarbonEmissions={generalBuildingInformation.annualCarbonEmissions}
                                       lastMonthComparison={generalBuildingInformation.lastMonthComparison}
                                       annualCoolingSystemConsumption={generalBuildingInformation.annualCoolingSystemConsumption}
                                       annualHeatingSystemConsumption={generalBuildingInformation.annualHeatingSystemConsumption}
                                       annualMechanicalVentilationSystemConsumption={generalBuildingInformation.annualMechanicalVentilationSystemConsumption}
                                       annualLightingConsumption={generalBuildingInformation.annualLightingConsumption}
                                       pvSolarSystemLoad={generalBuildingInformation.pvSolarSystemLoad}
                                       periodOf12Month={generalBuildingInformation.periodOf12Month}
                                       consumptionBreakdown={generalBuildingInformation.consumptionBreakdown}
                                       costBreakdown={generalBuildingInformation.costBreakdown}
                                       co2EmissionsBreakdown={generalBuildingInformation.co2EmissionsBreakdown}
                                       incidentalGainsOtherInformation={generalBuildingInformation.incidentalGainsOtherInformation}
                    />
                  </Route>
                  <Route path={`${path}/comparison`}>
                    <Comparison data={{ buildingName: generalBuildingInformation.name, id: id }}/>
                  </Route>
                  <Route path={`${path}/improve`}>
                    <Improve consumptionBreakdown={generalBuildingInformation.consumptionBreakdown}
                             costBreakdown={generalBuildingInformation.costBreakdown}
                             co2EmissionsBreakdown={generalBuildingInformation.co2EmissionsBreakdown}
                             data={generalBuildingInformation.energyPerformance}/>
                  </Route>
                  <Route path={`${path}/asset-reliability`}>
                    <AssetReliability data={generalBuildingInformation.energyPerformance}/>
                  </Route>
                  <Redirect to={`${path}/energy-performance`}/>
                </Switch>

              </BuildingWrapper>
            )

          )}
        </>)}
    </>
  )
}

export default Building
