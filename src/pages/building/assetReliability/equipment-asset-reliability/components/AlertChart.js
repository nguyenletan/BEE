import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`

`

const AlertContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: column;
`

const AlertRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const AlertBlock = styled.div`
  background-color: ${props => props.backgroundColor || '#879637'};
  border-radius: 13px;
  color: white;
  width: 70px;
  height: 58px;
  display: flex;
  font-size: 28px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border: solid 3px transparent;
  &.empty {
    border-color: #e7ead5;
    background-color: #fff;
  }
`

const AlertChart = () => {
  const colors = {
    low: ['#879637', '#ffffff'],
    medium: ['#ECB75F', '#fffff'],
    high: ['#D94545', '#ffffff'],
    critical: ['#7045D9', '#ffffff'],
  }

  const data = {
    critical: 0,
    high: 0,
    medium: 3,
    low: 1,
  }

  return (
    <Wrapper>
      <h3>Alerts</h3>
      <AlertContent>
        <AlertRow>
          <span>Critical</span>
          <AlertBlock
            className={data.critical === 0 ? 'empty': ''}
            backgroundColor={data.critical > 0 ? colors['critical'][0] : colors['critical'][1]}>
            {data.critical > 0 ? data.critical : ''}
          </AlertBlock>
        </AlertRow>
        <AlertRow>
          <span>High</span>
          <AlertBlock
            className={data.high === 0 ? 'empty': ''}
            backgroundColor={data.high > 0 ? colors['high'][0] : colors['high'][1]}>
            {data.high > 0 ? data.high : ''}
          </AlertBlock>
        </AlertRow>
        <AlertRow>
          <span>Medium</span>
          <AlertBlock
            className={data.medium === 0 ? 'empty': ''}
            backgroundColor={data.medium > 0 ? colors['medium'][0] : colors['medium'][1]}>
            {data.medium > 0 ? data.medium : ''}
          </AlertBlock>
        </AlertRow>
        <AlertRow>
          <span>Low</span>
          <AlertBlock
            className={data.low === 0 ? 'empty': ''}
            backgroundColor={data.low > 0 ? colors['low'][0] : colors['low'][1]}>
            {data.low > 0 ? data.low : ''}
          </AlertBlock>
        </AlertRow>
      </AlertContent>
    </Wrapper>
  )
}

export default AlertChart