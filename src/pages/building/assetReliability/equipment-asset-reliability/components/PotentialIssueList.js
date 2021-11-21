import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`

`
const PotentialIssueTable = styled.table`
  border-top: none;

  th {
    font-size: 0.9rem;
    font-weight: 500;
    border: none !important;
    vertical-align: middle !important;
    text-align: left;
  }

  thead tr {

    border-bottom: 1px solid #eaeaea;
  }
  
  tbody {
    border-top: 2px solid #eaeaea !important;
    border-bottom: 2px solid #eaeaea !important;
  }

  tbody tr {
    line-height: 77px;
    border-bottom: 1px solid #eaeaea;
  }

  td {
    text-transform: capitalize;
    border: none;
    text-align: left;
    font-size: 0.9rem;
  }
`

const InfoButton = styled.button`
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: uppercase;
  a {
    color: white !important;
  }
`

const PotentialIssueList =() => {
  const { t } = useTranslation('equipmentAssetReliability')

  return (
    <Wrapper>
      <h5>{t('List of Potential Issues')}</h5>
      <PotentialIssueTable className="table ">
        <thead>
        <tr>
          <th scope="col">{t('Similar Historical Fault')}</th>
          <th scope="col">{t('May Exceed Threshold In')}</th>
          <th scope="col">{t('Average Parts Lead Time')}</th>
          <th scope="col">{t('Average Time to Repair')}</th>
          <th scope="col">{t('Details')}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{t('Refrigerant Leak')}</th>
          <td>{t('6 Days | 13-Oct')}</td>
          <td>{t('1 Day')}</td>
          <td>{t('1 Day')}</td>
          <td><InfoButton className="btn btn-primary btn-sm">{t('INFO')}</InfoButton></td>
        </tr>
        <tr>
          <th scope="row">{t('Worn Compressor')}</th>
          <td>{t('5 Days | 12-Oct')}</td>
          <td>{t('In Inventory')}</td>
          <td>{t('2 Days')}</td>
          <td><InfoButton className="btn btn-primary btn-sm">{t('INFO')}</InfoButton></td>
        </tr>
        <tr>
          <th scope="row">{t('Evaporator Fouling')}</th>
          <td>{t('6 Days | 13-Oct')}</td>
          <td>{t('NA')}</td>
          <td>{t('1 Day')}</td>
          <td><InfoButton className="btn btn-primary btn-sm">{t('INFO')}</InfoButton></td>
        </tr>
        </tbody>
      </PotentialIssueTable>
    </Wrapper>
  )
}

export default PotentialIssueList