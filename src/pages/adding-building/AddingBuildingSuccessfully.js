import React from 'react'
import BackNextGroupButton from './back-next-group-buttons/BackNextGroupButton'
import StepNav from './step-nav/StepNav'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import DomainIcon from '@material-ui/icons/Domain';

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const Icon = styled(DomainIcon)`
  //color: var(--bs-primary);
  font-size: 56px !important;
`

const AddingBuildingSuccessfully = () => {

  return (
    <div>
      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink="/adding-building/renewable-energy"
          progressValue="100"
          isInDoneStep={true}
        />

      </div>

      <StepNav/>

      <div className="text-center">
        <Icon />
        <Typography variant="h3" gutterBottom className="text-center" >
          The building was successfully created!
        </Typography>
      </div>
    </div>
  )

}

export default AddingBuildingSuccessfully