import { Exercise, User } from "./types/ProductType";
import axios from "axios";
import { Role } from "./types/Roles";

// eslint-disable-next-line operator-linebreak
//using axios to create an instance with basic/main url part for all future requests
//please check out axios documentaion

// params are used instead of ?searchParamName=Value inside url
type body = {
  [key: string]: string | number | Role[],
}

const API_URL = axios.create({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'https://bioinformaticstestapp-90cac64dfd81.herokuapp.com',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

API_URL.interceptors.response.use(function({ data }) { return data });

// This function creates a promise
// that is resolved after a given delay

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() => API_URL.get(url, body))
};

function post<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() => API_URL.post(url, body))
};

function put<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() => API_URL.put(url, body))
};

//delete word is reserved, replaced it with remove
function remove(url: string): Promise<string> {
  return wait(300)
    .then(() => API_URL.delete(url))
};

export const loginUser = (email: string, password: string) => post<User>(`/auth/login`, { email, password });
export const regestrUser = (email: string, password: string, username: string, roles: Role, repeatPassword: string) => post<User>(`/auth/registration`, { email, password, username, roles: [roles], repeatPassword });

export const getUsersFromServer = () => get<User[]>('/users');
export const getExercisesFromServer = () => get<Exercise[]>('/exercises');
export const updateUserInfo = (email: string, password: string) => put<User>(
  '/users', 
  {email, password, userName: email.split('@')[0]},
);
export const deleteUserFromServer = () => remove('/users?userId=0');
