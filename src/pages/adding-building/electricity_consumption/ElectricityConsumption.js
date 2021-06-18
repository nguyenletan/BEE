import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import StepNav from '../step-nav/StepNav'
import OneMonthElectricityConsumption from './OneMonthElectricityConsumption'

import { electricityConsumptionListState } from '../../../atoms'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0;
`

const Header = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
`

const UL = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Adding = styled.span`
  cursor: pointer;

  color: var(--primary);

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

    setElectricityConsumptionList((oldElectricityConsumptionList) => [
      ...oldElectricityConsumptionList,
      {
        id: _.uniqueId(),
        month: null,
        year: null,
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

      <div className="d-flex">

        <Title>New Building</Title>

        <div className="form-group ml-auto r">
          <Link to="/adding-building/activity">
            <button type="button"
                    className="btn btn-outline-primary mr-1">&lt; Back
            </button>
          </Link>
          <button type="submit"
                  className="btn btn-primary">Next &gt;</button>
        </div>
      </div>

      <StepNav activePositon={2}/>
      <div className="">
        <Header className="row">
          <div className="col-3">
            Month / Year
          </div>
          <div className="col-3">
            Cost
          </div>
          <div className="col-3">
            Value
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