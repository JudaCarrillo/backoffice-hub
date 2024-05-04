import axios from 'axios'

const url_base = process.env.API_BASE_URL_AUTH
const apiVersion = process.env.API_VERSION
const main_subject = 'users/'
const profile_subject = 'user_profiles/'
const login_subject = 'auth/login'

export const getUsuarios = () => {
  return axios.get(`${url_base}/${apiVersion}/${main_subject}`)
}

export const disabledUser = (id) => {
  return axios.post(`${url_base}/${apiVersion}/${main_subject}disabled/${id}`)
}
export const createUsers = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${main_subject}create`, data)
}

export const updateUsers = (id, data) => {
  return axios.put(
    `${url_base}/${apiVersion}/${main_subject}update/${id}`,
    data
  )
}

export const getUserById = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${main_subject}${id}`);
}

export const getUserProfileById = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${profile_subject}${id}`);
}
export const getUserProfile = () => {
  return axios.get(`${url_base}/${apiVersion}/${profile_subject}`);
}

export const login = (data) => {
  return axios.post(`${url_base}${apiVersion}/${login_subject}`, data)
}
