import { ObjectId } from 'mongodb';

export interface Board {
  _id: string | ObjectId;
  title?: string;
  content: string;
  category: string;
  createAt: Date;
  fitInfo?: {
    section: string;
    info: string;
  }[];
  user: string | ObjectId;
  likeCount: number;
  commentCount: number;
  images: string[];
}
