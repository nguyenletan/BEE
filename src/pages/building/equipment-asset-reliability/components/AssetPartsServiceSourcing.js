import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`

`

const Content = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 1rem;
`

const Value = styled.span`
  display: block;
  color: #87972f;
  font-size: 1.5rem;
  margin-bottom: 10px;
`

const AssetPartsServiceSourcing = () => {
  return (
    <Wrapper>
      <h5>Asset, Parts & Service Sourcing</h5>
      <Content>
        <Label>Projected Sourcing Required</Label>
        <Value>2</Value>
        <Label>Max Lead Time</Label>
        <Value>2 Days</Value>
        <Label>Total Cost ($)</Label>
        <Value>340</Value>
        <Label>Potential Replacement Options</Label>
        <Value>Yes</Value>
      </Content>
      <button className="btn btn-primary btn-sm float-end">Details</button>
    </Wrapper>
  )

}

export default AssetPartsServiceSourcing