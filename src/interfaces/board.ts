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
  bodyInfo: {
    gender: string;
    height: number | undefined;
    weight: number | undefined;
  };
  user: string | ObjectId;
  likeCount: number;
  commentCount: number;
  images: string[];
}
