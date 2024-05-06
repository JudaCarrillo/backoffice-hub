import axios from "axios";

const url_base = process.env.API_BASE_URL;
const apiVersion = process.env.API_VERSION;
const subject = "orders";

export const getOrders = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/`);
};

export const exportOrdersToCsv = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/export`, {
    responseType: "blob",
  });
};
export const createOrder = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data);
};
export const deleteOrder = (id) => {
  return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`);
};

export const updateOrder = (id, data) => {
  return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data);
};

export const getOrderById = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`);
};

export const getShippers = () => {
  return axios.get(`${url_base}/${apiVersion}/shippers/`);
};
