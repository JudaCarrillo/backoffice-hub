import axios from 'axios'

const url_base = 'http://localhost:8200/'
const apiVersion = 'v1/'
export const getUsuarios = () => {
    return axios.get("http://localhost:8000/v1/users/")
}

export const getProducts = () => {
    return axios.get(`${url_base}${apiVersion}product/`)
}

export const getCategories = () => {
    return axios.get(`${url_base}${apiVersion}category/`)
}

export const getVendors = () => {
    return axios.get(`${url_base}${apiVersion}vendor/`)
}