import axios from 'axios'

export const getTodayWeather = async (lat, lon) => {
  let result
  await axios({
    method: 'get',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/2022-09-03/2022-09-03?unitGroup=metric&include=days&key=PSGYJHWC7GTZPJY967FVQK9XR&contentType=json`,
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
