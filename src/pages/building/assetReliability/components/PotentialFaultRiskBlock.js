import React from 'react'
import styled from 'styled-components'

const Block = styled.div`
  width: 141px;
  height: 58px;
  color: ${props => props.textColor ? props.textColor : '#fff'};
  height: ${props => props.height ? props.height : '58px'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
  text-align: center;
  line-height: 58px;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 8px;
  margin-right: 3px;
  margin-bottom: 3px;
  transition: background-color 500ms ease-in-out;
  :hover {
    box-shadow: 1px 1px 10px 1px rgba(50, 80, 50, 0.5);
    transition: box-shadow 200ms ease-in-out
  }

`

const HeaderBlock = styled.div`
  width: 141px;
  color: #707070;
  height: 40px;
  background-color: transparent;
  text-align: center;
  line-height: 40px;
  font-size: 0.9rem;
  border-radius: 8px;
  margin-right: 3px;
  margin-bottom: 0;
`

const IndexBlock = styled.div`
  width: 51px;
  color: #707070;
  height: ${props => props.height ? props.height : '58px'};
  background-color: transparent;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    line-height: 0.9rem;
    vertical-align: middle;
    font-size: 0.9rem;
    text-align: left;
  }
`

const PotentialFaultRiskBlock = (props) => {
  const { color, value, isHeader, isIndexCol, height, onClick } = props

  return isIndexCol === true
    ? <IndexBlock onClick={onClick} height={height}><span>{value}</span></IndexBlock>
    : isHeader === true
      ? <HeaderBlock>{value}</HeaderBlock>
      : <Block onClick={onClick} backgroundColor={color}>{value === 0 ? '' : value}</Block>
}

export default PotentialFaultRiskBlock
