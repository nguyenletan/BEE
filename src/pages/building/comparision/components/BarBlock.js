import React from 'react'
import styled from 'styled-components'

const Block = styled.div`
  height: 36px;
  width: ${props => props.width ? props.width : '50px'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#87972f'};
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '10px'};
  margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
  text-align: ${props => props.textAlign ? props.textAlign : 'right'};
  padding-right: ${props => props.paddingRight ? props.paddingRight : '0.35em'};
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: var(--white);
`

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-right: 18px solid ${props => props.backgroundColor ? props.backgroundColor : '#87972f'};
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '10px'};
`

const BlockWrapper = styled.div`
  margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
`

const BarBlock = (props) => {
  const { text, backgroundColor, marginLeft, width, isArrow, textAlign, marginBottom, paddingRight } = props

  return isArrow
    ? (
      <BlockWrapper className="d-flex" marginLeft={marginLeft}>
        <ArrowLeft backgroundColor={backgroundColor} marginBottom={marginBottom}/>
        <Block
          paddingRight={paddingRight}
          width={width}
          backgroundColor={backgroundColor}
          textAlign={textAlign}
          marginBottom={marginBottom}>{text}</Block>
      </BlockWrapper>)
    : <Block
        paddingRight={paddingRight}
        textAlign={textAlign}
        marginLeft={marginLeft}
        width={width}
        backgroundColor={backgroundColor}
        marginBottom={marginBottom}>{text}</Block>

}

export default BarBlock