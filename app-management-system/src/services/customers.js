import axios from "axios";

const url_base = process.env.API_BASE_URL_CATALOG;
const apiVersion = process.env.API_VERSION;
const subject = "customers";

export const getCustomers = () => {
  try {
    return axios.get(`${url_base}/${apiVersion}/${subject}/`);
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const createCustomer = (data) => {
  try {
    return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data);
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const deleteCustomer = (id) => {
  try {
    return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`);
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const updateCustomer = (id, data) => {
  try {
    return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data);
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const getCustomerById = (id) => {
  try {
    return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`);
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const getCsvCustomers = () => {
  try {
    return axios.get(`${url_base}/${apiVersion}/${subject}/export`, {
      responseType: "blob",
    });
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};
