import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Controller } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useRecoilState, useRecoilValue } from 'recoil'
import { buildingActivityState } from '../../../atoms'
import { replaceItemAtIndex } from '../../../Utilities'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const Header = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`

`

const Row = ({ data, control, setValue }) => {
  const [buildingActivity, setBuildingActivity] = useRecoilState(
    buildingActivityState)

  useEffect(() => {
    setValue(`${data.codeName}StartTime`, data.startTime, {shouldValidate: true})
    setValue(`${data.codeName}EndTime`, data.endTime, {shouldValidate: true})
  }, [data.codeName, data.endTime, data.startTime, setValue])

  const handleChange = (name, value) => {
    // console.log(name)
    const index = buildingActivity.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(buildingActivity, index, {
      ...data,
      [name]: value,
    })
    setBuildingActivity(newList)
  }

  return (
    <div className="row mt-2" key={`${data.name}`}>
      <div className="col-4 mt-auto">

        <FormControlLabel
          control={
            <Checkbox
              name={`${data.codeName}Enable`}
              color="primary"
              checked={data.isEnable}
              onChange={() => {
                handleChange('isEnable', !data.isEnable)
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
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                variant="inline"
                margin="normal"
                label="Start Time"
                disabled={!data.isEnable}
                mask="__:__ _M"
                autoOk
                fullWidth
                ampm
                name="startTime"
                value={data.isEnable ? data.startTime : null}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={(date) => {
                  handleChange('startTime', date)
                  onChange(date)
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          rules={data.isEnable ?
            { required: `${data.name}StartTime is not empty` } : {}}
        />

      </div>
      <div className="col-4">

        <Controller
          name={`${data.codeName}EndTime`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                variant="inline"
                margin="normal"
                label="End Time"
                disabled={!data.isEnable}
                mask="__:__ _M"
                value={data.isEnable ? data.endTime : null}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={(date) => {
                  handleChange('endTime', date)
                  onChange(date)
                }}
                autoOk
                fullWidth
              />
            </MuiPickersUtilsProvider>
          )}
          rules={data.isEnable ?
            { required: `${data.codeName}EndTime is not empty` } : {}}
        />
      </div>
    </div>
  )
}

const TimeTable = ({ control, setValue }) => {
  const buildingActivity = useRecoilValue(buildingActivityState)

  const rows = buildingActivity.map(t => (
    <Row
      key={`${t.name}_${t.id}`} data={t} control={control}
      setValue={setValue}
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
