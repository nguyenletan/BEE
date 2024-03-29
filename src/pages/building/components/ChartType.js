import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  span {
    margin-right: 1rem;
    font-weight: 500;
    color: var(--bs-gray-500);
    font-size: 1.2rem;
    transition: color 200ms ease-in-out;
    padding: 0 0.5rem 1px 0.5rem;
    cursor: pointer;
    &:hover {
      color: var(--bs-gray-600);
    }
    &.active {
      color: var(--bs-dark) !important;
      border-color: var(--bs-primary);
      display: inline-block;
      border-bottom: 4px solid var(--bs-primary);
      padding-bottom: 1px;
    }
  }
`

const ChartType = ({onChange, type}) => {
  const onClick = (value) => {
    onChange(value)
  }


  const { t } = useTranslation('buildingPerformance');

  return (
    <Wrapper className="d-flex">
      <span onClick={() => onClick('year')} className={type==='year' ? 'active' : ''}>{t('Year')}</span>
      <span onClick={() => onClick('quarter')} className={type==='quarter' ? 'active' : ''}>{t('Quarter')}</span>
      <span onClick={() => onClick('month')} className={type==='month' ? 'active' : ''}>{t('Month')}</span>
      {/*<span onClick={() => onClick('week')} className={type==='week' ? 'active' : ''}>Week</span>*/}
      <span onClick={() => onClick('day')} className={type==='day' ? 'active' : ''}>{t('Day')}</span>
    </Wrapper>
  )
}

export default ChartType