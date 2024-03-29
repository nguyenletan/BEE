import React from 'react'
import styled from 'styled-components'
import SpaceUsageGFAForm from './SpaceUsageGFAForm'
import { useRecoilState, useRecoilValue } from 'recoil'
import { spaceUsageGFAListState, totalPercentageOfSpaceUsageGFAListState } from '../../../atoms'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

const Header = styled.div`
  margin-bottom: 20px;
`

const Adding = styled.span`
  cursor: pointer;
  color: var(--bs-primary);
`

const UL = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    //margin-bottom: 20px;
  }
`

const SpaceUsageGFA = ({ control, setValue}) => {
  const [spaceUsageGFAList, setSpaceUsageGFAList] = useRecoilState(spaceUsageGFAListState)
  //const totalPercentageOfSpaceUsageGFAList = useRecoilValue(totalPercentageOfSpaceUsageGFAListState)
  const { t } = useTranslation('buildingInput')
  const onAddSpaceUsageGFA = () => {
    setSpaceUsageGFAList((oldSpaceUsageGFAList) => [
      ...oldSpaceUsageGFAList,
      {
        id: parseInt(_.uniqueId()),
        title: '',
        typeId: '',
        percentage: '',
        climateControlId: '',
        fanTypeId: '',
        hasReheatRecovery: false,
      },
    ])
  }

  const lis = spaceUsageGFAList.map(item =>
    <li className="col-12 col-lg-6 mb-4" key={item.id}>
      <SpaceUsageGFAForm data={item} control={control} setValue={setValue}/>
    </li>,
  )

  return (
    <>
      <Header className="d-flex justify-content-between">
        <h6>{t('Space usage and %GFA')}</h6>
        <Adding onClick={onAddSpaceUsageGFA} title={t("Add new item")}>
          <i className="bi bi-plus-lg font-weight-bolder"/>
        </Adding>
      </Header>
      {/*<Controller*/}
      {/*  name={`total`}*/}
      {/*  control={control}*/}
      {/*  setValue={setValue}*/}
      {/*  render={({*/}
      {/*    field: { onChange }*/}
      {/*  }) => (*/}
      {/*    <>*/}
      {/*      <input*/}
      {/*        type="hidden"*/}
      {/*        onChange={onChange}*/}
      {/*        value={totalPercentageOfSpaceUsageGFAList}/>*/}
      {/*      {totalPercentageOfSpaceUsageGFAList !== 100 && <p className="text-danger">{t('Total Space Usage')} ({totalPercentageOfSpaceUsageGFAList}%) {t('should be 100% (All space usage added together)')})</p>}*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*  rules={{*/}
      {/*    validate: () => {*/}
      {/*      //console.log(totalPercentageOfSpaceUsageGFAList)*/}
      {/*      return totalPercentageOfSpaceUsageGFAList === 100*/}
      {/*    },*/}
      {/*    message: `Total Space Usage (${totalPercentageOfSpaceUsageGFAList}) should be 100% (All space usage added together)`,*/}
      {/*  }}*/}
      {/*/>*/}

      <UL className="row">
        {lis}
      </UL>
    </>
  )
}

export default SpaceUsageGFA
