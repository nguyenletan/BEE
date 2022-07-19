import axios from 'axios'

export const updateLightingSystemImprovement = async (data, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/lighting-system-improvement/update`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    data: data,
    body: {},
  }).then((response) => {
    //console.log('getLightingSystemByBuildingId: ', response.data)
    result = response.data
    //result = 'Retrieve successfully!'
    //return response.data
  }).catch(error => {
    if (error.response) {
      // setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}
