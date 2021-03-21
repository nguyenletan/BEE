import React from 'react'
import IssueDetailOverall from './components/IssueDetail/IssueDetail'
import { useParams } from 'react-router'
import EquipmentDetail from './components/IssueDetail/EquipmentDetail'
import StraightLineDepreciation from './components/IssueDetail/StraightLineDepreciation'

const IssueDetail = ({ data }) => {

  const { id } = useParams()

  console.log(data[id])

  return (
    <>
      <div className="mt-5 row">
        <div className="col col-12 col-lg-4 ">
          <IssueDetailOverall data={data[id]}/>
        </div>
        <div className="col col-12 col-lg-8">
          <EquipmentDetail/>
        </div>

      </div>

      <div className="mt-5 mb-5 row">
        <div className="col col-12 col-lg-4 ">
          <StraightLineDepreciation/>
        </div>

        <div className="col col-12 col-lg-4 ">

        </div>

        <div className="col col-12 col-lg-4 ">

        </div>
      </div>
    </>
  )

}

export default IssueDetail