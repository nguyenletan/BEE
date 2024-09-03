import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const axiosInstance = (idToken) => axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  },
});

const handleApiCall = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const createBuilding = (data, idToken) =>
  handleApiCall(() => axiosInstance(idToken).post('/buildings/create-partial', data));

export const deleteBuilding = (propertyId, idToken) =>
  handleApiCall(() => axiosInstance(idToken).delete(`/buildings/${propertyId}`));

export const updateBuilding = (id, data, idToken) =>
  handleApiCall(() => axiosInstance(idToken).post(`/buildings/edit/${id}`, data));

export const getAllBuilding = (idToken) =>
  handleApiCall(() => axiosInstance(idToken).get('/buildings/'));

export const getBuildingById = (id, startDay, endDay, idToken) =>
  handleApiCall(() => axiosInstance(idToken).get(`/buildings/${id}/${startDay}/${endDay}`));

export const getBuildingByIdForEditing = (id, idToken) =>
  handleApiCall(() => axiosInstance(idToken).get(`/buildings/edit/${id}`));

export const getBreakdownByTime = (idToken, id, type, firstParam, secondParam, thirdParam) => {
  console.log('id:', id);
  console.log('type:', type);
  console.log('firstParam:', firstParam);
  console.log('secondParam:', secondParam);
  console.log('thirdParam:', thirdParam);
  return handleApiCall(() => axiosInstance(idToken).get(`/buildings/get-breakdown/${id}/${type}/${firstParam}/${secondParam}/${thirdParam}`));
}