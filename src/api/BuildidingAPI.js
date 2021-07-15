import axios from 'axios'

// const returnAxiosInstance = () => {
//   return Axios.create(initializers);
// }

export const createBuilding = async (data, idToken) => {
  let result;
  await axios({
    method: 'post',
    url: process.env.REACT_APP_BACKEND_API + '/buildings/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
    data: data,
    body: {},
  }).then((response) => {
    console.log(response)
    //result = response
    result = 'Saving successfully!'
  }).catch(error => {
    if (error.response) {
      //setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}