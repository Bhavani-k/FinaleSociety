import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

export const fetchData = async (endpoint, options = {}) => {
  console.log(endpoint);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data, options = {}) => {
  try {
    console.log(data);
    console.log(endpoint);
    const token = localStorage.getItem("token");
    console.log("token from api", token);
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (endpoint, data, options = {}) => {
  try {
    const token = localStorage.getItem("token");
    console.log("token from api", token);
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
