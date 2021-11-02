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
    line-height: 77px;
    border-bottom: 1px solid #eaeaea;
  }

  td {
    text-transform: capitalize;
    border: none;
    text-align: left;
    font-size: 0.9rem;
  }
`

const InfoButton = styled.button`
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: uppercase;
  a {
    color: white !important;
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
          <td>6 Days | 07 Oct</td>
          <td>1 Day</td>
          <td>1 day</td>
          <td><InfoButton className="btn btn-primary btn-sm">INFO</InfoButton></td>
        </tr>
        <tr>
          <th scope="row">Worn Compressor</th>
          <td>5 Days | 11 Nov</td>
          <td>In Inventory</td>
          <td>2 days</td>
          <td><InfoButton className="btn btn-primary btn-sm">INFO</InfoButton></td>
        </tr>
        <tr>
          <th scope="row">Evaporator Fouling</th>
          <td>5 Days | 13 Nov</td>
          <td>NA</td>
          <td>1 day</td>
          <td><InfoButton className="btn btn-primary btn-sm">INFO</InfoButton></td>
        </tr>
        </tbody>
      </PotentialIssueTable>
    </Wrapper>
  )
}

export default PotentialIssueList