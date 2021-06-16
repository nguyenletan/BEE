import React, { useState } from 'react'
import styled from 'styled-components'
import ClimateControlType from '../../../reference-tables/ClimateControlType'
import FanType from '../../../reference-tables/FanType'
import { useRecoilState } from 'recoil'
import { spaceUsageGFAListState } from '../../../atoms'
import { removeItemAtIndex } from '../../../Utilities'

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
  color: var(--primary);
`
const Content = styled.div`

`

const Input = styled.input`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

const Select = styled.select`
  border-color: #7b7b7b;
`

const SpanId = styled.span`
  color: var(--gray);
`

const SpaceUsageGFAForm = ({ data }) => {
  const [climateControl, selectedClimateControl] = useState(0)
  const [isShowFanTypeAndHeatRecovery, setIsShowFanTypeAndHeatRecovery] = useState(false)
  const [spaceUsageGFAList, setSpaceUsageGFAList] = useRecoilState(spaceUsageGFAListState)

  const onRemoveItem = () => {
    const index = spaceUsageGFAList.findIndex((listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(spaceUsageGFAList, index)
    setSpaceUsageGFAList(newList)
  }

  const onClimateControlChange = (e) => {
    console.log(e.target.value)
    selectedClimateControl(e.target.value)
    if (e.target.value === '3') {
      setIsShowFanTypeAndHeatRecovery(true)
    } else {
      setIsShowFanTypeAndHeatRecovery(false)
    }
  }

  return (
    <Wrapper className="shadow-sm rounded-2 border">
      <Header>
        <Title>{data.title} <SpanId>{data.id}</SpanId></Title>
        <Subtraction onClick={onRemoveItem} title="Remove Item"><i className="bi bi-dash-lg"/></Subtraction>
      </Header>
      <Content>
        <div className="form-group">
          <Select className="form-select">
            <option key="-1" value="-1" selected>Select usage type</option>
            <option
              key="0"
              value="0"
            >
              Usage Type 1
            </option>
            <option
              key="1"
              value="1"
            >
              Usage Type 2
            </option>
            <option
              key="2"
              value="2"
            >
              Usage Type 3
            </option>
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="percentageOfGFA" className="form-label">% of
            GFA</label>
          <Input type="text" className="form-control "
                 id="percentageOfGFA" placeholder="% of GFA"/>
        </div>
        <div className="form-group">
          <label htmlFor="climateControl" className="form-label">Climate
            Control</label>
          <Select className="form-select"
                  id="climateControl"
                  value={climateControl}
                  onChange={onClimateControlChange}
          >
            {ClimateControlType.map((o) => (
              <option
                key={o.id}
                value={o.id}
              >
                {o.name}
              </option>
            ))}
          </Select>
        </div>
        {
          isShowFanTypeAndHeatRecovery && (<>
            <div className="form-group">
              <label htmlFor="fanType" className="form-label">Fan Type</label>
              <Select className="form-select" id="fanType">
                {FanType.map((o) => (
                  <option
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="form-group">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox"
                       id="flexSwitchCheckDefault"/>
                <label className="form-check-label"
                       htmlFor="flexSwitchCheckDefault">Has Heat
                  Recovery</label>
              </div>
            </div>
          </>)
        }
      </Content>
    </Wrapper>
  )
}

export default SpaceUsageGFAForm