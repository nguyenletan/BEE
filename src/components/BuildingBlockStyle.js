import styled from 'styled-components'

export const BuildingImage = styled.img`
  width: 270px;
  height: 150px;
  margin-right: 0;
  @media (min-width: 768px) {
    margin-right: 50px;
  }
  object-fit: cover;
  border-radius: 12px;
  margin-top: 25px;
`

export const Title = styled.h3`
  line-height: 1.5;
  margin-top: .5rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--bs-primary)
`

export const Address = styled.p`
  width: 280px;
  color: var(--bs-primary);
  line-height: 1.5;
`
