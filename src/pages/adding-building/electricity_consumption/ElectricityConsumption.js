import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import AddIcon from '@material-ui/icons/Add'
import StepNav from '../step-nav/StepNav'
import OneMonthElectricityConsumption from './OneMonthElectricityConsumption'

import {
  addingBuildingProgressState,
  electricityConsumptionListState,
} from '../../../atoms'
import { getNextMonthYear } from '../../../Utilities'
import BackNextGroupButton from '../back-next-group-buttons/BackNextGroupButton'
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
  font-weight: 500;

  span {
    font-size: .95em;
    font-weight: 400;
    color: var(--bs-primary);
  }
`

const UL = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Adding = styled(AddIcon)`
  cursor: pointer;
  color: var(--bs-primary);
`

const ElectricityConsumption = () => {

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(55)
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
    shouldUnregister: false,
  })

  const [electricityConsumptionList, setElectricityConsumptionList] = useRecoilState(
    electricityConsumptionListState)

  const onAddElectricityConsumption = () => {

    let nextMonthYear = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }
    if (electricityConsumptionList !== null &&
      electricityConsumptionList.length > 0) {
      console.log(electricityConsumptionList[electricityConsumptionList.length - 1])
      nextMonthYear = getNextMonthYear(
        electricityConsumptionList[electricityConsumptionList.length - 1].month,
        electricityConsumptionList[electricityConsumptionList.length - 1].year)
    }

    console.log(nextMonthYear)

    setElectricityConsumptionList((oldElectricityConsumptionList) => [
      ...oldElectricityConsumptionList,
      {
        id: parseInt(_.uniqueId()),
        month: nextMonthYear.month,
        year: nextMonthYear.year,
        value: 0,
        cost: 0,
      },
    ])

  }

  const lis = electricityConsumptionList.map(item =>
    <OneMonthElectricityConsumption key={'ElectricityConsumption' + item.id}
                                    data={item}/>,
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to="/adding-building/hvac"/>}

      <div className="d-flex mt-5 mb-4">
        <Title>New Building</Title>

        <BackNextGroupButton
          backLink="/adding-building/activity"
          nextLink="/adding-building/hvac"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav activePositon={2}/>
      <div className="">
        <Header className="row">
          <div className="col-3">
            Month / Year
          </div>
          <div className="col-3">
            Cost <span>($)</span>
          </div>
          <div className="col-3">
            Value <span>(kWh)</span>
          </div>
          <div className="col-3">
            <Adding titleAccess="Add new item" fontSize="large"
                    onClick={onAddElectricityConsumption}/>
          </div>
        </Header>
        <UL>
          {lis}
        </UL>

      </div>
    </Form>
  )
}

export default ElectricityConsumption