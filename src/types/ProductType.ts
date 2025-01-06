import { Role } from "./Roles";

export type Exercise = {
  title: string;
  description: string;
  steps: number;
  time: string;
  imagePath: string;
  progress: number | null;
  topic: string;
};

export type User = {
  id: number,
  name: null,
  username: string,
  scorePoints: number,
  email: string,
  role: Role.user | Role.admin,
  photo: string | null
}

export type Token = {
  token: string,
}

export type Reward = {
  title: string;
  imagePath: string;
};
