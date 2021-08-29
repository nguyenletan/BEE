import React, { useEffect } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import styled from 'styled-components'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import LightingFittingType from '../../../reference-tables/LightingFittingType'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import { useRecoilState } from 'recoil'
import { lightingSubSystemListState } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { Controller } from 'react-hook-form'

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

// const SpanId = styled.span`
//   color: var(--gray);
//   margin-left: .5em;
// `

const LightingSubSystem = ({ data, control, setValue }) => {
  const classes = makeStyles(() => (MaterialFormStyle))()

  const [lightingSubSystemList, setLightingSubSystemList] = useRecoilState(
    lightingSubSystemListState)

  const onPercentageChange = (e) => {

    const index = lightingSubSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(lightingSubSystemList, index, {
      ...data,
      percentage: e.target.value,
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
    setValue(`lighting-fitting-type${data.id}`, data.indoorLightingSystemTypeId)
    setValue(`percentage-of-all-light-fittings${data.id}`, data.percentage)
  }, [data.id, data.indoorLightingSystemTypeId, data.percentage, setValue])

  return (
    <div className="p-3 shadow-sm border rounded">
      <Header>
        <Title>{data.title}</Title>
        <Subtraction title="Remove Item" onClick={onRemoveItem}>
          <i className="bi bi-dash-lg"/>
        </Subtraction>
      </Header>
      <Content>
        <Controller
          name={`lighting-fitting-type${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`lighting-fitting-type-label${data.id}`} className={error && 'text-danger'}>Lighting Fitting
                Type
              </InputLabel>
              <Select
                labelId={`lighting-fitting-type-label${data.id}`}
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
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">The Lighting Fitting Type is not empty</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: `The Lighting Fitting Type is not empty`,
          }}
        />

        <Controller
          name={`percentage-of-all-light-fittings${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                label={`% of All Light Fittings${data.id}`}
                type="number"
                value={data.percentage}
                onChange={(e) => {
                  onChange(e)
                  onPercentageChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: `The % of All Light Fittings is not empty`,
            min: { value: 0, message: 'The value should be >= 0' },
          }}
        />
      </Content>
    </div>
  )
}

export default LightingSubSystem
