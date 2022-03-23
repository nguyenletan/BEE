/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import styled from 'styled-components'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import LightingFittingType from '../../../reference-tables/LightingFittingType'
import { removeItemAtIndex, replaceItemAtIndex } from 'Utilities'
import { useRecoilState } from 'recoil'
import { lightingSubSystemListState } from 'atoms'
import { makeStyles } from '@material-ui/core/styles'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Title = styled.h6`

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Subtraction = styled.span`
  cursor: pointer;
  color: var(--bs-primary);
`
const Content = styled.div`

`

const Total = styled.p`
  color: var(--bs-primary);
  font-weight: 500;
`

// const SpanId = styled.span`
//   color: var(--gray);
//   margin-left: .5em;
// `

const LightingSubSystem = ({ data, totalWatt, percentage, efficacy, order, control, setValue }) => {
  const classes = makeStyles(() => (MaterialFormStyle))()
  const { t } = useTranslation(['buildingInput', 'common'])
  const [lightingSubSystemList, setLightingSubSystemList] = useRecoilState(
    lightingSubSystemListState)

  const handleChange = (e) => {
    const index = lightingSubSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(lightingSubSystemList, index, {
      ...data,
      [e.target.name]: e.target.value,
      //percentage: percentage
    })

    setLightingSubSystemList(newList)
  }

  const onIndoorLightingSystemTypeIdChange = (e) => {

    const index = lightingSubSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(lightingSubSystemList, index, {
      ...data,
      indoorLightingSystemTypeId: e.target.value,
    })
    setLightingSubSystemList(newList)
  }

  const onRemoveItem = () => {
    const index = lightingSubSystemList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(lightingSubSystemList, index)
    setLightingSubSystemList(newList)
  }

  useEffect(() => {
    setValue(`lighting-fitting-type${data.id}`, data.indoorLightingSystemTypeId, { shouldValidate: true })
    setValue(`percentage-of-all-light-fittings${data.id}`, data.percentage, { shouldValidate: true })
    setValue(`wattRatingOfBulb${data.id}`, data.wattRatingOfBulb, { shouldValidate: true })
    setValue(`numberOfBulbs${data.id}`, data.numberOfBulbs, { shouldValidate: true })
    setValue(`lumensOfBulb${data.id}`, data.lumensOfBulb, { shouldValidate: true })
    setValue(`title${data.id}`, data.title, { shouldValidate: true })
    setValue(`numberOfDaysUsedPerWeek${data.id}`, data.numberOfDaysUsedPerWeek, { shouldValidate: true })
    setValue(`numberOfHoursUsedPerDay${data.id}`, data.numberOfHoursUsedPerDay, { shouldValidate: true })
  }, [
    data.id,
    data.title,
    data.indoorLightingSystemTypeId,
    data.lumensOfBulb,
    data.numberOfBulbs,
    data.percentage,
    data.wattRatingOfBulb,
    data.numberOfDaysUsedPerWeek,
    data.numberOfHoursUsedPerDay])

  useEffect(() => {
    console.log(percentage)
    const index = lightingSubSystemList.findIndex((o) => o.id === data.id)
    console.log(index)
    const newList = replaceItemAtIndex(lightingSubSystemList, index, {
      ...data,
      percentage: percentage,
    })
    setLightingSubSystemList(newList)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage])

  return (
    <div className="p-3 shadow-sm border rounded">
      <Header>
        <Title>{order + 1}. {t(data.title)} </Title>
        <Subtraction title={t('Remove Item')} onClick={onRemoveItem}>
          <i className="bi bi-dash-lg"/>
        </Subtraction>
      </Header>
      <Content>
        <Controller
          name={`title${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={t('Title')}
                name={'title'}
                value={data.title}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />
        <Controller
          name={`lighting-fitting-type${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`lighting-fitting-type-label${data.id}`} className={error && 'text-danger'}>
                {t('Light Bulb Type')}
              </InputLabel>
              <Select
                labelId={`lighting-fitting-type-label`}
                id="lighting-fitting-type-select"
                value={data.indoorLightingSystemTypeId}
                error={!!error}
                onChange={(e) => {
                  onChange(e)
                  onIndoorLightingSystemTypeIdChange(e)
                }}
              >
                {LightingFittingType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {t(o.name, { ns: 'common' })}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
          }}
        />

        <Controller
          name={`numberOfBulbs${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={t('Number of Bulbs')}
                name={'numberOfBulbs'}
                type="number"
                value={data.numberOfBulbs}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />

        <Controller
          name={`wattRatingOfBulb${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={t('Watt Rating of Bulb') + ' (W)'}
                name={'wattRatingOfBulb'}
                type="number"
                value={data.wattRatingOfBulb}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />

        <Controller
          name={`lumensOfBulb${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={t('Lumens of Bulb') + ' (lm)'}
                type="number"
                name={'lumensOfBulb'}
                value={data.lumensOfBulb}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />

        <Controller
          name={`numberOfDaysUsedPerWeek${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={t('Number Of Days Used Per Week')}
                type="number"
                name={'numberOfDaysUsedPerWeek'}
                value={data.numberOfDaysUsedPerWeek}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />

        <Controller
          name={`numberOfHoursUsedPerDay${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={t('Number Of Hours Used Per Day')}
                type="number"
                name={'numberOfHoursUsedPerDay'}
                value={data.numberOfHoursUsedPerDay}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: t(`This field is required`),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />


        <Total className="font-bold primary">Percentage: {percentage} %</Total>
        <Total className="font-bold primary">Efficacy: {efficacy} lm/W</Total>
        <Total className="bold">Total Watt: {totalWatt} W</Total>

        {/*<Controller*/}
        {/*  name={`percentage-of-all-light-fittings${data.id}`}*/}
        {/*  control={control}*/}
        {/*  setValue={setValue}*/}
        {/*  render={({*/}
        {/*    field: { onChange },*/}
        {/*    fieldState: { error },*/}
        {/*  }) => (*/}
        {/*    <FormControl className={classes.formControl}>*/}
        {/*      <TextField*/}
        {/*        label={t('% of All Light Fittings') + '' + data.id}*/}
        {/*        type="number"*/}
        {/*        value={data.percentage}*/}
        {/*        onChange={(e) => {*/}
        {/*          onChange(e)*/}
        {/*        }}*/}
        {/*        error={!!error}*/}
        {/*        helperText={error ? error.message : null}*/}
        {/*      />*/}
        {/*    </FormControl>*/}
        {/*  )}*/}
        {/*  rules={{*/}
        {/*    required: t(`This field is required`),*/}
        {/*    min: { value: 0, message: t('The value should be >= 0') },*/}
        {/*  }}*/}
        {/*/>*/}


      </Content>
    </div>
  )
}

export default LightingSubSystem
