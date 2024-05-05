import axios from "axios";

const url_base = process.env.API_BASE_URL_CATALOG;
const apiVersion = process.env.API_VERSION;
const subject = "products";

export const getProducts = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/`);
};

export const exportProductsToCsv = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/export`, {
    responseType: "blob",
  });
};

export const deleteProduct = (id) => {
  return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`);
};

export const createProduct = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data);
};

export const updateProduct = (id, data) => {
  return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data);
};

export const getProductsId = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`);
};
