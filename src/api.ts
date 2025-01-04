import { Exercise, Token, User } from "./types/ProductType";
import axios from "axios";
import { Role } from "./types/Roles";

type body = {
  [key: string]: string | number | Role[] | {},
}

export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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
    .then(({ data }) => data);
};

function post<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() => API_URL.post(url, body))
    .then(({ data }) => data)
};

function put<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() => API_URL.put(url, body))
    .then(({ data }) => data);
};

//delete word is reserved, replaced it with remove
function remove(url: string): Promise<string> {
  return wait(300)
    .then(() => API_URL.delete(url))
    .then(({ data }) => data);
};

//login with testUser1@gmail.com
//password: Test1234%

export const loginUser = (
  email: string, 
  password: string,
) => post<Token>(
  `/auth/login`, 
  { email, password },
);

export const regestrUser = (
  email: string, 
  password: string, 
  username: string, 
  roles: Role,
) => post<Token>(
  `/auth/registration`, 
  { email, password, username, roles: [roles] },
);

//changed endpoint from /auth to /user for receiving user`s info
export const getUserInfo = (
  token: string,
) => get<User>(
  `/user`, 
  {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  },
);
export const getTeams = () => get<[]>("/teams");

//asked backend developer to remove some regulations regarding the size of a title and description
export const getExercisesFromServer = () => get<Exercise[]>('/exercises');

//not usable currently
export const getUsersFromServer = () => get<User[]>('/users');
export const updateUserInfo = (email: string, password: string) => put<User>(
  '/users', 
  {email, password, userName: email.split('@')[0]},
);
export const deleteUserFromServer = () => remove('/users?userId=0');
