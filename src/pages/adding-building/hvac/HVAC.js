import React from 'react'
import CoolingSystem from './CoolingSystem'
import { Link } from 'react-router-dom'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import HeatingSystem from './HeatingSystem'
import { Button } from '@material-ui/core'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const HVAC = () => {

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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <div className="form-group ms-auto">
          <Link to="/adding-building/electricity-consumption">
            <Button variant="contained" color="default" className="me-2">&lt; Back
            </Button>
          </Link>
          <Link to="/adding-building/lighting">
            <Button variant="contained" color="primary">Next &gt;</Button>
          </Link>
        </div>
      </div>

      <StepNav activePositon={2}/>
      <div className="row">
        
        <div className="col-12 col-lg-6 col-xxl-4">
            <CoolingSystem/>
        </div>

        <div className="col-12 col-lg-6 col-xxl-4">
          <HeatingSystem/>
        </div>
      </div>
    </Form>
  )
}

export default HVAC