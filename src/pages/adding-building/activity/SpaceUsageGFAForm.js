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

  const [isShowFanTypeAndHeatRecovery, setIsShowFanTypeAndHeatRecovery] = useState(
    data.climateControlId === 4)

  const [spaceUsageGFAList, setSpaceUsageGFAList] = useRecoilState(
    spaceUsageGFAListState)

  const classes = makeStyles((theme) => (MaterialFormStyle))()

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

  const onHasReheatRecoveryChange = (e) => {
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
    setValue(`title${data.id}`, title)
    setValue(`space-usage-type${data.id}`, spaceUsageType)
    setValue(`percentage-of-GFA${data.id}`, percentage)
    setValue(`climate-control-select${data.id}`, percentage)
    setValue(`fan-type-select${data.id}`, percentage)
    setValue(`fan-type-select${data.id}`, percentage)

  }, [data.id, percentage, setValue, spaceUsageType, title])

  return (
    <Wrapper className="shadow-sm rounded-2 border">
      <Header>
        <Controller
          name={`title${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { value },
            fieldState: { error },
          }) => (
            <FormControl className={classes.mediumFormControl}>
              <TextField label="Title"
                         type="text"
                         value={title}
                         onChange={(e) => {
                           onTitleChange(e)
                           setValue(`title${data.id}`, e.target.value, {
                             shouldValidate: true,
                           })
                         }}
                         error={!!error}
                         helperText={error ? error.message : null}/>
            </FormControl>
          )}
          rules={{
            required: `The Title is not empty`,
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
            field: { value },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`space-usage-type-label${data.id}`} className={error && 'text-danger'}>Space Usage
                Type</InputLabel>
              <Select
                labelId={`space-usage-type-label${data.id}`}
                error={!!error}
                value={spaceUsageType ?? ''}
                onChange={(e) => {
                  onSpaceUsageTypeChange(e)
                  setValue(`space-usage-type${data.id}`, e.target.value, {
                    shouldValidate: true,
                  })
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
              {error && <FormHelperText className="text-danger">The Space Usage Type is not empty</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: `The Space Usage Type is not empty`,
          }}
        />

        <Controller
          name={`percentage-of-GFA${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { value },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField min={0} max={100}
                         label="% of Total Floor Area (Internal)"
                         type="number"
                         value={percentage}
                         error={!!error}
                         helperText={error ? error.message : null}
                         onChange={(e) => {
                           onPercentageChange(e)
                           setValue(`percentage-of-GFA${data.id}`, e.target.value, {
                             shouldValidate: true,
                           })
                         }}/>
            </FormControl>
          )}
          rules={{
            required: `% of Total Floor Area (Internal) is not empty`,
            min: { value: 0, message: 'The value should be >= 0' },
          }}
        />

        <Controller
          name={`climate-control-select${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { value },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`climate-control-label${data.id}`} className={error && 'text-danger'}>Climate
                Control</InputLabel>
              <Select
                labelId={`climate-control-label${data.id}`}
                value={climateControl ?? ''}
                error={!!error}
                onChange={(e) => {
                  onClimateControlChange(e)
                  setValue(`climate-control-select${data.id}`, e.target.value, {
                    shouldValidate: true,
                  })
                }}
              >
                {ClimateControlType.map((o) => (
                  <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">The Climate Control is not empty</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: `The Climate Control is not empty`,
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
                  field: { value },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id={`fan-type-label${data.id}`} className={error && 'text-danger'}>Fan Type</InputLabel>
                    <Select
                      labelId={`fan-type-label${data.id}`}
                      value={fanTypeId ?? ''}
                      error={!!error}
                      onChange={(e) => {
                        onFanTypeChange(e)
                        setValue(`fan-type-select${data.id}`, e.target.value, {
                          shouldValidate: true,
                        })
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
                    {error && <FormHelperText className="text-danger">The Fan Type is not empty</FormHelperText>}
                  </FormControl>
                )}
                rules={{
                  required: `The Fan Type is not empty`,
                }}
              />
              <div className="form-group">
                <label className="form-label d-block mb-0">Has Heat
                  Recovery?
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
                  label="Yes"
                />
              </div>
            </>)
        }
      </Content>
    </Wrapper>
  )
}

export default SpaceUsageGFAForm
