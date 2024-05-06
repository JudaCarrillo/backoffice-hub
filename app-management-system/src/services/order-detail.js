import axios from "axios";

const url_base = process.env.API_BASE_URL;
const apiVersion = process.env.API_VERSION;
const subject = "order-details";

export const getOrderDetails = () => {
    return axios.get(`${url_base}/${apiVersion}/${subject}/`);
}

export const updateOrderDetail = (id, data) => {
    return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data);
}

export const deleteOrderDetail = (id) => {
    return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`);
}

export const createOrderDetail = (data) => {
    return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data);
}

export const exportOrderDetailToCsv = () => {
    return axios.get(`${url_base}/${apiVersion}/${subject}/export`, {
        responseType: "blob",
    });
}
export const getOrderDetailById = (id) => {
    return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`);
}