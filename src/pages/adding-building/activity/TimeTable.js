import React, { useState } from 'react'
import styled from 'styled-components'
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const Header = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`

`

const Row = ({
  id,
  name,
  startTime,
  endTime,
}) => {

  const [isChecked, setIsChecked] = useState(false)

  const [selectedEndTime, setSelectedEndTime] = React.useState(endTime)

  const [selectedStartTime, setSelectedStartTime] = React.useState(startTime)

  return (
    <div className="row mt-2" key={`${name}`}>
      <div className="col-4 mt-auto">
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
              id={`day-${id}`}
              onChange={() => setIsChecked(!isChecked)}
            />
          }
          label={name}
        />


      </div>
      <div className="col-4">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            variant="inline"
            margin="normal"
            id="startTime"
            label="Start Time"
            disabled={!isChecked}
            mask="__:__ _M"
            ampm={true}
            value={isChecked ? selectedStartTime : null}
            onChange={(date) => setSelectedStartTime(date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>

      </div>
      <div className="col-4">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            variant="inline"
            margin="normal"
            id="endTime"
            label="End Time"
            disabled={!isChecked}
            mask="__:__ _M"
            value={isChecked ? selectedEndTime : null}
            onChange={(date) => setSelectedEndTime(date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>)
}

const TimeTable = () => {
  const timeTableData = [
    {
      id: 0,
      name: 'Sunday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 1,
      name: 'Monday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 2,
      name: 'Tuesday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 3,
      name: 'Wednesday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 4,
      name: 'Thursday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 5,
      name: 'Friday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 6,
      name: 'Saturday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
    },
    {
      id: 7,
      name: 'Public Holiday',
      startTime: new Date('2014-08-18T09:00:00'),
      endTime: new Date('2014-08-18T17:00:00'),
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