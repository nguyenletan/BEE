import React from 'react'
import styled from 'styled-components'
import image1 from "../../assets/images/building1.jpg"
import image2 from "../../assets/images/building2.jpg"
import image3 from "../../assets/images/building3.jpg"
import Header from '../../components/Header'
import BuildingInfo from '../../components/BuildingInfo'
import BuildingHistorical from '../../components/BuildingHistorical'
import { useParams } from 'react-router'
import BuildingHistoricalNav from '../../components/BuildingHistoricalNav'

const EnergyPerformanceWrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
`



const EnergyPerformance = () => {

  const  { id } = useParams();

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
    buildingInfoLastEdited: '25/03/2020'
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
      buildingInfoLastEdited: '25/03/2020'
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
      buildingInfoLastEdited: '25/03/2020'
    }

  ]


  const BuildingInfoData = BuildingInfoDataArray[id-1]
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
    </EnergyPerformanceWrapper>


  </>
}

export default EnergyPerformance