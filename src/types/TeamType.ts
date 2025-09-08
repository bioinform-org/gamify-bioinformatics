export type TeamType = {
  id: string;
  name: string;
  ownerId: number;
  memberIds: number[];
  createdAt: string;
};

export interface Pending {
  id: string;
  teamId: string;
  senderId: number;
  status: 'pending' | 'accepted' | 'rejected';
}