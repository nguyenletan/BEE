import axios from 'axios'

export const getNewAnnualLightingSystemEnergyConsumption = async (buildingId, percentReplacement, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getNewAnnualLightingSystemEnergyConsumption/${buildingId}/${percentReplacement}`,
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

export const getAnnualEnergySavings = async (buildingId, oldPercentReplacement, percentReplacement, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getAnnualEnergySavings/${buildingId}/${oldPercentReplacement}/${percentReplacement}`,
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

export const getAnnualEnergyCostSavings = async (buildingId, oldPercentReplacement, percentReplacement, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getAnnualEnergyCostSavings/${buildingId}/${oldPercentReplacement}/${percentReplacement}`,
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

export const getAnnualCarbonEmissionsAvoided = async (buildingId, oldPercentReplacement, percentReplacement, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getAnnualCarbonEmissionsAvoided/${buildingId}/${oldPercentReplacement}/${percentReplacement}`,
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

export const getCostOfImprovement = async (buildingId, percentReplacement, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getCostOfImprovement/${buildingId}/${percentReplacement}`,
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

export const getPayback = async (buildingId, oldPercentReplacement, percentReplacement, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getPayback/${buildingId}/${oldPercentReplacement}/${percentReplacement}`,
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