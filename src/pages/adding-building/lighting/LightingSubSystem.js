import React, { useState } from 'react'
import {
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core'
import styled from 'styled-components'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import LightingFittingType from '../../../reference-tables/LightingFittingType'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import { useRecoilState } from 'recoil'
import { lightingSubSystemListState } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'

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

const SpanId = styled.span`
  color: var(--gray);
  margin-left: .5em;
`

const LightingSubSystem = ({ data }) => {

  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [lightingSubSystemList, setLightingSubSystemList] = useRecoilState(
    lightingSubSystemListState)

  const [indoorLightingSystemTypeId, setIndoorLightingSystemTypeId] = useState(
    data.indoorLightingSystemTypeId ?? 0)
  const [percentage, setPercentage] = useState(data.percentage ?? 0)

  const onPercentageChange = (e) => {
    setPercentage(e.target.value)

    let index = lightingSubSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(lightingSubSystemList, index, {
      ...data,
      percentage: e.target.value,
    })
    setLightingSubSystemList(newList)
  }

  const onIndoorLightingSystemTypeIdChange = (e) => {
    setIndoorLightingSystemTypeId(e.target.value)

    let index = lightingSubSystemList.findIndex((o) => o.id === data.id)
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

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={3} className="p-3">
        <Header>
          <Title>{data.title}<SpanId>{data.id}</SpanId></Title>
          <Subtraction title="Remove Item" onClick={onRemoveItem}><i
            className="bi bi-dash-lg"/></Subtraction>
        </Header>
        <Content>
          <FormControl className={classes.formControl}>
            <InputLabel id="lighting-fitting-type-label">Lighting Fitting
              Type</InputLabel>
            <Select
              labelId="lighting-fitting-type-label"
              id="lighting-fitting-type-select"
              value={indoorLightingSystemTypeId}
              onChange={onIndoorLightingSystemTypeIdChange}
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
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField id="percentage" label="Percentage %" type="number"
                       value={percentage} onChange={onPercentageChange}/>
          </FormControl>
        </Content>
      </Paper>
    </Fade>
  )
}

export default LightingSubSystem