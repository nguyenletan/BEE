import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '../../components/Header'
import BuildingBlock from '../../components/BuildingBlock'
import { AddBuildingText, AddingIcon, BuildingBlocks, Description, PortfolioWrapper } from './PortfolioStyle'
import { Link } from 'react-router-dom'
import { getAllBuilding } from '../../api/BuildidingAPI'
import { useAuth } from '../../AuthenticateProvider'


const BuildingListBlocks = ({ buildings }) => {

  const buildingList = buildings?.map(b => {
    return <BuildingBlock key={b.id} data={{ address: b.streetAddress, photo: b.photo, id: b.id, title: b.name }}/>
  })

  return (
    <BuildingBlocks className="d-flex justify-content-center justify-content-md-start flex-wrap mb-3">
      {buildingList}
    </BuildingBlocks>
  )
}

const Portfolio = () => {

  const { user } = useAuth()

  const [buildings, setBuildings] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchMyAPI () {
      setIsLoading(true)
      const idToken = await user.getIdToken()
      const tmp = await getAllBuilding(idToken)
      setBuildings(tmp)
      setIsLoading(false)
    }

    //  eslint-disable-next-line
    fetchMyAPI()
    //  eslint-disable-next-line
  }, [])


  return (
    <>
      <Header/>
      <PortfolioWrapper className="container-fluid container-md">

        <div className="d-flex justify-content-between">
          <Description className="">Please select a building to see it’s energy performance and asset
            health
          </Description>

          <div>
            <Link to="/adding-building">
              <AddBuildingText className="text-primary font-weight-bold">Add building</AddBuildingText>
              <AddingIcon className="bi bi-plus-circle-fill"/>
            </Link>
          </div>
        </div>
        {isLoading ? (
            <div className="d-flex justify-content-center justify-content-md-start flex-wrap">
              <div>
                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                <h2 className="skeleton-box skeleton-square-box shadow-sm"/>
                <p className="skeleton-box skeleton-line-box"/>
                <p className="skeleton-box skeleton-line-box2"/>
              </div>
              <div>
                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                <h2 className="skeleton-box skeleton-square-box shadow-sm"/>
                <p className="skeleton-box skeleton-line-box"/>
                <p className="skeleton-box skeleton-line-box2 "/>
              </div>
              <div>
                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                <h2 className="skeleton-box skeleton-square-box shadow-sm"/>
                <p className="skeleton-box skeleton-line-box "/>
                <p className="skeleton-box skeleton-line-box2 "/>
              </div>
            </div>) :
          <BuildingListBlocks buildings={buildings}/>}

      </PortfolioWrapper>

    </>
  )
}

export default Portfolio
