/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import {Add} from '@mui/icons-material'
import StepNav from '../step-nav/StepNav'
import OneMonthElectricityConsumption from './OneMonthElectricityConsumption'

import { addingBuildingProgressState, electricityConsumptionListState } from 'atoms'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useNavigate, useParams } from 'react-router-dom'
import { getPrevMonthYear } from 'Utilities'
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

const Adding = styled(Add)`
  cursor: pointer;
  color: var(--bs-primary);
`

const ElectricityConsumption = () => {
  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)
  const { t } = useTranslation('buildingInput')

  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'
  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/hvac')
  const { user } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(55)
    //navigate(moveNextUrl)
  }

  const {
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
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
      //console.log(electricityConsumptionList[electricityConsumptionList.length - 1])
      nextMonthYear = getPrevMonthYear(
        electricityConsumptionList[electricityConsumptionList.length - 1].month,
        electricityConsumptionList[electricityConsumptionList.length - 1].year)
    }

    setElectricityConsumptionList((oldElectricityConsumptionList) => [
      ...oldElectricityConsumptionList,
      {
        id: parseInt(_.uniqueId()),
        month: nextMonthYear.month,
        year: nextMonthYear.year,
        value: '',
        cost: '',
      },
    ])
  }

  const lis = electricityConsumptionList.map(item =>
    <OneMonthElectricityConsumption
      key={'ElectricityConsumption' + item.id}
      data={item}
      control={control}
      setValue={setValue}
    />,
  )


  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Electricity Consumption - Adding Building', idToken)
    }
    tracking()
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex mt-5 mb-4">
        <Title>{t('New Building')}</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/activity'}
          nextLink="/adding-building/hvac"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav activePositon={2}/>
      <div className="">
        <Header className="row">
          <div className="col-3">
            {t('Month / Year')}
          </div>
          <div className="col-3">
            {t('Cost ($)')}
          </div>
          <div className="col-3">
            {t('Consumption (kWh)')}
          </div>
          <div className="col-3">
            <Adding
              titleAccess={t("Add new item")} fontSize="large"
              onClick={onAddElectricityConsumption}
            />
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
