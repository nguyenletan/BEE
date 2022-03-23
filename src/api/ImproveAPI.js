import axios from 'axios'

export const getNewAnnualLightingSystemEnergyConsumption = async (buildingId, percentReplacement, period, startDate, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getNewAnnualLightingSystemEnergyConsumption/${buildingId}/${percentReplacement}/${period}/${startDate}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    //data: data,
    body: {},
  }).then((response) => {
    console.log('getNewAnnualLightingSystemEnergyConsumption:' + response.data)
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

export const getAnnualEnergySavings = async (buildingId, percentReplacement, period, startDate, lightingSystem, idToken) => {
  let result
  await axios({
    method: 'post',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getAnnualEnergySavings`,
    data: {
      buildingId: buildingId,
      percentReplacement: percentReplacement,
      period: period,
      startDate: startDate,
      lightingSystem: lightingSystem
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    //data: data,
    body: {},
  }).then((response) => {
    console.log('getAnnualEnergySavings:' + response.data)
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

export const getAnnualEnergyCostSavings = async (buildingId, percentReplacement, period, startDate, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getAnnualEnergyCostSavings/${buildingId}/${percentReplacement}/${period}/${startDate}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    //data: data,
    body: {},
  }).then((response) => {
    console.log('getAnnualEnergyCostSavings:' + response.data)
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

export const getAnnualCarbonEmissionsAvoided = async (buildingId, percentReplacement, period, startDate, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getAnnualCarbonEmissionsAvoided/${buildingId}/${percentReplacement}/${period}/${startDate}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    //data: data,
    body: {},
  }).then((response) => {
    console.log('getAnnualCarbonEmissionsAvoided:' + response.data)
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
    console.log('getCostOfImprovement:' + response.data)
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

export const getPayback = async (buildingId, percentReplacement, period, startDate, idToken) => {
  let result
  await axios({
    method: 'get',
    url: process.env.REACT_APP_BACKEND_API + `/improvement/getPayback/${buildingId}/${percentReplacement}/${period}/${startDate}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    //data: data,
    body: {},
  }).then((response) => {
    console.log('getPayback: ' + response.data)
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