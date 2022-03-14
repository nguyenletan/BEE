/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  addingBuildingProgressState,
  lightingSubSystemListSelectorState,
  lightingSubSystemListState,
  totalEfficacyOfLightingSubSystemListState,
  totalWattOfLightingSubSystemListState,
} from 'atoms'
import _ from 'lodash'

import LightingSubSystem from './LightingSubSystem'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { Redirect, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'AuthenticateProvider'
import { trackingUser } from 'api/UserAPI'

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

  li {
    //margin-bottom: 20px;
  }
`

const Lighting = () => {
  const [lightingSubSystemList, setLightingSubSystemList] = useRecoilState(
    lightingSubSystemListState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const { t } = useTranslation('buildingInput')

  const lightingSubSystemListSelector = useRecoilValue(lightingSubSystemListSelectorState)
  const totalWatt = useRecoilValue(totalWattOfLightingSubSystemListState)
  const overallEfficacy = useRecoilValue(totalEfficacyOfLightingSubSystemListState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const { user } = useAuth()
  useEffect(() => {
    async function tracking () {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Lighting - Adding Building', idToken)
    }

    tracking()
  }, [])

  const onAddLightingSubSystemList = () => {
    setLightingSubSystemList((oldLightingSubSystemList) => [
      ...oldLightingSubSystemList,
      {
        id: parseInt(_.uniqueId()),
        title: 'Light ',
        indoorLightingSystemTypeId: '',
        percentage: '',
        numberOfBulbs: 0,
        wattRatingOfBulb: 0,
        lumensOfBulb: 0,
      },
    ])
  }

  const onSubmit = () => {
    // console.log(data)
    setAddingBuildingProgressState(75)
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

  const lis = lightingSubSystemList.map((item, index) =>

    <li className="col-12 col-lg-6 col-xl-4 mb-4" key={item.id}>
      <LightingSubSystem data={item}
                         totalWatt={lightingSubSystemListSelector[index]?.totalWatt}
                         percentage={lightingSubSystemListSelector[index]?.percentage}
                         efficacy={lightingSubSystemListSelector[index]?.efficacy}
                         control={control}
                         order={index}
                         setValue={setValue}/>
    </li>,
  )

  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'
  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/envelope-facade')

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to={moveNextUrl}/>}
      <div className="d-flex mt-5 mb-4">

        <Title>{t('New Building')}</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/hvac'}
          nextLink="/adding-building/envelope-facade"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12">
          <Header className="d-flex justify-content-between">
            <h6>{t('Lighting Subsystem')}</h6>

            <Adding onClick={onAddLightingSubSystemList} title={t('Add new item')}><i
              className="bi bi-plus-lg font-weight-bolder"
            />
            </Adding>
          </Header>
          <p>Total Watt (W): <strong className="text-primary">{totalWatt}</strong></p>
          <p>Overall Efficacy (lm/W): <strong className="text-success">{overallEfficacy}</strong></p>
          {/* <p>{t('Total light fitting usage')}: {totalPercentageOfLightingSubSystemList}%</p> */}
          {/* <Controller
            name={`total`}
            control={control}
            setValue={setValue}
            render={({
              field: { onChange }
            }) => (
              <>
                <input
                  type="hidden"
                  onChange={onChange}
                  value={totalPercentageOfLightingSubSystemList}/>
                {totalPercentageOfLightingSubSystemList !== 100 && <p className="text-danger">
                  {t('Total light fitting usage')} ({totalPercentageOfLightingSubSystemList}%) {t('should be 100% (All space usage added together)')}</p>}
              </>
            )}
            rules={{
              validate: () => {
                return totalPercentageOfLightingSubSystemList === 100
              }
            }}
          /> */}

          <Ul className="row">
            {lis}
          </Ul>
        </div>
      </div>
    </Form>
  )
}

export default Lighting
