import React from 'react'
import styled from 'styled-components'
import SpaceUsageGFAForm from './SpaceUsageGFAForm'
import { useRecoilState } from 'recoil'
import { spaceUsageGFAListState } from '../../../atoms'
import _ from 'lodash'

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

const SpaceUsageGFA = ({control, setValue}) => {
  const [spaceUsageGFAList, setSpaceUsageGFAList] = useRecoilState(spaceUsageGFAListState)

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
        hasReheatRecovery: false
      }
    ])
  }

  const lis = spaceUsageGFAList.map(item =>
    <li className='col-12 col-lg-6 mb-4' key={item.id}>
      <SpaceUsageGFAForm data={item} control={control} setValue={setValue}/>
    </li>
  )

  return (
    <>
      <Header className='d-flex justify-content-between'>
        <h6>Space Usage and %GFA</h6>
        <Adding onClick={onAddSpaceUsageGFA} title='Add new item'>
          <i className='bi bi-plus-lg font-weight-bolder'/>
        </Adding>
      </Header>
      <UL className='row'>
        {lis}
      </UL>
    </>
  )
}

export default SpaceUsageGFA
