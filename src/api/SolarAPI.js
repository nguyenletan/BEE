//process.env.REACT_APP_GOOGLE_API_KEY

import moment from 'moment/moment';
import axios from 'axios';

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
