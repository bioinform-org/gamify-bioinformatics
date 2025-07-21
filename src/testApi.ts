import { Exercise, User } from "./types/ProductType";
import axios from "axios";
import { Role } from "./types/Roles";

interface Body {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [key: string]: string | number | Role[] | {} | null,
}

export const TEST_API_URL = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function testGet<T>(url: string, body: Body = {}): Promise<T> {
  return wait(300)
    .then(() => TEST_API_URL.get(url, body))
    .then(({ data }) => data);
}

export const getExercisesFromLocal = () => testGet<Exercise[]>('/exercises.json');
export const getUsersFromLocal = () => testGet<User[]>('/users.json');