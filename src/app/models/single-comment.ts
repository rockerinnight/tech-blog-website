import { Profile } from './profile';

export interface SingleComment {
  comment: {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Profile;
  };
}
