import redUpImage from '../../../assets/images/red_up.jpg'
import greenDownImage from '../../../assets/images/green_down.jpg'
import { formatNumber } from '../../../Utilities'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  margin-top: 30px;
  padding: 30px;
  @media (min-width: 1440px) {
    width: 80%;
    margin: 50px auto 0;
  }
  @media (min-width: 1920px) {
    width: 70%;
  }

  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    margin: auto 0;
  }
`

const UpAndDownImg = styled.img`

  width: 60px;
  height: 60px;
`

const UpAndDownImgTitle = styled.h5`

  font-size: 0.8rem;
  margin-bottom: 2px;
`

const UpAndDownImgValue = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
`

const HistoricalComparisonInnerWrapper = styled.div`
  width: 108px;
  @media (min-width: 768px) {
    width: auto;
  }
`

const HistoricalComparison = ({
  groupBy,
  the1stHistoricalComparison,
  the2ndHistoricalComparison,
  the3rdHistoricalComparison,
}) => {

  let the1stText = 'Same Month<br/>Last Year'
  let the2ndText = 'Last Month'
  let the3rdText = 'Previous 12 Month Period '

  switch (groupBy) {
    case 'year':
      the1stText = 'Previous Year'
      the2ndText = 'Average of previous 2 Years'
      the3rdText = 'Average of previous 3 Years'
      break
    case 'quarter':
      the1stText = 'Quarter Last Year'
      the2ndText = 'Previous Quarter'
      the3rdText = 'Previous 4 Quarter Period '
      break
    case 'day':
      the1stText = 'Day Last Week'
      the2ndText = 'Previous Day'
      the3rdText = 'Day in Last 4 Weeks '
      break
    case 'month':
    default:
      break
  }

  return (
    <Wrapper className="d-flex justify-content-around row">
      <h4 className="col col-12 col-md-3 mb-4 mb-lg-0 text-center">Historical<br/>Comparison</h4>
      <div
        className="col col-12 col-md-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start flex-wrap"
      >
        <UpAndDownImg src={the1stHistoricalComparison >= 0 ? redUpImage : greenDownImage}/>
        <HistoricalComparisonInnerWrapper className="ms-2 d-flex flex-column justify-content-end mt-1 mt-lg-0">
          <UpAndDownImgTitle dangerouslySetInnerHTML={{ __html: the1stText }}/>
          <UpAndDownImgValue>{formatNumber(the1stHistoricalComparison, 2)} MWh</UpAndDownImgValue>
        </HistoricalComparisonInnerWrapper>
      </div>
      <div
        className="col col-12 col-md-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start flex-wrap"
      >
        <UpAndDownImg src={the2ndHistoricalComparison >= 0 ? redUpImage : greenDownImage}/>
        <HistoricalComparisonInnerWrapper className="ms-2 d-flex flex-column justify-content-end mt-1 mt-lg-0">
          <UpAndDownImgTitle>{the2ndText}</UpAndDownImgTitle>
          <UpAndDownImgValue>{formatNumber(the2ndHistoricalComparison, 2)} MWh</UpAndDownImgValue>
        </HistoricalComparisonInnerWrapper>
      </div>
      <div
        className="col col-12 col-md-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start flex-wrap"
      >
        <UpAndDownImg src={the3rdHistoricalComparison >= 0 ? redUpImage : greenDownImage}/>
        <HistoricalComparisonInnerWrapper className="ms-2 d-flex flex-column justify-content-end mt-1 mt-lg-0">
          <UpAndDownImgTitle>{the3rdText}</UpAndDownImgTitle>
          <UpAndDownImgValue>{formatNumber(the3rdHistoricalComparison, 2)} MWh</UpAndDownImgValue>
        </HistoricalComparisonInnerWrapper>
      </div>
    </Wrapper>

  )
}
export default HistoricalComparison