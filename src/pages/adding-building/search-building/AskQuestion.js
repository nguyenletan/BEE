import React from 'react'

import styled from 'styled-components'

import SearchIcon from '../../../assets/images/search.svg'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  text-align: center;
`
const ORLabel = styled.div`
  font-size: 24px;
`

const Wrapper = styled.div`
  height: 60vh;
`

const AskQuestion = () => {

  const { t } = useTranslation('buildingInput')
  return (
    <>
      <Title>{t('You are adding building into your portfolio. Would you like to do this?')}</Title>
      <Wrapper className='row mt-6'>
        <div className='col-12 col-md-5 m-auto'>
          <div className='w-50 m-auto text-center'>
            <label htmlFor='' className='font-bold mb-3'>{t('Search building online')}</label>
            <Link to='/adding-building/search-building'>
              <div className='input-group'>
                <input type='text' className='form-control' />
                <div className='input-group-append'>
                  <img className='input-group-text' src={SearchIcon} alt='Search' />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <ORLabel className='col-11 col-md-1 text-center m-auto font-bold'>{t('OR')}</ORLabel>
        <div className='col-12 col-md-5  m-auto'>
          <div className='w-50 m-auto text-center'>
            <p>{t('Enter Information Manually')}</p>
            <Link to='/adding-building/general-information'>
              <Button variant='contained' color='primary'>{t('Enter Manually')}</Button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default AskQuestion
