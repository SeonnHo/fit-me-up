import { create } from 'zustand';

interface ReplyStore {
  parentCommentId: string;
  setParentCommentId: (id: string) => void;
  mentionedUserId: string;
  setMentionedUserId: (userId: string) => void;
  mentioningUserId: string;
  setMentioningUserId: (userId: string) => void;
  mentionedUserNickname: string;
  setMentionedUserNickname: (nickname: string) => void;
}

export const useReplyStore = create<ReplyStore>((set) => ({
  parentCommentId: '',
  setParentCommentId: (id) => set({ parentCommentId: id }),
  mentionedUserId: '',
  setMentionedUserId: (userId) => set({ mentionedUserId: userId }),
  mentioningUserId: '',
  setMentioningUserId: (userId) => set({ mentioningUserId: userId }),
  mentionedUserNickname: '',
  setMentionedUserNickname: (nickname) =>
    set({ mentionedUserNickname: nickname }),
}));
