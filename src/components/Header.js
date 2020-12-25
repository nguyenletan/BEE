import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LogoHeader = styled.span`
  color: var(--white);
  background-color: var(--primary);
  width: 80px;
  display: inline-block;
  line-height: 80px;
  text-align: center;
  font-size: 26px;
`

const HeaderWrapper = styled.header`
  background-color: #fafafa;
  line-height: 80px;
  height: 80px;
  margin-bottom: 40px;
  @media (max-width: 620px) {
    height: auto;
  }
  a {
    color: var(--white);
    &:hover {
      text-decoration: none;
    }
  }
`

const Menu = styled.div`
  margin-left: 30px;
  @media (max-width: 620px) {
    margin-left: 10px;
  }
`

const MenuItem = styled.span`
  display: inline-block;
  margin-right: 30px;
  font-size: 1.1rem;
  @media (max-width: 768px) {
   margin-right: 10px;
  }
`

const ActiveMenuItem = styled.span`
  display: inline-block;
  margin-right: 30px;
  font-size: 1.1rem;
  border-bottom: 3px solid var(--primary);
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`

const NumberMessage = styled.span`
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
  background-color: var(--primary);
  color: var(--white);
  @media (max-width: 768px) {
    display: none;
  }
`

const Header = () => {
  return <HeaderWrapper className="row">
    <LogoHeader><Link to="/">BEE</Link></LogoHeader>
    <Menu>
      <ActiveMenuItem>Building</ActiveMenuItem>
      <MenuItem>Messages <NumberMessage>3</NumberMessage></MenuItem>
      <MenuItem>Setting</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  </HeaderWrapper>
}

export default Header;