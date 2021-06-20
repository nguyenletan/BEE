import React, { useState } from 'react'
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

const Row = ({
  id,
  name,
  startTime,
  endTime
}) => {
  const [isChecked, setIsChecked] = useState(false)

  const [selectedEndTime, setSelectedEndTime] = React.useState(endTime)

  const [selectedStartTime, setSelectedStartTime] = React.useState(startTime)

  return (
    <div className="row mt-2" key={`${name}`}>
      <div className="col-4 my-auto">

        <div className="form-check">
          <input className="form-check-input" type="checkbox"
                 onChange={() => setIsChecked(!isChecked)}
                 id={`day-${id}`}/>
          <label className="form-check-label" htmlFor={`day-${id}`}>
            {name}
          </label>
        </div>

      </div>
      <div className="col-4">
        <div className="input-group">
          <Input type="time" id="startTime" aria-label="Start Time"
                 disabled={!isChecked}
                 value={isChecked ? selectedStartTime: null}
                 onChange={(e) => setSelectedStartTime(e.target.value)}
                 max={"18:00"}
                 className="form-control"/>
        </div>
      </div>
      <div className="col-4">
        <div className="input-group">
          <Input type="time" id="endTime" aria-label="End Time"
                 disabled={!isChecked}
                 onChange={(e) => setSelectedEndTime(e.target.value)}
                 value={isChecked ? selectedEndTime: null}

                 className="form-control"/>
        </div>
      </div>
    </div>)
}

const TimeTable = () => {
  const timeTableData = [
    {
      id: 0,
      name: 'Sunday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 1,
      name: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 2,
      name: 'Tuesday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 3,
      name: 'Wednesday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 4,
      name: 'Thursday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 5,
      name: 'Friday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 6,
      name: 'Saturday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 7,
      name: 'Public Holiday',
      startTime: '09:00',
      endTime: '17:00',
    },
  ]

  const rows = timeTableData.map(t => (
    <Row id={t.id} name={t.name} startTime={t.startTime} endTime={t.endTime}/>
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