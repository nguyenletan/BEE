/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '../../components/Header'
import BuildingBlock from '../../components/BuildingBlock'
import {
  AddBuildingText,
  AddingIcon,
  BuildingBlocks,
  Description,
  PortfolioWrapper,
} from './PortfolioStyle'
import { Link } from 'react-router-dom'
import { getAllBuilding } from 'api/BuildidingAPI'
import { useAuth } from 'AuthenticateProvider'
import { useTranslation } from 'react-i18next'
import { trackingUser } from 'api/UserAPI'

const BuildingListBlocks = ({ buildings }) => {

  console.log(buildings)

  const buildingList = buildings?.map(b => {
    return <BuildingBlock key={b.id} data={{
      streetNumber: b.streetNumber,
      streetName: b.streetName,
      photo: b.photo,
      id: b.id,
      title: b.name,
      statusId: b.statusId,
    }}/>
  })

  return (
    <BuildingBlocks
      className="d-flex justify-content-center justify-content-md-start flex-wrap mb-3">
      {buildingList}
    </BuildingBlocks>
  )
}

const Portfolio = () => {
  const { t } = useTranslation('portfolio')
  const { user } = useAuth()

  const [buildings, setBuildings] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchMyAPI () {
      setIsLoading(true)
      const idToken = await user.getIdToken()

      //setUser(user.)
      const tmp = await getAllBuilding(idToken)
      setBuildings(tmp)
      setIsLoading(false)
    }

    //  eslint-disable-next-line
    fetchMyAPI()

    //  eslint-disable-next-line
    async function tracking () {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Portfolio', idToken)
    }

    tracking()
  }, [])

  return (
    <>
      <Header/>
      <PortfolioWrapper className="container-fluid container-md">

        <div className="d-flex justify-content-between">
          <Description className="">{t(
            'Please select a building to see it’s energy performance and asset health')}</Description>

          <div>
            <Link to="/adding-building">
              <AddBuildingText className="text-primary font-weight-bold">{t(
                'Add building')}</AddBuildingText>
              <AddingIcon className="bi bi-plus-circle-fill"/>
            </Link>
          </div>
        </div>
        {isLoading ? (
            <div
              className="d-flex justify-content-center justify-content-md-start flex-wrap">
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
          <><BuildingListBlocks
            buildings={buildings?.filter(b => b.statusId === 2)}/>
            <h3 className="bold display-6 mt-5 color-primary">Temporary
              Building</h3>
            <BuildingListBlocks
              buildings={buildings?.filter(b => b.statusId === 3)}/>
          </>}

      </PortfolioWrapper>

    </>
  )
}

export default Portfolio
