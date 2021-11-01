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

const MaintenanceRegime = () => {
  return (
    <Wrapper>
      <h5>Maintenance Regime</h5>
      <Content>
        <Label>Recurring Tasks Scheduled</Label>
        <Value>6</Value>
        <Label>Upcoming Tasks in 2 Weeks</Label>
        <Value>2 Days</Value>
        <Label>Tasks Missed in Past 2 Weeks</Label>
        <Value>1</Value>
      </Content>
      <button className="btn btn-primary btn-sm float-end">Details</button>
    </Wrapper>
  )

}

export default MaintenanceRegime