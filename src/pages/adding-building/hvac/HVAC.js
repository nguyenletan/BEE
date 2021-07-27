import React, { useState } from 'react'
import CoolingSystem from './CoolingSystem'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import HeatingSystem from './HeatingSystem'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState } from '../../../atoms'
import { Redirect } from 'react-router-dom'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const HVAC = () => {
  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(65)
    setIsMovingNext(true)
  }

  const { handleSubmit, control } = useForm({
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to='/adding-building/lighting' />}

      <div className='d-flex mt-5 mb-4'>

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink='/adding-building/electricity-consumption'
          nextLink='/adding-building/lighting'
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav activePositon={2} />
      <div className='row'>

        <div className='col-12 col-lg-6 col-xxl-5'>
          <CoolingSystem control={control}/>
        </div>

        <div className='col-12 col-lg-6 col-xxl-5'>
          <HeatingSystem control={control}/>
        </div>
      </div>
    </Form>
  )
}

export default HVAC
