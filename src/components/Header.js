import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../AuthenticateProvider'
import {
  SearchIcon,
  SearchInput,
  InputGroup,
  LogoHeader,
  HeaderWrapper,
  Menu,
  MenuItem,
  UserNameAvatar,
  SearchMenu,
  UserName
} from './HeaderStyle'

const Header = () => {
  const { logout } = useAuth()

  return (
    <HeaderWrapper className=''>
      <LogoHeader><Link to='/'>BEE</Link></LogoHeader>
      <Menu className='flex-fill'>
        <MenuItem><NavLink activeClassName='active' to={'/building'}>Building</NavLink></MenuItem>
        {/*<MenuItem>Messages <NumberMessage>3</NumberMessage></MenuItem>*/}
        <MenuItem>Message</MenuItem>
        <MenuItem>Setting</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      <SearchMenu>
        <InputGroup className='input-group'>
          <SearchInput type='text' className='form-control' aria-label='Amount (to the nearest dollar)' />
          <SearchIcon className='input-group-text'><i className='bi bi-search' /></SearchIcon>
        </InputGroup>
      </SearchMenu>
      {/* <UserNameAvatar><UserName>JC</UserName></UserNameAvatar> */}
      <UserNameAvatar><UserNameAvatar><UserName>JC</UserName></UserNameAvatar></UserNameAvatar>
    </HeaderWrapper>
  )
}

export default Header
