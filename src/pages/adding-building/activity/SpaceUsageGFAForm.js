import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClimateControlType from '../../../reference-tables/ClimateControlType'
import { Controller } from 'react-hook-form'
import FanType from '../../../reference-tables/FanType'
import { useRecoilState } from 'recoil'
import { spaceUsageGFAListState } from '../../../atoms'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import SpaceUsageType from '../../../reference-tables/SpaceUsageType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  padding: 1em;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const Subtraction = styled.span`
  cursor: pointer;
  color: var(--bs-primary);
`
const Content = styled.div`

`

const SpaceUsageGFAForm = ({ data, control, setValue }) => {
  const [title, setTitle] = useState(data.title ?? `Usage ${data.id}`)
  const [climateControl, selectedClimateControl] = useState(data.climateControlId ?? 0)
  const [spaceUsageType, selectSpaceUsageType] = useState(data.typeId ?? 0)
  const [percentage, setPercentage] = useState(data.percentage ?? 0)
  const [fanTypeId, selectFanTypeId] = useState(data.fanTypeId ?? 0)
  const [hasReheatRecovery, setHasReheatRecovery] = useState(data.hasReheatRecovery ?? false)
  const { t } = useTranslation('buildingInput')
  const [isShowFanTypeAndHeatRecovery, setIsShowFanTypeAndHeatRecovery] = useState(
    data.climateControlId === 4)

  const [spaceUsageGFAList, setSpaceUsageGFAList] = useRecoilState(
    spaceUsageGFAListState)

  const classes = makeStyles(() => (MaterialFormStyle))()

  const onRemoveItem = () => {
    const index = spaceUsageGFAList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(spaceUsageGFAList, index)
    setSpaceUsageGFAList(newList)
  }

  const onClimateControlChange = (e) => {
    // console.log(e.target.value)
    selectedClimateControl(e.target.value)
    if (e.target.value === 4) {
      setIsShowFanTypeAndHeatRecovery(true)
    } else {
      setIsShowFanTypeAndHeatRecovery(false)
    }

    const index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      climateControlId: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onSpaceUsageTypeChange = (e) => {
    // console.log(e.target.value)
    selectSpaceUsageType(e.target.value)
    const index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      typeId: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onFanTypeChange = (e) => {
    // console.log(e.target.value)
    selectFanTypeId(e.target.value)
    const index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      fanTypeId: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
    const index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      title: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onPercentageChange = (e) => {
    // console.log(e.target.value)
    setPercentage(e.target.value)
    const index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      percentage: parseInt(e.target.value),
    })

    setSpaceUsageGFAList(newList)
  }

  const onHasReheatRecoveryChange = () => {
    // console.log(e.target.value)

    const index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      hasReheatRecovery: !hasReheatRecovery,
    })

    setHasReheatRecovery(!hasReheatRecovery)

    setSpaceUsageGFAList(newList)
  }

  useEffect(() => {
    setValue(`title${data.id}`, title, { shouldValidate: true })
    setValue(`space-usage-type${data.id}`, spaceUsageType, { shouldValidate: true })
    setValue(`percentage-of-GFA${data.id}`, percentage, { shouldValidate: true })
    setValue(`climate-control-select${data.id}`, climateControl, { shouldValidate: true })
    setValue(`fan-type-select${data.id}`, fanTypeId, { shouldValidate: true })
  }, [climateControl, data.id, fanTypeId, percentage, setValue, spaceUsageType, title])

  return (
    <Wrapper className="shadow-sm rounded border">
      <Header>
        <Controller
          name={`title${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.mediumFormControl}>
              <TextField label={t('Title')}
                         type="text"
                         value={title}
                         onChange={(e) => {
                           onTitleChange(e)
                           onChange(e)
                         }}
                         error={!!error}
                         helperText={error ? error.message : null}/>
            </FormControl>
          )}
          rules={{
            required: t(`The Title is not empty`),
          }}
        />
        <Subtraction onClick={onRemoveItem} title="Remove Item"><i
          className="bi bi-dash-lg"
        />
        </Subtraction>
      </Header>
      <Content>
        <Controller
          name={`space-usage-type${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`space-usage-type-label${data.id}`} className={error && 'text-danger'}>{t(
                'Space Usage Type')}</InputLabel>
              <Select
                labelId={`space-usage-type-label${data.id}`}
                error={!!error}
                value={spaceUsageType}
                onChange={(e) => {
                  onSpaceUsageTypeChange(e)
                  onChange(e)
                }}
              >
                {SpaceUsageType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">{t('The Space Usage Type is not empty')}</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: t(`The Space Usage Type is not empty`),
          }}
        />

        <Controller
          name={`percentage-of-GFA${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField min={0} max={100}
                         label={t('% of Total Floor Area (Internal)')}
                         type="number"
                         value={percentage}
                         error={!!error}
                         helperText={error ? error.message : null}
                         onChange={(e) => {
                           onPercentageChange(e)
                           onChange(e)
                         }}/>
            </FormControl>
          )}
          rules={{
            required: t('% of Total Floor Area (Internal) is not empty'),
            min: { value: 0, message: t('The value should be >= 0') },
          }}
        />

        <Controller
          name={`climate-control-select${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`climate-control-label${data.id}`} className={error && 'text-danger'}>
                {t('Climate Control')}
              </InputLabel>
              <Select
                labelId={`climate-control-label${data.id}`}
                value={climateControl}
                error={!!error}
                onChange={(e) => {
                  onClimateControlChange(e)
                  onChange(e)
                }}
              >
                {ClimateControlType.map((o) => (
                  <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">{t('The Climate Control is not empty')}</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: t(`The Climate Control is not empty`),
          }}
        />

        {
          isShowFanTypeAndHeatRecovery && (
            <>
              <Controller
                name={`fan-type-select${data.id}`}
                control={control}
                setValue={setValue}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id={`fan-type-label${data.id}`} className={error && 'text-danger'}>{t(
                      'Fan Type')}</InputLabel>
                    <Select
                      labelId={`fan-type-label${data.id}`}
                      value={fanTypeId}
                      error={!!error}
                      onChange={(e) => {
                        onFanTypeChange(e)
                        onChange(e)
                      }}
                    >
                      {FanType.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText className="text-danger">{t('The Fan Type is not empty')}</FormHelperText>}
                  </FormControl>
                )}
                rules={{
                  required: t(`The Fan Type is not empty`),
                }}
              />
              <div className="form-group">
                <label className="form-label d-block mb-0">{t('Has Heat Recovery?')}
                </label>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasReheatRecovery}
                      onChange={onHasReheatRecoveryChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label={t('Yes')}
                />
              </div>
            </>)
        }
      </Content>
    </Wrapper>
  )
}

export default SpaceUsageGFAForm
