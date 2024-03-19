import { useSetRecoilState } from 'recoil'
import { isDisplayPerformanceFilterState } from '../../../atoms'
import { useAuth } from '../../../AuthenticateProvider'
import { useEffect } from 'react'
import { trackingUser } from '../../../api/UserAPI'
import CurrentWeatherInformation from './components/CurrentWeatherInformation'
import styled from 'styled-components'
import Full15DayForecastWeather from './components/Full15DayForecastWeather'
import AvgWeatherInformation from './components/AvgWeatherInformation'
import AlertWeatherInformation from './components/AlertWeatherInformation'
import SolarInformation from './components/SolarInformation';

const Wrapper = styled.div`
  margin: 30px 15px 50px 15px;
`

const Weather = (props) => {
  const { lat, lon, buildingGeneralInfo } = props
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  setIsDisplayPerformanceFilter(false)

  console.log('location: ', lat, lon)
  console.log('buildingGeneralInfo: ', buildingGeneralInfo)

  const { user } = useAuth()

  useEffect(() => {
    async function tracking () {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Improve', idToken)
    }

    tracking()
  }, [user])
  return (
    <Wrapper>
      <SolarInformation lat={lat} lon={lon} buildingGeneralInfo={buildingGeneralInfo}/>
      <CurrentWeatherInformation lat={lat} lon={lon}/>
      <AlertWeatherInformation lat={lat} lon={lon}/>
      <Full15DayForecastWeather lat={lat} lon={lon}/>
      <AvgWeatherInformation lat={lat} lon={lon}/>
    </Wrapper>
  )
}

export default Weather
