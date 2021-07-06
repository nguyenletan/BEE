import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'

const Header = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`

`

const Row = ({
  id,
  name,
  codeName,
  startTime,
  endTime,
  isEnable,
  control,
  setValue,
  getValues,
  register,
}) => {

  const [isChecked, setIsChecked] = useState(isEnable)

  const [selectedEndTime, setSelectedEndTime] = React.useState(endTime)

  const [selectedStartTime, setSelectedStartTime] = React.useState(startTime)

  useEffect(() => {
    // register(`${name}StartTime`)
    // register(`${codeName}EndTime`)
    console.log(startTime)

    setValue(`${codeName}StartTime`, startTime)
    setValue(`${codeName}EndTime`, endTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="row mt-2" key={`${name}`}>
      <div className="col-4 mt-auto">
        <Controller
          name={`${codeName}Enable`}
          control={control}
          setValue={setValue}
          render={({ onChange, value }) => (
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedTime"
                  color="primary"
                  checked={isChecked}
                  id={`day-${id}`}
                  onChange={() => {
                    setIsChecked(!isChecked)
                    setValue(`${codeName}Enable`, !isChecked, { shouldDirty: true })
                  }}
                />
              }
              label={name}
            />
          )}
        />


      </div>
      <div className="col-4">

        <Controller
          name={`${codeName}StartTime`}
          control={control}
          setValue={setValue}
          render={({ onChange, value, name }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                variant="inline"
                margin="normal"
                id="startTime"
                label="Start Time"
                disabled={!isChecked}
                mask="__:__ _M"
                autoOk
                fullWidth
                ampm={true}
                value={isChecked ? selectedStartTime : null}
                onChange={(date) => {
                  setValue(`${codeName}StartTime`, date, { shouldDirty: true })
                  setSelectedStartTime(date)
                }}
              />
            </MuiPickersUtilsProvider>
          )}
        />

      </div>
      <div className="col-4">

        <Controller
          name={`${codeName}EndTime`}
          control={control}
          setValue={setValue}
          render={({ onChange, value, name }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                variant="inline"
                margin="normal"
                id="endTime"
                label="End Time"
                disabled={!isChecked}
                mask="__:__ _M"
                value={isChecked ? selectedEndTime : null}
                onChange={(date) => {
                  setValue(`${codeName}EndTime`, date, { shouldDirty: true })
                  setSelectedEndTime(date)
                }}
                autoOk
                fullWidth
              />
            </MuiPickersUtilsProvider>
          )}/>
      </div>
    </div>)
}

const TimeTable = ({ data, control, setValue, getValues, register }) => {
  console.log(data?.saturdayEndTime !== null)

  const timeTableData = [
    {
      id: 0,
      name: 'Sunday',
      codeName: 'sunday',
      startTime: data?.sundayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.sundayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.sundayEnable === true,
    },
    {
      id: 1,
      name: 'Monday',
      codeName: 'monday',
      startTime: data?.mondayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.mondayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.mondayEnable === true,
    },
    {
      id: 2,
      name: 'Tuesday',
      codeName: 'tuesday',
      startTime: data?.tuesdayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.tuesdayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.tuesdayEnable === true,
    },
    {
      id: 3,
      name: 'Wednesday',
      codeName: 'wednesday',
      startTime: data?.wednesdayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.wednesdayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.wednesdayEnable === true,
    },
    {
      id: 4,
      name: 'Thursday',
      codeName: 'thursday',
      startTime: data?.thursdayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.thursdayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.thursdayEnable === true,
    },
    {
      id: 5,
      name: 'Friday',
      codeName: 'friday',
      startTime: data?.fridayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.firdayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.fridayEnable === true,
    },
    {
      id: 6,
      name: 'Saturday',
      codeName: 'saturday',
      startTime: data?.saturdayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.saturdayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.saturdayEnable === true,
    },
    {
      id: 7,
      name: 'Public Holiday',
      codeName: 'publicHoliday',
      startTime: data?.publicHolidayStartTime ?? new Date('2014-08-18T09:00:00'),
      endTime: data?.publicHolidayEndTime ?? new Date('2014-08-18T17:00:00'),
      isEnable: data?.publicHolidayEnable === true,
    },
  ]

  const rows = timeTableData.map(t => (
    <Row key={`${t.name}_${t.id}`}
         id={t.id}
         name={t.name}
         codeName={t.codeName}
         startTime={t.startTime}
         endTime={t.endTime}
         isEnable={t.isEnable}
         control={control}
         setValue={setValue}
         getValues={getValues}
         register={register}
    />
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