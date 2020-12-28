import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '../../components/Header'
import buildingImage1 from '../../assets/images/building1.jpg'
import buildingImage2 from '../../assets/images/building2.jpg'
import buildingImage3 from '../../assets/images/building3.jpg'
import BuildingBlock from '../../components/BuildingBlock'
import { AddBuildingText, AddingIcon, BuildingBlocks, Description, PortfolioWrapper } from './PortfolioStyle'

const buildingData = [
  {
    id: 1,
    title: 'Design Excellent Center',
    address: '555 Lefty Road, Rungapore 256969',
    photo: buildingImage1
  },
  {
    id: 2,
    title: 'Design Excellent Center',
    address: '21 Hill Bay Boulevard, Rungapore 784398',
    photo: buildingImage2
  }, {
    id: 3,
    title: 'People Square Middle',
    address: 'People Square Middle, 18 Plus Street, Rungapore 239475',
    photo: buildingImage3
  }
]

const Portfolio = () => {
  const blocks = buildingData.map(data => {
    return <BuildingBlock data={data} key={data.id}/>
  })
  return <>
    <Header/>
    <PortfolioWrapper className="container-fluid container-md">

      <div className="d-flex justify-content-between">
        <Description className="">Please select a building to see it’s energy performance and asset
          health</Description>

        <div>
          <AddBuildingText className="text-primary font-weight-bold">Add building</AddBuildingText>
          <AddingIcon className="bi bi-plus-circle-fill"/>
        </div>
      </div>

      <BuildingBlocks className="d-flex justify-content-start flex-wrap">
        {blocks}
      </BuildingBlocks>
    </PortfolioWrapper>
  </>

}

export default Portfolio