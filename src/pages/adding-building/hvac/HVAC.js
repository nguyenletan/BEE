import React from 'react'
import CoolingSystem from './CoolingSystem'
import { Link } from 'react-router-dom'
import StepNav from '../step-nav/StepNav'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import HeatingSystem from './HeatingSystem'

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