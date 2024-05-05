import axios from 'axios'

const url_base = process.env.API_BASE_URL_CATALOG
const apiVersion = process.env.API_VERSION
const subject = 'categories'

export const getCategories = () => {
    return axios.get(`${url_base}/${apiVersion}/${subject}/`)
}

export const exportCategoriesToCsv = () => {
    return axios.get(`${url_base}/${apiVersion}/${subject}/export`, { responseType: 'blob' })
}

export const deleteCategory = (id) => {
    return axios.delete(`${url_base}/${apiVersion}/${subject}/delete/${id}`)
}
export const createCategory = (data) => {
    return axios.post(`${url_base}/${apiVersion}/${subject}/create`, data)
}

export const updateCategory = (id, data) => {
    return axios.put(`${url_base}/${apiVersion}/${subject}/update/${id}`, data)
}

export const getCategoryById = (id) => {
    return axios.get(`${url_base}/${apiVersion}/${subject}/${id}`)
}