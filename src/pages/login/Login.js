import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  input {
    border-radius: 0.5rem;
  }
`

const LoginPage = styled.div`
  height: 100vh;

`

const Title = styled.h1`
  color: var(--primary);
  font-weight: 700;
  font-size: 88px;
  margin: 0;
  line-height: 1;
  text-align: left;
  padding: 0;
  letter-spacing: 0.25em;
`

const SubTitle = styled.p`
  line-height: 1;
  text-align: left;
  padding-left: 6px;
  margin: 0 0 2rem;

`

const LoginForm = styled.form`
  width: 400px;

`

const LoginInput = styled.input`
  border-radius: 0.5rem;
  border-color: #7b7b7b;
`
const LoginButton = styled.button`
  border-radius: 0.5rem;
`

const Login = () => {
  return <LoginPage
    className="login-page d-flex justify-content-center justify-content-sm-around align-items-center align-content-center flex-wrap">
    <div>
      <Title>BEE</Title>
      <SubTitle>Building Energy Estimator</SubTitle>
    </div>

    <LoginForm>
      <div className="form-group">
        <LoginInput type="email" className="form-control" id="email" aria-describedby="email" placeholder="Email"
                    autocomplete="off"/>
      </div>

      <div className="form-group">
        <LoginInput type="password" className="form-control" id="password" placeholder="Password"
                    aria-describedby="password"/>
      </div>
      <div className="form-group d-flex justify-content-between">
        <LoginButton type="submit" className="btn btn-primary">Login</LoginButton>
        <LoginButton type="submit" className="btn btn-outline-primary text-right">SignUp</LoginButton>
      </div>
    </LoginForm>

  </LoginPage>
}

export default Login