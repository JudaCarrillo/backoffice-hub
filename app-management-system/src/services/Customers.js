import axios from "axios";

const url_base = process.env.API_BASE_URL_CATALOG;
const apiVersion = process.env.API_VERSION;
const subject = "customers";

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${url_base}/${apiVersion}/${subject}/`);
    return response;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const createCustomer = async (data) => {
  try {
    const response = await axios.post(
      `${url_base}/${apiVersion}/${subject}/create`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(
      `${url_base}/${apiVersion}/${subject}/${id}/`
    );
    return response;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const response = await axios.put(
      `${url_base}/${apiVersion}/${subject}/${id}/`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const getCustomer = async (id) => {
  try {
    const response = await axios.get(
      `${url_base}/${apiVersion}/${subject}/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};

export const getCsvCustomers = async ({ callback, name }) => {
  try {
    const response = await axios.get(`${url_base}/${apiVersion}/${subject}/`, {
      responseType: "blob",
    });
    callback(response.data, name);
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
  }
};
