import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`

`

const Content = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 1rem;
`

const Value = styled.span`
  display: block;
  color: #87972f;
  font-size: 1.5rem;
  margin-bottom: 10px;
`

const MaintenanceRegime = () => {
  const { t } = useTranslation('equipmentAssetReliability')

  return (
    <Wrapper>
      <h5>{t('Maintenance Regime')}</h5>
      <Content>
        <Label>{t('Recurring Tasks Scheduled')}</Label>
        <Value>6</Value>
        <Label>{t('Upcoming Tasks in 2 Weeks')}</Label>
        <Value>{t('2 Days')}</Value>
        <Label>{t('Tasks Missed in Past 2 Weeks')}</Label>
        <Value>1</Value>
      </Content>
      <button className="btn btn-primary btn-sm float-end">{t('Details')}</button>
    </Wrapper>
  )

}

export default MaintenanceRegime