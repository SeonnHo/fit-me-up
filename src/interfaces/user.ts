import { ObjectId } from 'mongodb';

export interface User {
  _id: string | ObjectId;
  email: string | null | undefined;
  password: string | null | undefined;
  nickname: string | null | undefined;
  type: string;
}
