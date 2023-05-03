import axios from 'axios'

export const trackingUser = async(externalUID, pageName, idToken) => {
  let result
  await axios({
    method: 'post',
    url: process.env.REACT_APP_BACKEND_API + '/users/tracking/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    data: {
      externalUID: externalUID,
      pageName: pageName
    },
    body: {},
  }).then((response) => {
    //console.log(response)
    // result = response
    result = 'Saving successfully!'
  }).catch(error => {
    if (error.response) {
      // setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}