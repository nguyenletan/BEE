import React from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../AuthenticateProvider';
import {
  SearchIcon,
  SearchInput,
  InputGroup,
  LogoHeader,
  HeaderWrapper,
  Menu,
  MenuItem,
  ActiveMenuItem,
  NumberMessage,
  UserNameAvatar,
  SearchMenu,
  SignOutButton,
} from './HeaderStyle';


const Header = () => {
  const {logout} = useAuth();

  return <HeaderWrapper className="row">
    <LogoHeader><Link to="/portfolio">BEE</Link></LogoHeader>
    <Menu className="flex-fill">
      <ActiveMenuItem>Building</ActiveMenuItem>
      <MenuItem>Messages <NumberMessage>3</NumberMessage></MenuItem>
      <MenuItem>Setting</MenuItem>
      <MenuItem><Link to="/">Logout</Link></MenuItem>
    </Menu>
    <SearchMenu>
      <InputGroup className="input-group">
        <SearchInput type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
        <SearchIcon className="input-group-text"><i className="bi bi-search"/></SearchIcon>
      </InputGroup>
    </SearchMenu>
    {/*<UserNameAvatar><UserName>JC</UserName></UserNameAvatar>*/}
    <UserNameAvatar><SignOutButton className="btn btn-primary btn-sm" onClick={logout}>Sign out</SignOutButton></UserNameAvatar>
  </HeaderWrapper>
}

export default Header