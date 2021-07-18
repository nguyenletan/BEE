import React, { useState } from 'react'
import styled from 'styled-components'
import StepNav from '../step-nav/StepNav'
import { useForm } from 'react-hook-form'
import SolarPanel from './SolarPanel'
import { useRecoilState } from 'recoil'
import {
  addingBuildingProgressState,
  solarPanelSystemListState,
} from '../../../atoms'
import _ from 'lodash'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { Redirect } from 'react-router-dom'

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
`

const RenewableEnergy = () => {

  const [solarSystemList, setSolarSystemList] = useRecoilState(
    solarPanelSystemListState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const onAddSolarSystemList = () => {
    setSolarSystemList((oldList) => [
      ...oldList,
      {
        id: _.uniqueId(),
        title: 'System',
        installedCapacity: 0,
        trackingTypeId: 0,
        inclineAngel: 0,
        orientationAngle: 0,
        systemLoss: 14,
        pvTechChoiceId: 0,
        mountingTypeId: 0,
      },
    ])
  }

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(100)
    setIsMovingNext(true)
  }

  const { handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const lis = solarSystemList.map(item =>

    <li className="col-12 col-lg-6 mb-4" key={item.id}>
      <SolarPanel data={item}/>
    </li>,
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext &&
      <Redirect to="/adding-building/adding-building-successfully"/>}
      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink="/adding-building/envelope-facade"
          noNextLink={true}
          progressValue={addingBuildingProgress}
          isDisabledSave={false}
        />

      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12 col-lg-8">
          <Header className="d-flex justify-content-between">
            <h6>Solar P.V. System</h6>
            <Adding title="Add new item" onClick={onAddSolarSystemList}>
              <i className="bi bi-plus-lg font-weight-bolder"/>
            </Adding>
          </Header>
          <Ul className="row">{lis}</Ul>
        </div>
      </div>
    </Form>
  )
}

export default RenewableEnergy