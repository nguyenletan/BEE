import styled from 'styled-components'

export const PortfolioWrapper = styled.div`

`

export const Description = styled.p`
  margin-bottom: 0;
  line-height: 30px;
`

export const BuildingBlocks = styled.ol`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start:0;
`

export const AddingIcon = styled.i`
  color: var(--primary);
  font-size: 26px;
  margin-left: 0.3rem;
  line-height: 30px;
`

export const AddBuildingText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`