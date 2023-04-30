import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Controller } from 'react-hook-form'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { buildingActivityState } from 'atoms'
import { replaceItemAtIndex } from 'Utilities'
import { useTranslation } from 'react-i18next'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const Header = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`

`

const Row = ({ data, control, setValue }) => {
  const [buildingActivity, setBuildingActivity] = useRecoilState(
    buildingActivityState)
  const { t } = useTranslation('buildingInput')
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
          label={t(data.name)}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                variant="inline"
                margin="normal"
                label={t("Start Time")}
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
                renderInput={(params) => <TextField  variant="standard" {...params} />}/>
            </LocalizationProvider>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                variant="inline"
                margin="normal"
                label={t("End Time")}
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
                renderInput={(params) => <TextField variant="standard" {...params} />}/>
            </LocalizationProvider>
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

  const { t } = useTranslation('buildingInput')
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
          {t('Operates on')}
        </div>
        <div className="col-4">
          {t('Start (HH:MM)')}
        </div>
        <div className="col-4">
          {t('End (HH:MM)')}
        </div>
      </Header>
      <Content className="">
        {rows}
      </Content>
    </>
  )
}

export default TimeTable
