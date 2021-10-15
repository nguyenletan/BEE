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