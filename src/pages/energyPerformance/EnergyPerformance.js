import React from 'react'
import styled from 'styled-components'
import image1 from '../../assets/images/building1.jpg'
import image2 from '../../assets/images/building2.jpg'
import image3 from '../../assets/images/building3.jpg'
import Header from '../../components/Header'
import BuildingInfo from '../../components/BuildingInfo'
import BuildingHistorical from '../../components/BuildingHistorical'
import { useParams } from 'react-router'
import BuildingHistoricalNav from '../../components/BuildingHistoricalNav'
import BreakDown from '../../components/BreakDown'
import ElectricalSystemInformation from '../../components/ElectricalSystemInformation'
import IncidentalGains from '../../components/IncidentalGains'

const EnergyPerformanceWrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
`

const EnergyPerformance = () => {

  const { id } = useParams()

  const BuildingInfoDataArray = [{
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
      pvSystemInstalledCapacity: 5
    },

    incidentalGains: {
      roof: 5,
      wall: 60,
      openings: 43,
      floor: 2.3,
      plugLoads: 5
    }
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
    }
  ]

  const BuildingInfoData = BuildingInfoDataArray[id - 1]

  return <>
    <Header/>

    <EnergyPerformanceWrapper className="">
      <BuildingInfo name={BuildingInfoData.name}
                    image={BuildingInfoData.image}
                    address={BuildingInfoData.address}
                    useType={BuildingInfoData.useType}
                    gfa={BuildingInfoData.gfa}
                    avgOccupancy={BuildingInfoData.avgOccupancy}
                    storey={BuildingInfoData.storey}
                    constructed={BuildingInfoData.constructed}
                    greenBuildingRating={BuildingInfoData.greenBuildingRating}
                    buildingInfoLastEdited={BuildingInfoData.buildingInfoLastEdited}
      />

      <BuildingHistoricalNav id={id}/>

      <BuildingHistorical/>

      <div className="d-flex mb-4">
        <BreakDown title="Consumption Breakdown"
                   subTitle="%"
                   data={BuildingInfoData.breakDownConsumption}
        />
        <BreakDown title="Cost Breakdown"
                   subTitle="%"
                   data={BuildingInfoData.breakDownCost}
        />
        <BreakDown title="CO2 Emissions Breakdown"
                   subTitle="%"
                   data={BuildingInfoData.breakDownCO2Emissions}
        />
      </div>

      <ElectricalSystemInformation
        overallCoolingLoad={BuildingInfoData.electricalSystemInformation.overallCoolingLoad}
        overallHeatingLoad={BuildingInfoData.electricalSystemInformation.overallHeatingLoad}
        overallLightingLoad={BuildingInfoData.electricalSystemInformation.overallLightingLoad}
        overallMechVentLoad={BuildingInfoData.electricalSystemInformation.overallMechVentLoad}
        pvSystemInstalledCapacity={BuildingInfoData.electricalSystemInformation.pvSystemInstalledCapacity}
      />

      <IncidentalGains
        roof={BuildingInfoData.incidentalGains.roof}
        openings={BuildingInfoData.incidentalGains.openings}
        wall={BuildingInfoData.incidentalGains.wall}
        floor={BuildingInfoData.incidentalGains.floor}
        plugLoads={BuildingInfoData.incidentalGains.plugLoads}
      />

    </EnergyPerformanceWrapper>
  </>
}

export default EnergyPerformance