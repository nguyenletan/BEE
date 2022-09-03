import styled from 'styled-components'
import { EuiAccordion, EuiPanel } from '@elastic/eui'
import React, { useEffect } from 'react'
import { getTodayWeather } from 'api/WeatherAPI'
import { getWeatherIcon } from 'WeatherIcons'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const H5 = styled.h5`
  font-weight: 700;
`

const H4 = styled.h4`
  font-weight: 700;
  font-size: 1.1em;
`

const Information = styled.p`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
  padding-left: 20px;
  font-size: 0.9em;

  span {
    font-weight: 500;
  }

  label {
    color: var(--darkgray);
    text-transform: capitalize;
    padding-right: .5em;
  }
`

const BuildingWeatherInformation = (props) => {
  const { lat, lon } = props

  const [weatherInfo, setWeatherInfo] = React.useState({})

  useEffect(() => {
    console.log(lat)

    if (lat && lon) {
      getTodayWeather(lat, lon).then((res) => {
        setWeatherInfo(res)
        console.log(res)
      })
    }
  }, [lat, lon])

  const buttonContent = (
    <div className="d-flex align-items-center">
      {weatherInfo && weatherInfo?.days && weatherInfo?.days.length > 0 && (
        <img className="me-3" src={getWeatherIcon(weatherInfo?.days[0].icon)} alt={weatherInfo?.days[0].icon} width="32px"/>)}
      <H4 className="font-bold">Weather Information</H4>

    </div>
  )

  return (

    <EuiAccordion className="mb-5" buttonContent={buttonContent}>
      <EuiPanel color="subdued">
        {weatherInfo && weatherInfo?.days && (
          <Wrapper>
            <div className="pb-3">
              <H5 className="pb-2 font-weight-bold">Temperature</H5>
              <Information>
                <span><label>Average:</label> {weatherInfo?.days[0].temp} ℃</span>
                <span><label>Min:</label> {weatherInfo?.days[0].tempmin} ℃</span>
                <span><label>Max:</label> {weatherInfo?.days[0].tempmax} ℃</span>
                <span><label>Dew Point:</label> {weatherInfo?.days[0].dew} ℃</span>
              </Information>
            </div>
            <div>
              <H5 className="pb-2 bold">Weather: <strong className="text-primary">{weatherInfo?.days[0].description}</strong>
              </H5>
              <Information>
                <span><label>{weatherInfo?.days[0].preciptype ?? "Rain"}:</label> {weatherInfo?.days[0].precipprob} %</span>
                <span><label>Humidity:</label> {weatherInfo?.days[0].humidity} %</span>
                <span><label>Precipitation:</label> {weatherInfo?.days[0].precipprob} %</span>
                <span><label>Cloud Cover:</label> {weatherInfo?.days[0].cloudcover} %</span>
                <span><label>Snow:</label> {weatherInfo?.days[0].snow} %</span>
                <span><label>Snow Depth:</label> {weatherInfo?.days[0].snowdepth} mm</span>
                <span><label>Solar radiation:</label> {weatherInfo?.days[0].solarradiation}</span>
                <span><label>Solar Energy:</label> {weatherInfo?.days[0].solarenergy}</span>
                <span><label>UV:</label> {weatherInfo?.days[0].uvindex}</span>
                <span><label>Pressure:</label> {weatherInfo?.days[0].pressure} Pa</span>
                <span><label>Wind Speed:</label> {weatherInfo?.days[0].windspeed} ℃</span>
                <span><label>Wind Degree:</label> {weatherInfo?.days[0].winddir}</span>
              </Information>
            </div>
          </Wrapper>)}
      </EuiPanel>
    </EuiAccordion>
  )
}

export default BuildingWeatherInformation