import React from 'react'
import BackNextGroupButton from '../../components/BackNextGroupButton'

import styled from 'styled-components'
import {Typography} from '@mui/material'

import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState } from 'atoms'
import { useTranslation } from 'react-i18next'



const Icon = styled(BusinessRoundedIcon)`
  //color: var(--bs-primary);
  font-size: 56px !important;
`

const AddingBuildingSuccessfully = () => {
  const [addingBuildingProgress] = useRecoilState(addingBuildingProgressState)
  const { t } = useTranslation('buildingInput')
  return (
    <div>
      <div className='d-flex mt-5 mb-5'>

        {/*<Title>New Building</Title>*/}

        <BackNextGroupButton
          progressValue={addingBuildingProgress}
          isInDoneStep
        />

      </div>

      {/*<StepNav />*/}

      <div className='text-center mt-5 pt-5'>
        <Icon color="primary" />
        <Typography variant='h3' gutterBottom className='text-center' color="primary">
          {t('The building was successfully created')}!
        </Typography>
      </div>
    </div>
  )
}

export default AddingBuildingSuccessfully
