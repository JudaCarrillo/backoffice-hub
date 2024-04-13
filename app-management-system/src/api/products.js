import axios from 'axios'

const url_base = 'http://localhost:8200/'
const apiVersion = 'v1/'
const subject = 'product/'

export const exportProductsToCsv = () => {
    return axios.get(`${url_base}${apiVersion}${subject}export`, { responseType: 'blob' })
}

export const deleteProduct = (id) => {
    return axios.delete(`${url_base}${apiVersion}${subject}delete/${id}`)
}

export const createProduct = (data) => {   
    return axios.post(`${url_base}${apiVersion}${subject}create`, data)
}