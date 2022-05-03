import { IUser } from './user';
export interface IPost {
  id: number;
  title: string;
  content: string;
  dateCreated: Date;
  imageUrl: string;
  author?: IUser;
}
