import { Exercise, User } from "./types/ProductType";
import axios from "axios";

// eslint-disable-next-line operator-linebreak
//using axios to create an instance with basic/main url part for all future requests
//please check out axios documentaion

// params are used instead of ?searchParamName=Value inside url
type body = {
  [key: string]: string | number;
};

const API_URL = axios.create({
  // baseURL: '../public/api/',

  // This is a temporary mock server created with Postman mock api/server.
  // By sending GET methods with /users, /exercises endpoints we can request approriate temporary data
  // to prepare some of our code to future server, database and api
  // !!!!BUT, this mock server does not function as a normal server, it cannot work with random searchParams/params(axios)
  // Usage:
  // 1)https://48ed0cde-344c-427e-9b61-8053605c1042.mock.pstmn.io/users - will get you all users (the same users as in public/api/users)
  // 1.1)GET method
  // 1.1.1)https://48ed0cde-344c-427e-9b61-8053605c1042.mock.pstmn.io/users?email=user1@gmail.com - will get you first user
  // 1.1.2)https://48ed0cde-344c-427e-9b61-8053605c1042.mock.pstmn.io/users?email=user2@gmail.com - will get you second user

  // 1.2)POST method
  // 1.2.1)https://48ed0cde-344c-427e-9b61-8053605c1042.mock.pstmn.io/users?email=user3@gmail.com&password=PassWord3!&userName=user3 -will make a third user and return it, BUT!!!! it will not be added to the same database as /users. Even more, it will not be added to ANY databases, because there are no links between this requests. They are all separate requests - the same as writing for number from 1 to 5, five different if () {}. Basically no logic behind those requests, just asking for sth and getting it.
  //It will be fixed in the future with replacing MOCK Server with A REAL SERVER / DATABASE / API

  // 2)https://48ed0cde-344c-427e-9b61-8053605c1042.mock.pstmn.io/exercises -
  // will get you all exercises (the same exercises as in public/api/users)
  baseURL: "https://48ed0cde-344c-427e-9b61-8053605c1042.mock.pstmn.io",
});

// This function creates a promise
// that is resolved after a given delay

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() =>
      API_URL.get(url, {
        params: body,
      })
    )
    .then(({ data }) => data);
}

function post<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() =>
      API_URL.post(url, {
        params: body,
      })
    )
    .then(({ data }) => data);
}

function patch<T>(url: string, body: body = {}): Promise<T> {
  return wait(300)
    .then(() =>
      API_URL.patch(url, {
        params: body,
      })
    )
    .then(({ data }) => data);
}

<<<<<<< HEAD
export const getExercises = () => get<Exercise[]>("/exercises");
export const getTeams = () => get<[]>("/teams");
export const getUsers = () => get<User[]>("/users");
export const getUser = (email: string) => get<User[]>(`/users`, { email });

// To use this function, we need to always pass user3@gmail.com as an email and PassWord3! as password, to receive response from mock server
export const createUser = (email: string, password: string) =>
  post<User[]>("/users", { email, password, userName: email.split("@")[0] });

export const updateUser = (email: string, password: string) =>
  patch<User>("/users", { email, password, userName: email.split("@")[0] });
=======
//delete word is reserved, replaced it with remove
function remove(url: string): Promise<string> {
  return wait(300)
    .then(() => API_URL.delete(url))
    .then((response) => response.statusText)
};

export const getExercisesFromServer = () => get<Exercise[]>('/exercises');
export const getUsersFromServer = () => get<User[]>('/users');
export const getUserFromServer = (email: string) => get<User>(`/users`, { email });

// To use this function, we need to always pass user3@gmail.com as an email and PassWord3! as password, to receive response from mock server
export const createNewUser = (email: string, password: string) => post<User>(
  '/users', 
  {email, password, userName: email.split('@')[0]},
);

//these two function are currently in development with mock server / maybe  it will be even better just to wait for a ready server to make work easier

export const updateUserInfo = (email: string, password: string) => patch<User>(
  '/users', 
  {email, password, userName: email.split('@')[0]},
);

export const deleteUserFromServer = () => remove('/users?userId=0');
>>>>>>> 9d5e2573ed66b0d79811acca2485adc33bc1c9bb
