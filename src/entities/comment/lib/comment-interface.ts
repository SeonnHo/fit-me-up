import { ObjectId } from 'mongodb';
import { Reply } from './reply-interface';

export interface Comment {
  _id?: ObjectId | string;
  boardId: string;
  userId: string;
  createAt: Date;
  content: string;
  replies?: Reply[];
}
