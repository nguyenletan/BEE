import React, { useEffect } from 'react'
import styled from 'styled-components'
import 'date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import RemoveIcon from '@material-ui/icons/Remove'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { useRecoilState } from 'recoil'
import { Controller } from 'react-hook-form'
import { electricityConsumptionListState } from '../../../atoms'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import { FormHelperText } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const Subtraction = styled(RemoveIcon)`
  cursor: pointer;
  color: var(--bs-primary);
`

const OneMonthElectricityConsumption = ({ data, control, setValue }) => {

  const [selectedDate, setSelectedDate] = React.useState(`${data.year}/${data.month + 1}/01`,
    // new Date("2014-08-18T21:11:54")
  )
  const { t } = useTranslation('buildingInput')
  const [electricityConsumptionList, setElectricityConsumptionList] = useRecoilState(electricityConsumptionListState)

  const onRemoveItem = () => {
    if (electricityConsumptionList.length > 1) {
      const index = electricityConsumptionList.findIndex((listItem) => listItem.id === data.id)

      const newList = removeItemAtIndex(electricityConsumptionList, index)
      setElectricityConsumptionList(newList)
    }
  }

  const onDateChange = (date) => {

    setSelectedDate(date)
    const index = electricityConsumptionList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(electricityConsumptionList, index, {
      ...data,
      month: date?.getMonth(),
      year: date?.getFullYear(),
    })

    setElectricityConsumptionList(newList)
  }

  const handleChange = (e) => {
    const index = electricityConsumptionList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(electricityConsumptionList, index, {
      ...data,
      [e.target.name]: e.target.value,
    })

    setElectricityConsumptionList(newList)
  }

  useEffect(() => {
    setValue(`date${data.id}`, selectedDate, {shouldValidate: true})
    setValue(`cost${data.id}`, data.cost, {shouldValidate: true})
    setValue(`value${data.id}`, data.value, {shouldValidate: true})
  }, [data.cost, data.id, data.value, selectedDate, setValue])

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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="flex-start">
                <KeyboardDatePicker
                  variant="inline"
                  openTo="year"
                  views={['year', 'month']}
                  value={selectedDate}
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={(date) => {
                    onDateChange(date)
                    onChange(date)
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          )}
          rules={{
            required: t(`This field is not empty`)
          }}
        />
      </div>


      <Controller
        name={`cost${data.id}`}
        control={control}
        setValue={setValue}
        render={({
          field: { onChange },
          fieldState: { error },
        }) => (
          <div className="col-3">
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


      <div className="col-3">
        <Subtraction
          titleAccess={t("Remove Item")} onClick={onRemoveItem}
          fontSize="large"
        />
      </div>
    </li>
  )
}

export default OneMonthElectricityConsumption
