import React from 'react'
import { Link } from 'react-router-dom'
import { LoginButton, LoginForm, LoginInput, LoginPage, LoginText, SubTitle, Title } from './LoginStyle'

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
        <Link to="/portfolio"><LoginButton type="submit"
                                           className="btn btn-primary"><LoginText>Login</LoginText></LoginButton></Link>
        <Link to="/register"><LoginButton type="submit"
                                          className="btn btn-outline-primary text-right">SignUp</LoginButton></Link>
      </div>
    </LoginForm>

  </LoginPage>
}

export default Login