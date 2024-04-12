import axios from 'axios'

export const getUsuarios = () => {
    return axios.get('http://localhost:8000/v1/users/')
}