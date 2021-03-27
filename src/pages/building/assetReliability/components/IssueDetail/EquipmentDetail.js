import React from 'react'
import styled from 'styled-components'
import plusminusSVG from '../../../../../assets/images/plusminus.svg'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
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
  width: 180px;
  font-size: .9rem;
  margin-bottom: .2rem;
  margin-right: .5rem;
`

const RowItemValue =styled.p`
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
`
const Button = styled.button`
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: capitalize;
  a {
    color: white !important;
  }
`

const Calculator = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
  width: 40px;
`

const PlusMinusImg = styled.img`
  
`

const EquipmentDetail = ({data}) => {

  return (
    <Wrapper>
      <Title>Equipment Details</Title>
      <div className="row">
        <div className="col-6">
          <RowItem className="d-flex justify-content-start">
            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Asset Age (Years)</RowItemTitle>
              <RowItemValue>16</RowItemValue>
            </div>
            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Expected Life (Years)</RowItemTitle>
              <RowItemValue>20</RowItemValue>
            </div>
          </RowItem>
          <RowItem className="d-flex justify-content-start align-items-start">
            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Estimated Net Present Value ($)</RowItemTitle>
              <RowItemValue>680,000</RowItemValue>
            </div>
            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Depreciating %</RowItemTitle>
              <RowItemValue>80</RowItemValue>
            </div>
          </RowItem>

          <strong className="mb-2 d-block">Maintenance</strong>

          <RowItem className="d-flex justify-content-start">
            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Yearly Maintenance cost ($)</RowItemTitle>
              <RowItemValue>200,000 <PlusMinusImg src={plusminusSVG} alt={plusminusSVG}/> 10%</RowItemValue>
            </div>
            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Yearly Ad-hoc Cost ($)</RowItemTitle>
              <RowItemValue>20,000 <PlusMinusImg src={plusminusSVG} alt={plusminusSVG}/> 10%</RowItemValue>
            </div>
          </RowItem>
        </div>
        <div className="col-6">
          <strong className="mb-2 d-block" style={{'margin-top':'-3px'}}>Estimated Part Replacement Value ($)</strong>
          <RowItem className="d-flex justify-content-between">

            <div className="mr-0 d-flex flex-column" style={{width: '40%'}}>
              <RowItemTitle>Replacement Value</RowItemTitle>
              <RowItemValue>6000</RowItemValue>
            </div>
            <div className="mr-0"><Calculator>+</Calculator></div>
            <div className="d-flex flex-column">
              <RowItemTitle>Local Labour & Other Cost</RowItemTitle>
              <RowItemValue>20,000 ~ 10%</RowItemValue>
            </div>
          </RowItem>
          <RowItem className="d-flex justify-content-start">

            <div className="mr-5 d-flex flex-column">
              <RowItemTitle>Year on Year Maintenance Cost Increase (%)</RowItemTitle>
              <RowItemValue>8</RowItemValue>
            </div>
          </RowItem>

          <Button className="btn btn-primary btn-sm">Maintenance logs</Button>

        </div>

      </div>
    </Wrapper>

  )
}

export default EquipmentDetail
