/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import StepNav from '../step-nav/StepNav'
import { useForm } from 'react-hook-form'
import SolarPanel from './SolarPanel'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState, solarPanelSystemListState } from 'atoms'
import _ from 'lodash'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useNavigate, useParams } from 'react-router-dom'
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
`

const RenewableEnergy = () => {
  const navigate = useNavigate();

  const [solarSystemList, setSolarSystemList] = useRecoilState(
    solarPanelSystemListState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const { t } = useTranslation('buildingInput')

  const onAddSolarSystemList = () => {
    setSolarSystemList((oldList) => [
      ...oldList,
      {
        id: _.uniqueId(),
        title: 'System',
        installedCapacity: '',
        trackingTypeId: '',
        inclineAngle: 0,
        orientationAngle: 0,
        systemLoss: 14,
        pvTechChoiceId: '',
        mountingTypeId: '',
      },
    ])
  }

  const onSubmit = () => {
    // console.log(data)
    setAddingBuildingProgressState(100)
    //navigate(parentUrl + '/adding-building-successfully')
  }

  const { handleSubmit, control, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const lis = solarSystemList.map(item =>

    <li className="col-12 col-lg-6 mb-4" key={item.id}>
      <SolarPanel data={item} control={control} setValue={setValue}/>
    </li>,
  )

  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'

  const { user } = useAuth()
  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Renewable Energy - Adding Building', idToken)
    }
    tracking()
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex mt-5 mb-4">

        <Title>{t('New Building')}</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/envelope-facade'}
          noNextLink
          progressValue={addingBuildingProgress}
          isDisabledSave={false}
        />

      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12 col-lg-8">
          <Header className="d-flex justify-content-between">
            <h6>{t('Solar P.V. System')}</h6>
            <Adding title={t("Add new item")} onClick={onAddSolarSystemList}>
              <i className="bi bi-plus-lg font-weight-bolder"/>
            </Adding>
          </Header>
          <Ul className="row">{lis}</Ul>
        </div>
      </div>
    </Form>
  )
}

export default RenewableEnergy
