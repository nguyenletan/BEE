import styled from 'styled-components'
import { EuiAccordion, EuiPanel } from '@elastic/eui'
import React from 'react'
import { getWeatherIcon } from 'WeatherIcons'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const H4 = styled.h4`
  font-weight: 700;
  font-size: 1.1em;
  color: var(--bs-red);
`

const AlertWeatherInformation = () => {
  const buttonContent = (
    <div className="d-flex align-items-center">
      <img className="me-3" src={getWeatherIcon('snow')} alt="snow" width="32px"/>
      <H4 className="font-bold">Alert Weather</H4>
    </div>
  )

  return (
    <EuiAccordion initialIsOpen={true} className="mb-5" buttonContent={buttonContent}>
      <EuiPanel color="subdued">
        <Wrapper>
          <p>Temperature that was 13.4℃ above last 5 years average.</p>
        </Wrapper>
      </EuiPanel>
    </EuiAccordion>
  )
}

export default AlertWeatherInformation