import React from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, SearchInput, InputGroup, LogoHeader, HeaderWrapper, Menu, MenuItem, ActiveMenuItem, NumberMessage, UserNameAvatar, UserName, SearchMenu} from './HeaderStyle'


const Header = () => {
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
        <SearchIcon className="input-group-text"><i className="bi bi-search"></i></SearchIcon>
      </InputGroup>
    </SearchMenu>
    <UserNameAvatar><UserName>JC</UserName></UserNameAvatar>
  </HeaderWrapper>
}

export default Header