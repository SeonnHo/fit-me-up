import { create } from 'zustand';

interface CommentStore {
  commentId: string;
  setCommentId: (id: string) => void;
  mentionedUserId: string;
  setMentionedUserId: (userId: string) => void;
  mentioningUserId: string;
  setMentioningUserId: (userId: string) => void;
  mentionedUserNickname: string;
  setMentionedUserNickname: (nickname: string) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  commentId: '',
  setCommentId: (id) => set({ commentId: id }),
  mentionedUserId: '',
  setMentionedUserId: (userId) => set({ mentionedUserId: userId }),
  mentioningUserId: '',
  setMentioningUserId: (userId) => set({ mentioningUserId: userId }),
  mentionedUserNickname: '',
  setMentionedUserNickname: (nickname) =>
    set({ mentionedUserNickname: nickname }),
}));
