/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import CoolingSystem from './CoolingSystem'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import HeatingSystem from './HeatingSystem'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState } from 'atoms'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const HVAC = () => {

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

  const navigate = useNavigate()
  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'

  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/lighting')
  const { user } = useAuth()

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const { t } = useTranslation('buildingInput')

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(65)
    //navigate(moveNextUrl, { replace: true })
  }

  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'HVAC - Adding Building', idToken)
    }
    tracking()
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex mt-5 mb-4">

        <Title>{t('New Building')}</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/heat-consumption'}
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
