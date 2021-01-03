import  styled from 'styled-components'

export const LogoHeader = styled.span`
  color: var(--white);
  background-color: var(--primary);
  width: 80px;
  display: inline-block;
  line-height: 80px;
  text-align: center;
  font-size: 26px;
`

export const HeaderWrapper = styled.header`
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

export const Menu = styled.div`
  margin-left: 30px;
  @media (max-width: 620px) {
    margin-left: 10px;
  }
`

export const MenuItem = styled.span`
  display: inline-block;
  margin-right: 30px;
  font-size: 1.1rem;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  a {
    color: #212529;
  }
`

export const ActiveMenuItem = styled.span`
  display: inline-block;
  margin-right: 30px;
  font-size: 1.1rem;
  border-bottom: 3px solid var(--primary);
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`

export const NumberMessage = styled.span`
  border-radius: 50%;
  padding: 1px 5px;
  font-size: 0.7rem;
  background-color: var(--primary);
  color: var(--white);
  @media (max-width: 768px) {
    display: none;
  }
`

export const UserNameAvatar = styled.div`
  margin-right: 30px;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`

export const UserName = styled.span`
  background-color: #ecedef;
  line-height: 1.05rem;
  font-size: 1.05rem;
  text-align: center;
  font-weight: 700;
  padding: 10px 15px;
  border-radius: 50%;
  vertical-align: middle;
`

export const SearchMenu = styled.div`
  margin: auto 30px auto auto;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`

export const InputGroup = styled.div`
  @media (max-width: 768px) {
    width: 180px !important;
  }
`

export const SearchInput = styled.input`
  border-radius: 18px 0px 0px 18px;
  border-right: none;

`

export const SearchIcon = styled.span`
  border-radius: 0 18px 18px 0px;
  background-color: var(--white);
  border-left: none;

`