import axios from 'axios'

export const getEquipmentById = async (id, idToken) => {
  let result
  await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API}/equipments/${id}`,
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

export const getEnergyConsumptionEquipmentByIdAndDatePeriod = async (id, startDate, endDate, idToken) => {
  let result
  await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API}/equipments/getEnergyConsumption/${id}/${startDate}/${endDate}/`,
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

export const getEnergyConsumptionPercentage = async (
  equipmentId, equipmentTypeId, subSystemId, buildingId, startDate, endDate, idToken) => {
  let result
  await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API}/equipments/getEnergyConsumptionPercentage/${equipmentId}/${equipmentTypeId}/${subSystemId}/${buildingId}/${startDate}/${endDate}/`,
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