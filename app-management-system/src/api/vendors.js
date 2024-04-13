import axios from 'axios'

const url_base = 'http://localhost:8200/'
const apiVersion = 'v1/'
const subject = 'vendor/'

export const exportVendorsToCsv = () => {
    return axios.get(`${url_base}${apiVersion}${subject}export`, { responseType: 'blob' })
}

