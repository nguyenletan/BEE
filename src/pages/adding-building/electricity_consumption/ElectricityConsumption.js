import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import StepNav from '../step-nav/StepNav'
import OneMonthElectricityConsumption from './OneMonthElectricityConsumption'

import { electricityConsumptionListState } from '../../../atoms'
import { getNextMonthYear } from '../../../Utilities'
import BackNextGroupButton from '../back-next-group-buttons/BackNextGroupButton'

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

const Adding = styled.span`
  cursor: pointer;

  color: var(--bs-primary);

  i {
    font-size: 24px;
  }
`

const ElectricityConsumption = () => {

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(image)
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
      console.log(
        electricityConsumptionList[electricityConsumptionList.length - 1])
      nextMonthYear = getNextMonthYear(
        electricityConsumptionList[electricityConsumptionList.length - 1].month,
        electricityConsumptionList[electricityConsumptionList.length - 1].year)
    }

    console.log(nextMonthYear)

    setElectricityConsumptionList((oldElectricityConsumptionList) => [
      ...oldElectricityConsumptionList,
      {
        id: _.uniqueId(),
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

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink="/adding-building/activity"
          nextLink="/adding-building/hvac"
          progressValue={70}
          isDisabledSave={true}
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
            <Adding title="Add new item"
                    onClick={onAddElectricityConsumption}><i
              className="bi bi-plus-circle"/></Adding>
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