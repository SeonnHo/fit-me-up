import { ObjectId } from 'mongodb';

export interface Post {
  _id: string | ObjectId;
  title?: string;
  content: string;
  category: string;
  createAt: Date;
  user: string | ObjectId;
  likeCount: number;
  commentCount: number;
  images: string[];
}

export interface TodayFitPost extends Omit<Post, 'user'> {
  fashionInfo?: {
    section: string;
    info: string;
    size: string;
  }[];
  bodyInfo: {
    gender: string;
    height: number;
    weight: number;
  };
  user: {
    _id: string;
    nickname: string;
    image: string;
  };
}
