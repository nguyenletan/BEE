import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`

`


const PotentialIssueList =() => {
  return (
    <Wrapper>
      <h5>List of Potential Issues</h5>
      <table className="table ">
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
      </table>
    </Wrapper>
  )
}

export default PotentialIssueList