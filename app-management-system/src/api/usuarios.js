import axios from 'axios'
const url_base = 'http://localhost:8000/'
export const getUsuarios = () => {
    return axios.get(`${url_base}/v1/users/`)
}

export const getProductos= () => {
    return axios.get('http://localhost:8000/v1/users/')
}