import React from 'react'
import { Link } from 'react-router-dom'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { lightingSubSystemListState } from '../../../atoms'
import _ from 'lodash'

import LightingSubSystem from './LightingSubSystem'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 600;
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

  const onAddLightingSubSystemList = () => {

    setLightingSubSystemList((oldLightingSubSystemList) => [
      ...oldLightingSubSystemList,
      {
        id: _.uniqueId(),
        title: `Usage`,
        indoorLightingSystemType: '',
        percentage: 0,
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

  const lis = lightingSubSystemList.map(item =>
    <li className="col-12 col-lg-6 mb-4" key={item.id}>
      <LightingSubSystem data={item}/>
    </li>,
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <div className="form-group ms-auto">
          <Link to="/adding-building/search-building">
            <button type="button"
                    className="btn btn-outline-primary me-1">&lt; Back
            </button>
          </Link>
          <Link to="/adding-building/electricity-consumption">
            <button type="submit"
                    className="btn btn-primary">Next &gt;</button>
          </Link>
        </div>
      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12 col-lg-6">
          <Header className="d-flex justify-content-between">
            <h6>Lighting Subsystem</h6>
            <Adding onClick={onAddLightingSubSystemList} title="Add new item"><i
              className="bi bi-plus-lg font-weight-bolder"/></Adding>
          </Header>
          <Ul className="row">
            {lis}
          </Ul>
        </div>
      </div>
    </Form>
  )
}

export default Lighting