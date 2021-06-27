import React from 'react'

import styled from 'styled-components'

import SearchIcon from '../../../assets/images/search.svg'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  text-align: center;
`
const ORLabel= styled.div`
  font-size: 24px;
`

const Wrapper = styled.div`
  height: 60vh;
`

const AskQuestion = () => {
  return (
    <>
      <Title>Your are adding a building into your portfolio. Do you want</Title>
      <Wrapper className="row mt-6">
        <div className="col-12 col-md-5 m-auto">
          <div className="w-50 m-auto text-center">
            <label htmlFor="" className="font-bold mb-3">Search building online</label>
            <Link to={"/adding-building/search-building"}>
              <div className="input-group">

              <input type="text" className="form-control"/>
              <div className="input-group-append">
                <img className="input-group-text" src={SearchIcon} alt="Search"/>
              </div>
            </div></Link>
          </div>
        </div>
        <ORLabel className="col-11 col-md-1 text-center m-auto font-bold">OR</ORLabel>
        <div className="col-12 col-md-5  m-auto">
          <div className="w-50 m-auto text-center">
            <p>Enter Information Manually</p>
            <Link to={"/adding-building/general-information"}>
              <Button variant="contained" color="primary">Enter Manually</Button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default AskQuestion