import { Profile } from './profile';

export interface SingleComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
