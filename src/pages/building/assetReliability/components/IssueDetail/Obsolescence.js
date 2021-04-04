import React from 'react'
import styled from 'styled-components'


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
  color: var(--black);
`



const RowItem =styled.div`
  font-size: .9rem;
`

const RowItemTitle =styled.h5`
  font-size: .9rem;
  margin-bottom: .2rem;
  margin-right: .5rem;
`


const RowSubItemTitle =styled.h5`
  font-size: .8rem;
  margin-bottom: .2rem;
  margin-right: .5rem;
`

const RowItemValue =styled.p`
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
`

const Calculator = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
  width: 40px;
`

const Obsolescence = () => {

  return (
    <Wrapper>
      <Title>Obsolescence</Title>
      <RowItem className="row">
        <div className="col col-3">
          <RowItemTitle>Technological Issues</RowItemTitle>
          <RowItemValue >3</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Economic Issues</RowItemTitle>
          <RowItemValue >2</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Statutory Issues</RowItemTitle>
          <RowItemValue >1</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Functional Issues</RowItemTitle>
          <RowItemValue >1</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Aesthetic Issues</RowItemTitle>
          <RowItemValue >0</RowItemValue>
        </div>
      </RowItem>
      <p><a href="#">Obsolescence Checklist</a></p>
      <RowItem className="row mt-3">
        <div className="col col-6">
          <RowItemTitle className="mb-2">Estimated New Replacement Value ($)</RowItemTitle>
          <RowItem className="row" style={{fontSize: ".8rem"}}>
            <div className="col col-5">
              <RowSubItemTitle>Replacement Value</RowSubItemTitle>
              <RowItemValue >1,350,000</RowItemValue>
            </div>
            <Calculator className="col col-2 text-center">+</Calculator>
            <div className="col col-5">
              <RowSubItemTitle>Local Labor & Other Cost</RowSubItemTitle>
              <RowItemValue >14 ~ 25%</RowItemValue>
            </div>
          </RowItem>
        </div>

        <div className="col col-6">
          <RowItem className="row">
            <div className="col col-6">
              <RowSubItemTitle>Simple Payback (Years)</RowSubItemTitle>
              <RowItemValue>7</RowItemValue>
            </div>
            <div className="col col-6">
              <RowSubItemTitle>Internal Rate of Return (%)</RowSubItemTitle>
              <RowItemValue>22</RowItemValue>
            </div>
          </RowItem>
        </div>

      </RowItem>
    </Wrapper>

  )

}

export default Obsolescence