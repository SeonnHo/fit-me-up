import { create } from 'zustand';

interface Store {
  commentId: string;
  mentionedUser: string;
  mentioningUser: string;
  setCommentId: (id: string) => void;
  setMentionedUser: (user: string) => void;
  setMentioningUser: (user: string) => void;
}

export const useCommentStore = create<Store>((set) => ({
  commentId: '',
  mentionedUser: '',
  mentioningUser: '',
  setCommentId: (id) => set({ commentId: id }),
  setMentionedUser: (user) => set({ mentionedUser: user }),
  setMentioningUser: (user) => set({ mentioningUser: user }),
}));
