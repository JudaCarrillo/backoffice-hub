import axios from 'axios'

const url_base = 'http://localhost:8200/'
const apiVersion = 'v1/'
const subject = 'vendor/'

export const exportVendorsToCsv = () => {
    return axios.get(`${url_base}${apiVersion}${subject}export`, { responseType: 'blob' })
}
export const deleteVendor = (id) => {
    return axios.delete(`${url_base}${apiVersion}${subject}delete/${id}`)
}
export const createVendor = () => {
    return axios.post(`${url_base}${apiVersion}${subject}create`)
}