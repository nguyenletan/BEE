import styled from 'styled-components'

export const LoginPage = styled.div`
  height: 100vh;

`

export const Title = styled.h1`
  color: var(--primary);
  font-weight: 700;
  font-size: 88px;
  margin: 0;
  line-height: 1;
  text-align: left;
  padding: 0;
  letter-spacing: 0.25em;
`

export const SubTitle = styled.p`
  line-height: 1;
  text-align: left;
  padding-left: 6px;
  margin: 0 0 2rem;
  color: var(--dark);
`

export const LoginForm = styled.form`
  width: 400px;
`

export const LoginText = styled.span`
  color: var(--white);
`


export const LoginInput = styled.input`
  border-radius: 0.65rem;
  border-color: #7b7b7b;
`
export const LoginButton = styled.button`
  border-radius: 0.65rem;
`

export const ErrorMsg = styled.span`
  color: var(--danger);
`