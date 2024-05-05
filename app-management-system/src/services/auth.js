import axios from "axios";

const url_base = process.env.API_BASE_URL_AUTH;
const apiVersion = process.env.API_VERSION;
const main_subject = "users";
const profile_subject = "user_profiles";
const auth_subject = "auth";

// user service

export const getUsers = () => {
  return axios.get(`${url_base}/${apiVersion}/${main_subject}/`);
};

export const getUsersToReport = () => {
  return axios.get(`${url_base}/${apiVersion}/${main_subject}/to-report`);
};

export const disableUser = (id) => {
  return axios.patch(
    `${url_base}/${apiVersion}/${main_subject}/disabled/${id}`
  );
};

export const createUser = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${main_subject}/create`, data);
};

export const updateUser = (id, data) => {
  return axios.put(
    `${url_base}/${apiVersion}/${main_subject}/update/${id}`,
    data
  );
};

export const getUserById = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${main_subject}/${id}`);
};

// user profile service

export const getUserProfileById = (id) => {
  return axios.get(`${url_base}/${apiVersion}/${profile_subject}/${id}`);
};
export const getUserProfile = () => {
  return axios.get(`${url_base}/${apiVersion}/${profile_subject}/`);
};

// auth service

export const login = (data) => {
  return axios.post(`${url_base}/${apiVersion}/${auth_subject}/login`, data);
};

export const recoveryPassword = (data) => {
  return axios.post(
    `${url_base}${apiVersion}/${auth_subject}/recovery-password`,
    data
  );
};
