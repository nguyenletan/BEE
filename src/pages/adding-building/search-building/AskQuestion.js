import React from 'react'

import styled from 'styled-components'

import SearchIcon from '../../../assets/images/search.svg'
import { Link } from 'react-router-dom'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  text-align: center;
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
            <label htmlFor="" className="font-bold">Search building online</label>
            <Link to={"/adding-building/search-building"}>
              <div className="input-group">

              <input type="text" className="form-control"/>
              <div className="input-group-append">
                <img className="input-group-text" src={SearchIcon} alt="Search"/>
              </div>
            </div></Link>
          </div>
        </div>
        <div className="col-11 col-md-1 text-center m-auto font-bold">OR</div>
        <div className="col-12 col-md-5  m-auto">
          <div className="w-50 m-auto text-center">
            <p>Enter Information Manually</p>
            <Link to={"/adding-building/general-information"}>
              <button type="button" className="btn btn-primary">Enter Manually</button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default AskQuestion