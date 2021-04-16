import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DoubleDecliningBalanceDepreciation from './components/IssueDetail/DoubleDecliningBalanceDepreciation'
import EquipmentDetail from './components/IssueDetail/EquipmentDetail'
import IssueDetailOverall from './components/IssueDetail/IssueDetail'
import StraightLineDepreciation from './components/IssueDetail/StraightLineDepreciation'
import UnitsOfProductionDepreciation from './components/IssueDetail/UnitsOfProductionDepreciation'
import Obsolescence from './components/IssueDetail/Obsolescence'
import ObsolescenceMoreInfo from './components/IssueDetail/ObsolescenceMoreInfo'
import WallLineChart from './components/IssueDetail/WallLineChart'

const Breadcrumb = styled.div`
  margin-top: 20px;
`

const BreadcrumbItem = styled.a`
  line-height: 28px;
  color: var(--primary);
  cursor: pointer;
  margin-right: .3rem;
`

const BreadcrumbItemActive = styled.span`
  line-height: 28px;
  font-weight: 700;
  color: var(--primary);
`

const IssueDetail = ({ data }) => {

  const { id } = useParams()
  const history = useHistory()

  const annualMaintenanceCost = [
    {
      'id': 'Current',

      'data': [
        {
          'y': 750000,
          'x': -5
        },
        {
          'y': 850000,
          'x': -4
        },
        {
          'y': 960000,
          'x': -3
        },
        {
          'y': 1095000,
          'x': -2
        },
        {
          'y': 1200000,
          'x': -1
        },
        {
          'y': 1325000,
          'x': 0
        },
        {
          'y': 1500000,
          'x': 1
        },
        {
          'y': 1605000,
          'x': 2
        },
        {
          'y': 1750000,
          'x': 3
        },
        {
          'y': 1825000,
          'x': 4
        },
        {
          'y': 1900000,
          'x': 5
        },
      ]
    },
    {
      'id': 'Replacement',

      'data': [
        {
          'y': 300000,
          'x': 1
        },
        {
          'y': 405000,
          'x': 2
        },
        {
          'y': 501000,
          'x': 3
        },
        {
          'y': 582000,
          'x': 4
        },
        {
          'y': 690000,
          'x': 5
        },

      ]
    },
  ]

  const energyConsumption = [
    {
      'id': 'Current',

      'data': [
        {
          'y': 75,
          'x': -5
        },
        {
          'y': 85,
          'x': -4
        },
        {
          'y': 96,
          'x': -3
        },
        {
          'y': 109,
          'x': -2
        },
        {
          'y': 120,
          'x': -1
        },
        {
          'y': 132,
          'x': 0
        },
        {
          'y': 150,
          'x': 1
        },
        {
          'y': 160,
          'x': 2
        },
        {
          'y': 175,
          'x': 3
        },
        {
          'y': 182,
          'x': 4
        },
        {
          'y': 190,
          'x': 5
        },
      ]
    },
    {
      'id': 'Replacement',

      'data': [
        {
          'y': 30,
          'x': 0
        },
        {
          'y': 35,
          'x': 1
        },
        {
          'y': 40,
          'x': 2
        },
        {
          'y': 50,
          'x': 3
        },
        {
          'y': 58,
          'x': 4
        },
        {
          'y': 69,
          'x': 5
        },

      ]
    },
  ]

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem onClick={() => history.goBack()}><ArrowLeft
          color="#87972f" size={28}/> Asset Reliability /
        </BreadcrumbItem><BreadcrumbItemActive>{data[id].asset} Issue</BreadcrumbItemActive>
      </Breadcrumb>
      <div className="mt-5 row">
        <div className="col col-12 col-xl-4 mb-5">
          <IssueDetailOverall data={data[id]}/>
        </div>
        <div className="col col-12 col-xl-8">
          <EquipmentDetail/>
        </div>

      </div>

      <div className="mt-5 mb-5 row">
        <div className="col col-12 col-xl-4 mb-5">
          <StraightLineDepreciation/>
        </div>

        <div className="col col-12 col-xl-4 mb-5">
          <DoubleDecliningBalanceDepreciation/>
        </div>

        <div className="col col-12 col-xl-4 ">
          <UnitsOfProductionDepreciation/>
        </div>
      </div>


      <div className="row mt-5 mb-5">
        <div className="col col-12 col-xl-6 mb-5 mb-xl-0">
          <Obsolescence/>
        </div>
        <div className="col col-12 col-xl-6">
          <ObsolescenceMoreInfo/>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col col-12 col-xl-6">
          <WallLineChart title="Annual Maintenance Cost ($)" data={annualMaintenanceCost}/>
        </div>
        <div className="col col-12 col-xl-6">
          <WallLineChart title="Energy Consumption (MWh)" noWall={true} data={energyConsumption}/>
        </div>
      </div>
    </>
  )

}

export default IssueDetail
