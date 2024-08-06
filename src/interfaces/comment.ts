import { ObjectId } from 'mongodb';

export interface Comment {
  _id?: ObjectId | string;
  boardId: string;
  userId: string;
  createAt: Date;
  content: string;
  replies?: Reply[];
}

export interface Reply extends Omit<Comment, 'replies' | '_id'> {
  id: number;
  mentionedUser: string;
  mentioningUser: string;
}
