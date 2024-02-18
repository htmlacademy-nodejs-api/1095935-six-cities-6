import { IUser } from "./user.js";

export interface IComment {
  id: string;
  text: string;
  publishDate: string;
  rating: number;
  author: IUser;
}
