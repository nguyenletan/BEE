import React, { useState } from 'react'
import styled from 'styled-components'
import ClimateControlType from '../../../reference-tables/ClimateControlType'
import FanType from '../../../reference-tables/FanType'
import { useRecoilState } from 'recoil'
import { spaceUsageGFAListState } from '../../../atoms'
import { removeItemAtIndex } from '../../../Utilities'
import {
  Checkbox,
  FormControl, FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import SpaceUsageType from '../../../reference-tables/SpaceUsageType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'


const Wrapper = styled.div`
  padding: 1em;
`

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
`

const SpaceUsageGFAForm = ({ data }) => {
  const [climateControl, selectedClimateControl] = useState(0)
  const [isShowFanTypeAndHeatRecovery, setIsShowFanTypeAndHeatRecovery] = useState(
    false)
  const [spaceUsageGFAList, setSpaceUsageGFAList] = useRecoilState(
    spaceUsageGFAListState)

  const classes = MaterialFormStyle()


  const onRemoveItem = () => {
    const index = spaceUsageGFAList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(spaceUsageGFAList, index)
    setSpaceUsageGFAList(newList)
  }

  const onClimateControlChange = (e) => {
    console.log(e.target.value)
    selectedClimateControl(e.target.value)
    if (e.target.value === 3) {
      setIsShowFanTypeAndHeatRecovery(true)
    } else {
      setIsShowFanTypeAndHeatRecovery(false)
    }
  }

  return (
    <Wrapper className="shadow-sm rounded-2 border">
      <Header>
        <Title>{data.title} <SpanId>{data.id}</SpanId></Title>
        <Subtraction onClick={onRemoveItem} title="Remove Item"><i
          className="bi bi-dash-lg"/></Subtraction>
      </Header>
      <Content>
        <FormControl className={classes.formControl}>
          <InputLabel id="space-usage-type-label">Space Usage Type</InputLabel>
          <Select
            labelId="space-usage-type-label"
            id="space-usage-type-select"

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
          <TextField id="percentage-of-GFA" label="% of GFA" type="number"/>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="climate-control-label">Climate
            Control</InputLabel>
          <Select
            id="climate-control-select"
            labelId="climate-control-label"
            value={climateControl}
            defaultValue={ClimateControlType[0].id}
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
              <label className="form-label d-block mb-0">Has Heat Recovery?</label>
              <FormControlLabel
                control={
                  <Checkbox

                    // checked={state.checkedB}
                    // onChange={handleChange}
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