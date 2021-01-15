import React from 'react'
import Styled from 'styled-components'

const Square = Styled.div`
  text-align: center;
  font-size: 22px;
  line-height: 38px;
  vertical-align: middle;
  margin: auto;
  color: var(--white);
  width: 56px;
  height: 38px;
  border-radius: 8px;
  background-color: ${props => props.color ? props.color : 'green'};
`, EnergySquare = (props) => {
  const { text, color } = props

  return (<Square color={color}>{text}</Square>)
}

export default EnergySquare