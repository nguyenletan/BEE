import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`

`

const Input = styled.input`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

const DiviSpan = styled.span`
  background-color: var(--offwhite);
  border: none;
`

const Row = styled.div`
  margin-bottom: 10px;
`


const TimeTable = () => {
  const timeTableData = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday'},
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Public Holiday' },
  ]

  const rows = timeTableData.map(t => (
    <Row className="row" key={`${t.name}`}>
      <div className="col-4 my-auto">

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value=""
                 id={`day-${t.id}`}/>
          <label className="form-check-label" htmlFor={`day-${t.id}`}>
            {t.name}
          </label>
        </div>

      </div>
      <div className="col-4">
        <div className="input-group">
          <Input type="text" aria-label="First name"
                 className="form-control"/>
          <DiviSpan className="input-group-text bg-white">:</DiviSpan>
          <Input type="text" aria-label="Last name"
                 className="form-control"/>
        </div>
      </div>
      <div className="col-4">
        <div className="input-group">
          <Input type="text" aria-label="First name"
                 className="form-control"/>
          <DiviSpan className="input-group-text bg-white">:</DiviSpan>
          <Input type="text" aria-label="Last name"
                 className="form-control"/>
        </div>
      </div>
    </Row>
  ))
  return (
    <>
      <Header className="row">
        <div className="col-4">
          Operates on
        </div>
        <div className="col-4">
          Start (HH:MM)
        </div>
        <div className="col-4">
          End (HH:MM)
        </div>
      </Header>
      <Content className="">
        {rows}
      </Content>
    </>
  )
}

export default TimeTable