import axios from "axios";

const url_base = process.env.API_BASE_URL_CATALOG;
const apiVersion = process.env.API_VERSION;
const subject = "suppliers";

export const getVendors = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/`);
};

export const exportVendorsToCsv = () => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/export`, {
    responseType: "blob",
  });
};
export const deleteVendor = (id) => {
  return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`);
};

export const createVendor = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data);
};
export const updateVendor = (id, data) => {
  return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data);
};
export const getVendorsId = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`);
};
