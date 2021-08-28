import React, { useState } from 'react'
import CoolingSystem from './CoolingSystem'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import HeatingSystem from './HeatingSystem'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState } from '../../../atoms'
import { Redirect, useParams } from 'react-router-dom'

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

  const { handleSubmit, control, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  })

  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'

  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/lighting')

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to={moveNextUrl}/>}

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/electricity-consumption'}
          nextLink="/adding-building/lighting"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav activePositon={2}/>
      <div className="row">

        <div className="col-12 col-lg-6 col-xxl-5">
          <CoolingSystem control={control} setValue={setValue}/>
        </div>

        <div className="col-12 col-lg-6 col-xxl-5">
          <HeatingSystem control={control} setValue={setValue}/>
        </div>
      </div>
    </Form>
  )
}

export default HVAC
