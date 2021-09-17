import axios from 'axios'

// const returnAxiosInstance = () => {
//   return Axios.create(initializers);
// }

export const createBuilding = async (data, idToken) => {
  let result
  await axios({
    method: 'post',
    url: process.env.REACT_APP_BACKEND_API + '/buildings/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    data: data,
    body: {},
  }).then((response) => {
    console.log(response)
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

export const updateBuilding = async (id, data, idToken) => {
  let result
  console.log(data)
  await axios({
    method: 'post',
    url: process.env.REACT_APP_BACKEND_API + '/buildings/edit/' + id,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    data: data,
    body: {},
  }).then((response) => {
    console.log(response)
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

export const getAllBuilding = async (idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + '/buildings/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    //data: data,
    body: {},
  }).then((response) => {
    console.log(response.data)
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

export const getBuildingById = async (id, startDay, endDay, idToken) => {
  let result
  await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API}/buildings/${id}/${startDay}/${endDay}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: {},
  }).then((response) => {
    result = response.data
  }).catch(error => {
    if (error.response) {
      // setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}

export const getBuildingByIdForEditing = async (id, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + '/buildings/edit/' + id,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: {},
  }).then((response) => {
    result = response.data
  }).catch(error => {
    if (error.response) {
      // setErrorMsg(error.response.data.message)
      result = error.response.data.message
    }
  })

  return result
}