import React from 'react'
import styled from 'styled-components'
//import {Dropdown, DropdownButton} from 'react-bootstrap';

const ButtonWrapper = styled.div`
  display: inline-flex;
  margin-right: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-right: 10px;
  }

  a {
    color: #212529;
    text-decoration: none;

    &.active {
      text-decoration: none;
      //border-bottom: 3px solid var(--bs-primary);
    }
  }
`

const ButtonText = styled.span`
  //display: block;
  //width: 100px;
  //white-space: break-spaces;
  font-size: 0.9rem;

`

const ButtonListItem = styled.ul`
  line-height: 2;

  &.show {
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate3d(0px, 40px, 0px);
  }
`

const ButtonItem = styled.li`
  //height: 20px;
`

const HeaderButton = ({ text, color, link }) => {
  console.log(color)
  const [show, setShow] = React.useState(false)

  const handleClick = () => {
    console.log('click')
    if (show) {
      setShow(false)

    } else {
      setShow(true)
    }
  }

  const buildingPerformanceSubItems = (text) => {
    switch (text) {
      case 'Building Performance':
        return <>
          <ButtonItem><a className="dropdown-item" href="#">Floor Level</a>
          </ButtonItem>
          <ButtonItem className="ps-3"><a className="dropdown-item" href="#">Floor
            Zone / Area</a></ButtonItem>
          <ButtonItem className="ps-3"><a className="dropdown-item" href="#">Department
            / Section</a></ButtonItem>
          <ButtonItem className="ps-3"><a className="dropdown-item" href="#">Equipment
            Level</a></ButtonItem>
        </>
      default:
        return <>TBD</>
    }
  }

  return (
    // <ButtonWrapper className="dropdown">
    //
    //   <Dropdown size="lg" >
    //     <Dropdown.Toggle variant={color} id="dropdown-basic">
    //       {text}
    //     </Dropdown.Toggle>
    //
    //     <Dropdown.Menu size="lg">
    //       <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //       <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //       <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //     </Dropdown.Menu>
    //   </Dropdown>
    // </ButtonWrapper>

    <ButtonWrapper className="dropdown">
      <button className={`btn btn-lg btn-${color} dropdown-toggle`}
              onClick={handleClick}
              type="button"
              id="dropdownMenuButton1" data-bs-toggle="dropdown"
              aria-expanded="false">
        <ButtonText>{text}</ButtonText>
      </button>
      <ButtonListItem className={`dropdown-menu ${show ? 'show' : ''}`}
                      aria-labelledby="dropdownMenuButton1" pla>
        {buildingPerformanceSubItems()}
      </ButtonListItem>
    </ButtonWrapper>
  )
}

export default HeaderButton
