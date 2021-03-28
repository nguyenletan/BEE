import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DoubleDecliningBalanceDepreciation
  from './components/IssueDetail/DoubleDecliningBalanceDepreciation'
import EquipmentDetail from './components/IssueDetail/EquipmentDetail'
import IssueDetailOverall from './components/IssueDetail/IssueDetail'
import StraightLineDepreciation
  from './components/IssueDetail/StraightLineDepreciation'
import UnitsOfProductionDepreciation
  from './components/IssueDetail/UnitsOfProductionDepreciation'

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
    </>
  )
  
}

export default IssueDetail
