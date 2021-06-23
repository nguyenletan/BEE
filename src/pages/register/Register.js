import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = styled.div`
  height: 100vh;
`

const Header = styled.h1`
  color: var(--bs-primary);
  font-weight: 700;
  font-size: 88px;
  margin: 0;
  line-height: 1;
  text-align: left;
  padding: 0;
  letter-spacing: 0.25em;

  a {
    &:hover {
      text-decoration: none;
    }
  }
`

const SubTitle = styled.p`
  line-height: 1;
  text-align: left;
  padding-left: 6px;
  margin: 0 0 2rem;
  color: var(--dark);
`

const RegisterForm = styled.form`
  width: 400px;
`

const Successful = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    font-size: 18px;
  }
`

const SuccessfulTitle = styled.h1`
  color: var(--bs-primary);
  font-weight: 600;
  font-size: 42px;
  margin-bottom: .7em;
`

const RegisterInput = styled.input`
  border-radius: 0.65rem;
  border-color: #7b7b7b;
`
const RegisterButton = styled.button`
  border-radius: 0.65rem;
  color: var(--white);

  &:disabled {
    background-color: var(--gray-dark);
  }
`

const FormTitle = styled.h2`
  color: var(--inkydark);
  font-weight: 600;
`

const AgreementCheckbox = styled.input`
  margin-right: .3em;
`

const ErrorMsg = styled.span`
  color: var(--bs-danger);
`

const Register = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()
  const [isAgree, setIsAgree] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)

  //password: 2@00L2l2
  if (!isRegistered) {
    const onSubmit = data => {
      console.log(data)

      axios({
        method: 'post',
        url: '/users/signup',
        data: {
          email: data.email,
          password: data.password
        }
      }).then((response) => {
        //console.log(response);
        setErrorMsg(null)
        setIsRegistered(true)
      }).catch(error => {
        //console.log(error)
        if (error.response) {
          //   // client received an error response (5xx, 4xx)
          setErrorMsg(error.response.data.message)
        }

        //else if (error.request) {
        //   // client never received a response, or request never left
        //
        //   console.log(error.request)
        // } else {
        //   // anything else
        //
        // }
      })

    }

    const comparePassword = () => getValues('password') === getValues('confirmPassword') ? true : 'The passwords you entered do not match.'

    return (
      <RegisterPage
        className="d-flex justify-content-center justify-content-sm-around align-items-center align-content-center flex-wrap">
        <div>
          <Header><Link to="/">BEE</Link></Header>
          <SubTitle>Building Energy Estimator</SubTitle>
        </div>

        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>}
          <FormTitle className="mb-5">Create Your Account</FormTitle>
          <div className="form-group">
            <RegisterInput type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="email"
                           placeholder="Email"
                           autocomplete="off"
                           {...register('email', {
                             required: true,
                             maxLength: 100,
                             pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                           })}/>
            {errors?.email?.type === 'required' && <ErrorMsg>Email is required</ErrorMsg>}
            {errors?.email?.type === 'pattern' && <ErrorMsg>Invalid email address</ErrorMsg>}
            {errors?.email?.type === 'maxLength' && <ErrorMsg>Max length is 100</ErrorMsg>}
          </div>

          <div className="form-group">
            <RegisterInput type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           aria-describedby="password"
                           {...register('password', {
                             required: true,
                             maxLength: 100,
                             pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
                           })}/>
            {errors.password?.type === 'required' && <ErrorMsg>Password is required</ErrorMsg>}
            {errors.password?.type === 'pattern' &&
            <ErrorMsg>Minimum of 8 characters must contain at least 1 lowercase alphabetical character, at least 1
              uppercase, at least 1 numeric character, at least one special character such as !@#$%^&*</ErrorMsg>}
            {errors.password?.type === 'maxLength' && <ErrorMsg>Max length is 100</ErrorMsg>}
          </div>
          <div className="form-group">
            <RegisterInput type="password"
                           className="form-control"
                           id="confirm-password"
                           placeholder="Confirm Password"
                           aria-describedby="password"
                           ref="password"
                           {...register('confirmPassword', {
                             validate: comparePassword
                           })}/>
            {errors.confirmPassword?.type === 'validate' &&
            <ErrorMsg>The passwords you entered do not match.</ErrorMsg>}
          </div>
          <div className="form-group">
            <AgreementCheckbox onChange={() => { setIsAgree(!isAgree)}}
                               id="agreement"
                               type="checkbox"/>
            <label htmlFor="agreement">You Agree To Our <Link to="/terms-of-service" title="Terms Of Service">Terms Of
              Service.</Link>
            </label>
          </div>
          <div className="form-group d-flex justify-content-between">
            <RegisterButton type="submit" className="btn btn-primary" disabled={isAgree ? null : 'disabled'}>Complete
              Registration</RegisterButton>
          </div>
        </RegisterForm>

      </RegisterPage>
    )
  } else {
    return (<Successful>
      <SuccessfulTitle>Register successfully!</SuccessfulTitle>
      <Link to={'/'}>Go to login page</Link>
    </Successful>)
  }
}

export default Register