/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TotalBreakDownPieChart from 'pages/building/assetReliability/equipment-asset-reliability/components/TotalBreakDownPieChart'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`

`

const TotalCostBreakDown = () => {

  const { t, i18n } = useTranslation('equipmentAssetReliability')

  const dataEN = [
    {
      id: 'Energy',
      label: 'Energy',
      value: 40,
      color: '#87972f',
      pureValue:  400000
    },
    {
      id: 'Maintenance',
      label: 'Maintenance',
      value: 23,
      color: '#acbf42',
      pureValue: 230000
    },
    {
      id: 'Parts',
      label: 'Parts',
      value: 27,
      color: '#d5dfa3',
      pureValue: 270000
    },
  ]

  const dataDE = [
    {
      id: 'Elektrische Energie',
      label: 'Energy',
      value: 40,
      color: '#87972f',
      pureValue:  400000
    },
    {
      id: 'Ersatzteile',
      label: 'Parts',
      value: 27,
      color: '#d5dfa3',
      pureValue: 270000
    },
    {
      id: 'Instandhaltung',
      label: 'Maintenance',
      value: 23,
      color: '#acbf42',
      pureValue: 230000
    },

  ]

  const [data, setData] = useState(dataEN)

  useEffect(() => {
    if(i18n.language === 'en') {
      setData(dataEN)
    } else {
      setData(dataDE)
    }
  }, [i18n.language])

  return (
    <Wrapper>
      <h5>{t('Total Cost Breakdown')}</h5>

      <TotalBreakDownPieChart
        title=""
        startAngle={-100}
        data={data}
        innerRadius={0.55}
        marginRight="0px"
        hasDescription
      />
    </Wrapper>
  )

}

export default TotalCostBreakDown