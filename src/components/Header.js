import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from 'AuthenticateProvider'
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
  UserName, LangWrapper,
} from './HeaderStyle'
import { useTranslation } from 'react-i18next'
import HeaderButton from './HeaderButton';

const Header = () => {
  const { logout } = useAuth()

  const { t, i18n } = useTranslation('common')

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(i18n.resolvedLanguage)
    })
  };

  return (
    <HeaderWrapper className=''>
      <LogoHeader><Link to='/' className="text-bold">Contasa</Link></LogoHeader>
      <Menu className='flex-fill'>
        {/*<MenuItem><NavLink activeClassName='active' to={'/building'}>{t('Building')}</NavLink></MenuItem>*/}
        {/*/!*<MenuItem>Messages <NumberMessage>3</NumberMessage></MenuItem>*!/*/}
        {/*<MenuItem>{t('Message')}</MenuItem>*/}
        {/*<MenuItem>{t('Setting')}</MenuItem>*/}
        {/*<MenuItem onClick={logout}>{t('Logout')}</MenuItem>*/}
        <HeaderButton text="Dashboard & Report" color="primary">Dashboard & Report</HeaderButton>
        <HeaderButton text="Building Performance" color="info"></HeaderButton>
        <HeaderButton text="Performance Comparison" color="danger"></HeaderButton>
        <HeaderButton text="Performance Improvement" color="warning"></HeaderButton>
        <HeaderButton text="Asset Reliability" color="success"></HeaderButton>
        <HeaderButton text="Building Input" color="secondary"></HeaderButton>
      </Menu>

      <LangWrapper className="d-flex justify-content-between">
        <span onClick={() => changeLanguage('en')} style={{fontWeight: i18n.language === 'en' ? 'bold' : '' }}>
          EN
        </span> /
        <span onClick={() => changeLanguage('de')} style={{fontWeight: i18n.language === 'de' ? 'bold' : '' }}>
          DE
        </span>
      </LangWrapper>
      {/*<SearchMenu>*/}
      {/*  <InputGroup className='input-group'>*/}
      {/*    <SearchInput type='text' className='form-control' aria-label='Amount (to the nearest dollar)' />*/}
      {/*    <SearchIcon className='input-group-text'><i className='bi bi-search' /></SearchIcon>*/}
      {/*  </InputGroup>*/}
      {/*</SearchMenu>*/}
      {/* <UserNameAvatar><UserName>JC</UserName></UserNameAvatar> */}
      {/*<UserNameAvatar><UserNameAvatar><UserName>JC</UserName></UserNameAvatar></UserNameAvatar>*/}
    </HeaderWrapper>
  )
}

export default Header
