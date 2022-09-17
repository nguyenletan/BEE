import axios from 'axios'
import moment from 'moment'

export const getTodayWeather = async (lat, lon) => {
  let result
  var today = moment().format('YYYY-MM-DD')
  await axios({
    method: 'get',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${today}/${today}?unitGroup=metric&include=days&key=PSGYJHWC7GTZPJY967FVQK9XR&contentType=json`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
    body: {},
  }).then((response) => {
    result = response.data
    console.log(response.data)
  }).catch(error => {
    if (error.response) {
      // setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}

export const get15DayForecastWeather = async (lat, lon) => {
  let result
  let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
  let toDate = moment().add(8, 'days').format('YYYY-MM-DD')

  await axios({
    method: 'get',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${tomorrow}/${toDate}?unitGroup=metric&include=days&key=PSGYJHWC7GTZPJY967FVQK9XR&contentType=json`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
    body: {},
  }).then((response) => {
    result = response.data
    console.log(response.data)
  }).catch(error => {
    if (error.response) {
      // setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}

