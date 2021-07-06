import React, { useState } from 'react'
import styled from 'styled-components'
import ClimateControlType from '../../../reference-tables/ClimateControlType'
import FanType from '../../../reference-tables/FanType'
import { useRecoilState } from 'recoil'
import { spaceUsageGFAListState } from '../../../atoms'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
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

const Title = styled.h6`
  color: var(--bs-primary);
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


const SpaceUsageGFAForm = ({ data }) => {
  const [title, setTitle] = useState(data.title ?? `Usage ${data.id}`)
  const [climateControl, selectedClimateControl] = useState(data.climateControlId ?? 0)
  const [spaceUsageType, selectSpaceUsageType] = useState(data.typeId ?? 0)
  const [percentage, setPercentage] = useState(data.percentage?? 0)
  const [fanTypeId, selectFanTypeId] = useState(data.fanTypeId?? 0)
  const [hasReheatRecovery, setHasReheatRecovery] = useState(data.hasReheatRecovery?? false)

  const [isShowFanTypeAndHeatRecovery, setIsShowFanTypeAndHeatRecovery] = useState(
    data.climateControlId === 3)

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
    //console.log(e.target.value)
    selectedClimateControl(e.target.value)
    if (e.target.value === 3) {
      setIsShowFanTypeAndHeatRecovery(true)
    } else {
      setIsShowFanTypeAndHeatRecovery(false)
    }

    let index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      climateControlId: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onSpaceUsageTypeChange = (e) => {
    //console.log(e.target.value)
    selectSpaceUsageType(e.target.value)
    let index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      typeId: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onFanTypeChange = (e) => {
    //console.log(e.target.value)
    selectFanTypeId(e.target.value)
    let index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      fanTypeId: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onTitleChange = (e) => {
    //console.log(e.target.value)
    setTitle(e.target.value)
    let index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      title: e.target.value,
    })

    setSpaceUsageGFAList(newList)
  }

  const onPercentageChange = (e) => {
    //console.log(e.target.value)
    setPercentage(e.target.value)
    let index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      percentage: parseInt(e.target.value),
    })

    setSpaceUsageGFAList(newList)
  }

  const onHasReheatRecoveryChange = (e) => {
    //console.log(e.target.value)

    let index = spaceUsageGFAList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(spaceUsageGFAList, index, {
      ...data,
      hasReheatRecovery: !hasReheatRecovery,
    })

    setHasReheatRecovery(!hasReheatRecovery)

    setSpaceUsageGFAList(newList)
  }

  return (
    <Wrapper className="shadow-sm rounded-2 border">
      <Header>
        <Title>{title}</Title>

        <Subtraction onClick={onRemoveItem} title="Remove Item"><i
          className="bi bi-dash-lg"/></Subtraction>
      </Header>
      <Content>
        <FormControl className={classes.formControl}>
          <TextField id="title" label="Title" type="text" value={title} onChange={onTitleChange}/>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="space-usage-type-label">Space Usage Type</InputLabel>
          <Select
            labelId="space-usage-type-label"
            id="space-usage-type-select"
            value={spaceUsageType ?? ''}
            onChange={onSpaceUsageTypeChange}
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
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField min={0} max={100} id="percentage-of-GFA" label="% of GFA" type="number" value={percentage} onChange={onPercentageChange}/>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="climate-control-label">Climate
            Control</InputLabel>
          <Select
            id="climate-control-select"
            labelId="climate-control-label"
            value={climateControl ?? ''}
            onChange={onClimateControlChange}
          >
            {ClimateControlType.map((o) => (
              <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {
          isShowFanTypeAndHeatRecovery && (<>
            <FormControl className={classes.formControl}>
              <InputLabel id="fan-type-label">Fan Type</InputLabel>
              <Select
                id="fan-type-select"
                labelId="fan-type-label"
                value={fanTypeId ?? ''}
                onChange={onFanTypeChange}
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
            </FormControl>
            <div className="form-group">
              <label className="form-label d-block mb-0">Has Heat
                Recovery?</label>
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