/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import StepNav from '../step-nav/StepNav'
import TimeTable from './TimeTable'
import SpaceUsageGFA from './SapceUsageGFA'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState } from 'atoms'
import { Redirect, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const Activity = () => {

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const { id } = useParams()

  const { user } = useAuth()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'
  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/electricity-consumption')
  const { t } = useTranslation('buildingInput')

  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Activity - Adding Building', idToken)
    }
    tracking()
  }, [])

  const onSubmit = () => {
    if (!id) {
      setAddingBuildingProgressState(45)
    }
    setIsMovingNext(true)
  }

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext &&
      <Redirect to={moveNextUrl}/>}
      <div className="d-flex mt-5 mb-4">

        <Title>{t('New Building')}</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/general-information'}
          nextLink="/adding-building/electricity-consumption"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav/>

      <div className="row">
        <div className="col-6">
          <TimeTable
            control={control}
            setValue={setValue}
          />
        </div>
        <div className="col-6">
          <SpaceUsageGFA control={control} setValue={setValue}/>
        </div>
      </div>

    </form>
  )
}

export default Activity
