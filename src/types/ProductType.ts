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
  userId: number;
  userName: string;
  email: string;
  password: string;
};

export type Reward = {
  title: string;
  imagePath: string;
};
