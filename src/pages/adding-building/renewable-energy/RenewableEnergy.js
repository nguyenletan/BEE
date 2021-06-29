import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StepNav from '../step-nav/StepNav'
import { useForm } from 'react-hook-form'
import SolarPanel from './SolarPanel'
import { Button } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import {
  solarPanelSystemListState,
} from '../../../atoms'
import _ from 'lodash'
import {Save, ArrowBack} from '@material-ui/icons';
import Progress from '../../../components/Progress'


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

const RenewableEnergy = () => {

  const [solarSystemList, setSolarSystemList] = useRecoilState(solarPanelSystemListState)

  const onAddSolarSystemList = () => {

    setSolarSystemList((oldList) => [
      ...oldList,
      {
        id: _.uniqueId(),
        title: 'System',
        installedCapacity: 0,
        trackingType: 0,
        inclineAngel: 0,
        orientationAngle: 0,
        systemLoss: 14,
        pvTechChoiceId: 0,
        mountingType: 0
      },
    ])

  }

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

  const lis = solarSystemList.map(item =>

    <li className="col-12 col-lg-6 mb-4" key={item.id}>
      <SolarPanel data={item}/>
    </li>
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <div className="d-flex ms-auto align-items-center">
          <Progress value={65} />
          <Button size="medium" startIcon={<Save />} variant="contained" color="primary" className="me-2">Save</Button>
          <Link to="/adding-building/envelope-facade">
            <Button size="medium" startIcon={<ArrowBack/>} variant="contained" color="default" className="me-2">Back
            </Button>
          </Link>
          {/*<Link to="/adding-building/electricity-consumption">*/}
          {/*  <Button variant="contained" color="primary">Next &gt;</Button>*/}
          {/*</Link>*/}
        </div>
      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12 col-lg-8">
          <Header className="d-flex justify-content-between">
            <h6>Solar Panel Subsystem</h6>
            <Adding  title="Add new item" onClick={onAddSolarSystemList}>
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