import { User } from "./ProductType";

export type TeamType = {
  id: string;
  name: string;
  members: User[];
};

export type Pending = {
  id: string;
  team: TeamType;
  sender: User;
  status: boolean;
};