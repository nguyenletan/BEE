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

const Wrapper = styled.div`
  margin: 30px 15px 50px 15px;
`

const Weather = (props) => {
  const { lat, lon } = props
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState)
  setIsDisplayPerformanceFilter(false)

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
      <CurrentWeatherInformation lat={lat} lon={lon}/>
      <AlertWeatherInformation lat={lat} lon={lon}/>
      <Full15DayForecastWeather lat={lat} lon={lon}/>
      <AvgWeatherInformation lat={lat} lon={lon}/>
    </Wrapper>
  )
}

export default Weather