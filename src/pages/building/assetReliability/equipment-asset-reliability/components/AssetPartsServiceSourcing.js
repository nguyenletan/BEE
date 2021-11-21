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

const AssetPartsServiceSourcing = () => {

  const { t } = useTranslation('equipmentAssetReliability')

  return (
    <Wrapper>
      <h5>{t('Asset, Parts & Service Sourcing')}</h5>
      <Content>
        <Label>{t('Projected Sourcing Required')}</Label>
        <Value>2</Value>
        <Label>{t('Max Lead Time')}</Label>
        <Value>{t('2 Days')}</Value>
        <Label>{t('Total Cost ($)')}</Label>
        <Value>340</Value>
        <Label>{t('Potential Replacement Options')}</Label>
        <Value>{t('Yes')}</Value>
      </Content>
      <button className="btn btn-primary btn-sm float-end">{t('Details')}</button>
    </Wrapper>
  )

}

export default AssetPartsServiceSourcing