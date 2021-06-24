import React from 'react'
import styled from 'styled-components'
import { getImpactTitle, getLikelihoodTitle, getSubSystemIcon } from '../../../../../Utilities'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px 30px 10px 30px;
  //min-width: 400px;
  
`

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`

const RowItem =styled.div`
  font-size: .9rem;
`

const RowItemTitle =styled.h5`
  width: 100px;
  font-size: .9rem;
  margin-bottom: .2rem;
  margin-right: .5rem;
`

const RowItemValue =styled.p`
  color: var(--bs-primary);
  display: flex;
  font-size: 1.1rem;
  font-weight: 500;
`
const Image = styled.img`
  margin-right: .5rem;
`

const IssueDetailOverall =({data}) => {

  const subSystemIconObj = getSubSystemIcon(data.subSystem)

  console.log(subSystemIconObj)

  return (
    <Wrapper>
      <Title>Potential {data.asset} issue</Title>
      <RowItem className="d-flex justify-content-start">
        <div className="me-5 d-flex flex-column">
          <RowItemTitle>System</RowItemTitle>
          <RowItemValue>
            <Image src={subSystemIconObj.imgSrc} alt={data.subSystem} width={subSystemIconObj.width}/>
            <span>{data.subSystem}</span></RowItemValue>
        </div>
        <div>
          <RowItemTitle>Asset</RowItemTitle>
          <RowItemValue>{data.asset}</RowItemValue>
        </div>
      </RowItem>
      <RowItem className="d-flex justify-content-start">
        <div className="me-5 d-flex flex-column">
          <RowItemTitle>Asset ID</RowItemTitle>
          <RowItemValue>{data.id}</RowItemValue>
        </div>
        <div>
          <RowItemTitle>Part</RowItemTitle>
          <RowItemValue>{data.fault}</RowItemValue>
        </div>
      </RowItem>
      <RowItem className="d-flex justify-content-start">
        <div className="me-4 d-flex flex-column">
          <RowItemTitle>Likelihood</RowItemTitle>
          <RowItemValue>{getLikelihoodTitle(data.likelihood)}</RowItemValue>
        </div>
        <div>
          <RowItemTitle>Impact</RowItemTitle>
          <RowItemValue>{getImpactTitle(data.impact)}</RowItemValue>
        </div>
      </RowItem>
      <RowItem className="d-flex justify-content-start">
        <div className="d-flex flex-column">
          <RowItemTitle>Potential Downtime (Days)</RowItemTitle>
          <RowItemValue>{data.potentialDownTime}</RowItemValue>
        </div>
        <div>
          <RowItemTitle>SpareParts Lead Time (Days)</RowItemTitle>
          <RowItemValue>{data.sparePartsLeadTime}</RowItemValue>
        </div>
        <div>
          <RowItemTitle>Estimated Time To Failure (Days)</RowItemTitle>
          <RowItemValue>{data.estimatedTimeToFailure}</RowItemValue>
        </div>
      </RowItem>
    </Wrapper>
  )
}

export default IssueDetailOverall
