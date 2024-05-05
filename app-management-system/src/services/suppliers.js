import axios from "axios";

const url_base = process.env.API_BASE_URL_CATALOG;
const apiVersion = process.env.API_VERSION;
const subject = "suppliers";

export const getSuppliers = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/`);
};

export const exportSuppliersToCsv = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/export`, {
    responseType: "blob",
  });
};
export const deleteSupplier = (id) => {
  return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`);
};

export const createSupplier = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data);
};
export const updateSupplier = (id, data) => {
  return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data);
};
export const getSupplierById = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`);
};
