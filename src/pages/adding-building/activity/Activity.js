import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StepNav from '../step-nav/StepNav'
import TimeTable from './TimeTable'
import SpaceUsageGFA from './SapceUsageGFA'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0;
`

const Activity = () => {

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

      <div className="d-flex">

        <Title>New Building</Title>

        <div className="form-group ml-auto r">
          <Link to="/adding-building/search-building">
            <button type="button" className="btn btn-outline-primary mr-1">&lt; Back
            </button>
          </Link>
          <Link to="/adding-building/electricity-consumption">
          <button type="submit"
                  className="btn btn-primary">Next &gt;</button>
          </Link>
        </div>
      </div>

      <StepNav activePositon={1}/>

      <div className="row">
        <div className="col-6">
          <TimeTable/>

        </div>
        <div className="col-6">
          <SpaceUsageGFA/>
        </div>
      </div>


    </Form>
  )
}

export default Activity