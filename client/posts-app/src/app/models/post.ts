import {IUser} from "./user";

export class IPost {
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  dateCreated: Date | undefined;
}
