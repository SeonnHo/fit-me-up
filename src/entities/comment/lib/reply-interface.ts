import { Comment } from './comment-interface';

export interface Reply extends Omit<Comment, 'replies' | '_id'> {
  id: number;
  mentionedUser: string;
  mentioningUser: string;
}
