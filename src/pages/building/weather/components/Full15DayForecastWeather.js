import React, { useEffect } from 'react'
import { get15DayForecastWeather } from '../../../../api/WeatherAPI'
import { getWeatherIcon } from '../../../../WeatherIcons'
import { EuiAccordion, EuiPanel } from '@elastic/eui'
import styled from 'styled-components'
import moment from 'moment'

const Wrapper = styled.section`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const H5 = styled.h5`
  font-weight: 700;
`

const H4 = styled.h4`
  font-weight: 700;
  font-size: 1.1em;
`

const Information = styled.div`
  display: flex;
  width: 300px;
  gap: 10px;
  padding: 10px;
  justify-content: space-between;
  align-items: flex-start;
`

const Description = styled.p`
  font-size: 0.9em;
`

const Full15DayForecastWeather = (props) => {
  const { lat, lon } = props

  const [weatherInfo, setWeatherInfo] = React.useState({})

  useEffect(() => {
    console.log(lat)

    if (lat && lon) {
      get15DayForecastWeather(lat, lon).then((res) => {
        setWeatherInfo(res)
        console.log(res)
      })
    }
  }, [lat, lon])

  const buttonContent = (
    <div className="d-flex align-items-center">
      {weatherInfo && weatherInfo?.days && weatherInfo?.days.length > 0 && (
        <img className="me-3" src={getWeatherIcon(weatherInfo?.days[1].icon)} alt={weatherInfo?.days[1].icon}
             width="32px"/>)}
      <H4 className="font-bold">7-days forecast</H4>

    </div>
  )

  return (

    <EuiAccordion className="mb-5" buttonContent={buttonContent}>
      <EuiPanel color="subdued">
        {weatherInfo && weatherInfo?.days && (
          <Wrapper>
             {
               weatherInfo?.days.map((day, index) => (
                 <Information key={index}>
                   <img src={getWeatherIcon(day.icon)} alt={day.icon} width="81px"/>
                   <p>
                     <H5>{moment(day.datetime).format('DD MMM YY')}</H5>
                     <span>{day.tempmin}℃ - {day.tempmax}℃</span>
                     <Description>{day.description}</Description>
                   </p>
                 </Information>
               ))}
          </Wrapper>)}
      </EuiPanel>
    </EuiAccordion>
  )
}
export default Full15DayForecastWeather