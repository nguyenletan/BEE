import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RemoveIcon from '@mui/icons-material/Remove'
import { Input, Grid, FormHelperText, TextField,Select,MenuItem } from '@mui/material'
import { useRecoilState } from 'recoil'
import { Controller } from 'react-hook-form'
import { heatConsumptionListState } from 'atoms'
import { removeItemAtIndex, replaceItemAtIndex } from 'Utilities'
import { useTranslation } from 'react-i18next'
import de from "date-fns/locale/de";
import enGB from "date-fns/locale/en-GB";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'

const Subtraction = styled(RemoveIcon)`
  cursor: pointer;
  color: var(--bs-primary);
`

const OneMonthHeatConsumption = ({ data, control, setValue }) => {

  const [selectedDate, setSelectedDate] = React.useState(dayjs(`${data.year}/${data.month + 1}/01`),
    // new Date("2014-08-18T21:11:54")
  )
  const { t, i18n } = useTranslation('buildingInput')
  const [heatConsumptionList, setHeatConsumptionList] = useRecoilState(heatConsumptionListState)

  const onRemoveItem = () => {
    if (heatConsumptionList.length > 1) {
      const index = heatConsumptionList.findIndex((listItem) => listItem.id === data.id)

      const newList = removeItemAtIndex(heatConsumptionList, index)
      setHeatConsumptionList(newList)
    }
  }

  const onDateChange = (date) => {

    if(date) {
      setSelectedDate(dayjs(`${data.year}/${data.month + 1}/01`))
      const day = dayjs(date)
      const index = heatConsumptionList.findIndex(
        (o) => o.id === data.id)
      const newList = replaceItemAtIndex(heatConsumptionList, index, {
        ...data,
        month: day.get('month'),
        year: day.get('year'),
      })

      setHeatConsumptionList(newList)
    }
  }

  const handleChange = (e) => {
    const index = heatConsumptionList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(heatConsumptionList, index, {
      ...data,
      [e.target.name]: e.target.value,
    })

    setHeatConsumptionList(newList)
  }

  const [locale, setLocale] = useState(enGB)

  useEffect(() => {
    setValue(`date${data.id}`, selectedDate, {shouldValidate: true})
    setValue(`heattype${data.id}`, data.heattype, {shouldValidate: true})
    setValue(`cost${data.id}`, data.cost, {shouldValidate: true})
    setValue(`value${data.id}`, data.value, {shouldValidate: true})
  }, [data.cost,data.heattype, data.id, data.value, selectedDate, setValue])

  useEffect(() => {
    if(i18n.language === 'de') {
      setLocale(de)
    } else {
      setLocale(enGB)
    }
  },[i18n.language])

  return (
    <li className="row mb-4">

      <div className="col-3">
        <Controller
          name={`date${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
              <Grid container justifyContent="flex-start">
                <DatePicker
                  views={['year', 'month']}
                  format={'MMM/YYYY'}
                  value={selectedDate}
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={(date) => {
                    onDateChange(date)
                    onChange(date)
                  }}
                  renderInput={(params) => <TextField variant="standard" {...params} />}/>
              </Grid>
            </LocalizationProvider>
          )}
          rules={{
            required: t(`This field is not empty`)
          }}
        />
      </div>



      {/* ================= */}
      <Controller
  name={`heattype${data.id}`}
  control={control}
  setValue={setValue}
  render={({ field: { onChange }, fieldState: { error } }) => (
    <div className="col-3">
      <Select
        variant="standard"
        name="heattype"
        value={data.heattype}

        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
        error={!!error}
        style={{ width: '80%' }} 
      >
        <MenuItem value={1}>{t('Gas')}</MenuItem>
        <MenuItem value={2}>{t('District Heating')}</MenuItem>
      </Select>

      {error && (
        <FormHelperText className="text-danger">
          {t('This field must be selected')}
        </FormHelperText>
      )}
    </div>
  )}
  rules={{
    validate: (value) => {
      return value !== "" ;
    }
  }}
/>


    
      {/* ================= */}





      <Controller
        name={`cost${data.id}`}
        control={control}
        setValue={setValue}
        render={({
          field: { onChange },
          fieldState: { error },
        }) => (
          <div className="col-2">
            <Input
              type="number"
              onChange={(e) => {
                handleChange(e)
                onChange(e)
              }}
              value={data.cost}
              name="cost"
              placeholder={t("Cost")}
              error={!!error}
            />
            {error && <FormHelperText className="text-danger">{t('This field is not empty and >= 0')}</FormHelperText>}
          </div>
        )}
        rules={{
          required: t(`This field is not empty`),
          min: { value: 0, message: t('The value should be >= 0') },
        }}
      />



      <Controller
        name={`value${data.id}`}
        control={control}
        setValue={setValue}
        render={({
          field: { onChange },
          fieldState: { error },
        }) => (
          <div className="col-3">
            <Input
              type="number"
              name="value"
              onChange={(e) => {
                handleChange(e)
                onChange(e)
              }}
              error={!!error}
              value={data.value}
              placeholder={t("Value")}
            />
            {error && <FormHelperText className="text-danger">{t('This field is not empty and >= 0')}</FormHelperText>}
          </div>
        )}
        rules={{
          required: t(`This field is not empty`),
          min: { value: 0, message: t('The value should be >= 0') },
        }}
      />


      <div className="col-1">
        <Subtraction
          titleAccess={t("Remove Item")} onClick={onRemoveItem}
          fontSize="large"
        />
      </div>
    </li>
  )
}

export default OneMonthHeatConsumption
