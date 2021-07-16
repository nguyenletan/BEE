import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Controller} from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { buildingActivityState } from '../../../atoms'
import { replaceItemAtIndex } from '../../../Utilities'
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'


const Header = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`

`

const Row = ({ data, control, setValue }) => {

  const [buildingActivity, setBuildingActivity] = useRecoilState(
    buildingActivityState)


  const onChange = (name, value) => {
    let index = buildingActivity.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(buildingActivity, index, {
      ...data,
      [name]: value,
    })
    setBuildingActivity(newList)
  }

  // useEffect({
  //   //setValue()
  // }, [])


  return (
    <div className="row mt-2" key={`${data.name}`}>
      <div className="col-4 mt-auto">

        <FormControlLabel
          control={
            <Checkbox
              name={`${data.codeName}Enable`}
              color="primary"
              checked={data.isEnable}
              id={`day-${data.id}`}
              onChange={() => {
                onChange('isEnable', !data.isEnable)
              }}
            />
          }
          label={data.name}
        />


      </div>
      <div className="col-4">

        <Controller
          name={`${data.codeName}StartTime`}
          control={control}
          setValue={setValue}
          render={({ value, name }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                variant="inline"
                margin="normal"
                id="startTime"
                label="Start Time"
                disabled={!data.isEnable}
                mask="__:__ _M"
                autoOk
                fullWidth
                ampm={true}
                name="startTime"
                value={data.isEnable ? data.startTime : null}
                onChange={(date) => {
                  onChange('startTime', date)
                }}
              />
            </MuiPickersUtilsProvider>
          )}
        />

      </div>
      <div className="col-4">

        <Controller
          name={`${data.codeName}EndTime`}
          control={control}
          setValue={setValue}
          render={({
            field: { value },
            fieldState: { error },
          })  => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                variant="inline"
                margin="normal"
                id="endTime"
                label="End Time"
                disabled={!data.isEnable}
                mask="__:__ _M"
                value={data.isEnable ? data.endTime : null}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={(date) => {
                  onChange('endTime', date)
                  setValue(`${data.codeName}EndTime`, date)
                }}
                autoOk
                fullWidth
              />
            </MuiPickersUtilsProvider>
          )}
          //rules={{ required: `${data.codeName}EndTime is not empty` }}
        />
      </div>
    </div>)
}

const TimeTable = ({ data, control, setValue, getValues, register }) => {
  console.log(data?.saturdayEndTime !== null)
  const [buildingActivity, setBuildingActivity] = useRecoilState(
    buildingActivityState)

  const rows = buildingActivity.map(t => (
    <Row key={`${t.name}_${t.id}`} data={t} control={control}
         setValue={setValue}/>
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