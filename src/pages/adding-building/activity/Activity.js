import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import StepNav from '../step-nav/StepNav'
import TimeTable from './TimeTable'
import SpaceUsageGFA from './SapceUsageGFA'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  addingBuildingProgressState,
  buildingActivityState
} from '../../../atoms'
import { Redirect } from 'react-router-dom'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const Activity = () => {
  const buildingActivity = useRecoilValue(buildingActivityState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(image)
    // setBuildingActivity(data)
    setAddingBuildingProgressState(45)
    setIsMovingNext(true)
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext &&
        <Redirect to='/adding-building/electricity-consumption' />}
      <div className='d-flex mt-5 mb-4'>

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink='/adding-building/general-information'
          nextLink='/adding-building/electricity-consumption'
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav />

      <div className='row'>
        <div className='col-6'>
          <TimeTable
            data={buildingActivity}
            control={control}
            setValue={setValue}
            register={register}
            getValues={getValues}
          />
        </div>
        <div className='col-6'>
          <SpaceUsageGFA />
        </div>
      </div>

    </Form>
  )
}

export default Activity
