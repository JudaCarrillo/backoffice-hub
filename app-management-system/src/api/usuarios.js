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

export const disabledUser = (id) => {
    return axios.post(`http://localhost:8000/v1/users/disabled/${id}`)
}
export const createUsers = (data) => {
    return axios.post(`http://localhost:8000/v1/users/create`, data)
}   

export const updateUsers = (id, data) => {
    return axios.put(`http://localhost:8000/v1/users/update/${id}`, data)
}

export const getUserById = (id) => {
    return axios.get(`http://localhost:8000/v1/users/${id}`)
}

export const getUserProfileById = (id) => {
    return axios.get(`http://localhost:8000/v1/user_profiles/${id}`)
}
export const getUserProfile = () => {
    return axios.get(`http://localhost:8000/v1/user_profiles/`)
}