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
<<<<<<< HEAD
  id: number;
  name: string | null;
  username: string;
  scorePoints: number;
  email: string;
  role: Role.user | Role.admin;
};
=======
  id: number,
  name: null,
  username: string,
  scorePoints: number,
  email: string,
  role: Role.user | Role.admin,
  photo: string | null
}
>>>>>>> 2a8caecc0eb61a4325842b999cc04ce8cc5c4815

export type Token = {
  token: string;
};

export type Reward = {
  title: string;
  imagePath: string;
};
