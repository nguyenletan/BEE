import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: var(--primary);
  font-weight: 600;
  font-size: 42px;
  margin-bottom: .7em;
`

const TermOfService = () => (
  <Wrapper>
    <Title>Term Of Service</Title>
  </Wrapper>
)

export default TermOfService