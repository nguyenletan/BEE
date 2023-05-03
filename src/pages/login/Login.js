import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorMsg, LoginButton, LoginForm, LoginInput, LoginPage, LoginText, SubTitle, Title } from './LoginStyle'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoginSuccessfully, setIsLoginSuccessfully] = useState(false)
  const navigate = useNavigate()

  const onSubmit = data => {

    axios({
      method: 'post',
      url: '/users/login',
      data: {
        email: data.email,
        password: data.password
      }
    }).then((response) => {
      // console.log(response);
      setErrorMsg(null)
      setIsLoginSuccessfully(true)
    }).catch(error => {
      // console.log(error)
      if (error.response) {
        setErrorMsg(error.response.data.message)
      }
    })
  }

  if (isLoginSuccessfully) {
    navigate('/portfolio')
  } else {
    return (
      <LoginPage
        className='login-page d-flex justify-content-center justify-content-sm-around align-items-center align-content-center flex-wrap'
      >
        <div>
          <Title>BEE</Title>
          <SubTitle>Building Energy Estimator</SubTitle>
        </div>

        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <div className='alert alert-danger' role='alert'>
            {errorMsg}
          </div>}
          <div className='form-group'>
            <LoginInput
              type='email'
              className='form-control'
              id='email'
              aria-describedby='email'
              placeholder='Email'
              autocomplete='off'
              {...register('email', {
                required: true,
                maxLength: 100
              })}
            />
            {errors?.email?.type === 'required' && <ErrorMsg>Email is required</ErrorMsg>}
            {errors?.email?.type === 'maxLength' && <ErrorMsg>Max length is 100</ErrorMsg>}
          </div>

          <div className='form-group'>
            <LoginInput
              type='password' className='form-control' id='password' placeholder='Password'
              aria-describedby='password' {...register('password', { maxLength: 100 })}
            />
            {errors?.email?.type === 'maxLength' && <ErrorMsg>Max length is 100</ErrorMsg>}
          </div>
          <div className='form-group d-flex justify-content-between'>
            <LoginButton type='submit' className='btn btn-primary'><LoginText>Login</LoginText></LoginButton>
            <Link to='/register'><LoginButton
              type='submit'
              className='btn btn-outline-primary text-right'
                                 >SignUp
                                 </LoginButton>
            </Link>
          </div>
        </LoginForm>

      </LoginPage>
    )
  }
}

export default Login
