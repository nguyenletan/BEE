import React from 'react'
import styled from 'styled-components'

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
`

const Menu = styled.div`
  margin-left: 30px;
`

const MenuItem = styled.span`
  display: inline-block;
  margin-right: 30px;
  font-size: 1.1rem;
`

const ActiveMenuItem = styled.span`
  display: inline-block;
  margin-right: 30px;
  font-size: 1.1rem;
  border-bottom: 3px solid var(--primary);
`

const Header = () => {
  return <HeaderWrapper className="row">
    <LogoHeader>BEE</LogoHeader>
    <Menu>
      <ActiveMenuItem>Building</ActiveMenuItem>
      <MenuItem>Message</MenuItem>
      <MenuItem>Message</MenuItem>
      <MenuItem>Setting</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  </HeaderWrapper>
}

export default Header;