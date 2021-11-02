import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`

`
const PotentialIssueTable = styled.table`
  border-top: none;

  th {
    font-size: 0.9rem;
    font-weight: 500;
    border: none !important;
    vertical-align: middle !important;
    text-align: left;
  }

  thead tr {

    border-bottom: 1px solid #eaeaea;
  }
  
  tbody {
    border-top: 2px solid #eaeaea !important;
    border-bottom: 2px solid #eaeaea !important;
  }

  tbody tr {
    line-height: 72px;
    border-bottom: 1px solid #eaeaea;
  }

  td {
    text-transform: capitalize;
    border: none;
    text-align: left;
    font-size: 0.9rem;
  }
`

const PotentialIssueList =() => {
  return (
    <Wrapper>
      <h5>List of Potential Issues</h5>
      <PotentialIssueTable className="table ">
        <thead>
        <tr>
          <th scope="col">Similar Historical Fault</th>
          <th scope="col">May Exceed Threshold In</th>
          <th scope="col">Average Parts Lead Time</th>
          <th scope="col">Average Time to Repair</th>
          <th scope="col">Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">Refrigerant Leak</th>
          <td>6 Days</td>
          <td>1 Day</td>
          <td>1 day</td>
          <td><button className="btn btn-primary btn-sm">INFO</button></td>
        </tr>
        <tr>
          <th scope="row">Worn Compressor</th>
          <td>5 Days</td>
          <td>In Inventory</td>
          <td>2 days</td>
          <td><button className="btn btn-primary btn-sm">INFO</button></td>
        </tr>
        <tr>
          <th scope="row">Evaporator Fouling</th>
          <td>5 Days</td>
          <td>NA</td>
          <td>1 day</td>
          <td><button className="btn btn-primary btn-sm">INFO</button></td>
        </tr>
        </tbody>
      </PotentialIssueTable>
    </Wrapper>
  )
}

export default PotentialIssueList