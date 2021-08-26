import React, { useState } from 'react'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import {
  addingBuildingProgressState,
  lightingSubSystemListState
} from '../../../atoms'
import _ from 'lodash'

import LightingSubSystem from './LightingSubSystem'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { Redirect, useParams } from 'react-router-dom'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const Header = styled.div`
  margin-bottom: 20px;
`

const Adding = styled.span`
  cursor: pointer;
  color: var(--bs-primary);
`

const Ul = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    //margin-bottom: 20px;
  }
`

const Lighting = () => {
  const [lightingSubSystemList, setLightingSubSystemList] = useRecoilState(
    lightingSubSystemListState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const onAddLightingSubSystemList = () => {
    setLightingSubSystemList((oldLightingSubSystemList) => [
      ...oldLightingSubSystemList,
      {
        id: parseInt(_.uniqueId()),
        title: 'Fitting ',
        indoorLightingSystemTypeId: 1,
        percentage: 0
      }
    ])
  }

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(75)
    setIsMovingNext(true)
  }

  const { handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      // buildingName: 'data?.buildingName',
      // postalCode:data?.postalCode,
      // address: data?.address,
      // city: data?.city,
      // countryCode: data?.countryCode,
      // state: data?.state
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false
  })

  const lis = lightingSubSystemList.map(item =>

    <li className='col-12 col-lg-6 mb-4' key={item.id}>
      <LightingSubSystem data={item} />
    </li>
  )

  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'
  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/envelope-facade')

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to={moveNextUrl} />}
      <div className='d-flex mt-5 mb-4'>

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/hvac'}
          nextLink='/adding-building/envelope-facade'
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav />

      <div className='row'>
        <div className='col-12 col-lg-8'>
          <Header className='d-flex justify-content-between'>
            <h6>Lighting Subsystem</h6>
            <Adding onClick={onAddLightingSubSystemList} title='Add new item'><i
              className='bi bi-plus-lg font-weight-bolder'
                                                                              />
            </Adding>
          </Header>
          <Ul className='row'>
            {lis}
          </Ul>
        </div>
      </div>
    </Form>
  )
}

export default Lighting
