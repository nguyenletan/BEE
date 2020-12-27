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
  display: flex;
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
  padding: 1px 5px;
  font-size: 0.7rem;
  background-color: var(--primary);
  color: var(--white);
  @media (max-width: 768px) {
    display: none;
  }
`

const UserNameAvatar = styled.div`
  margin-right: 30px;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`

const UserName = styled.span`
  background-color: #ecedef;
  line-height: 1.05rem;
  font-size: 1.05rem;
  text-align: center;
  font-weight: 700;
  padding: 10px 15px;
  border-radius: 50%;
  vertical-align: middle;
`

const SearchMenu = styled.div`
  margin: auto 30px auto auto;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`

const InputGroup = styled.div`
  @media (max-width: 768px) {
    width: 180px !important;
  }
`

const SearchInput = styled.input`
  border-radius: 15px 0px 0px 15px;
  border-right: none;

`

const SearchIcon = styled.span`
  border-radius: 0 15px 15px 0px;
  background-color: var(--white);
  border-left: none;

`

const Header = () => {
  return <HeaderWrapper className="row">
    <LogoHeader><Link to="/">BEE</Link></LogoHeader>
    <Menu className="flex-fill">
      <ActiveMenuItem>Building</ActiveMenuItem>
      <MenuItem>Messages <NumberMessage>3</NumberMessage></MenuItem>
      <MenuItem>Setting</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
    <SearchMenu>
      <InputGroup className="input-group">
        <SearchInput type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
        <SearchIcon className="input-group-text"><i className="bi bi-search"></i></SearchIcon>
      </InputGroup>
    </SearchMenu>
    <UserNameAvatar><UserName>JC</UserName></UserNameAvatar>
  </HeaderWrapper>
}

export default Header