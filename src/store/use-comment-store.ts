import { create } from 'zustand';

interface Store {
  mentionedUser: string;
  mentioningUser: string;
  setMentionedUser: (user: string) => void;
  setMentioningUser: (user: string) => void;
}

export const useCommentStore = create<Store>((set) => ({
  mentionedUser: '',
  mentioningUser: '',
  setMentionedUser: (user) => set({ mentionedUser: user }),
  setMentioningUser: (user) => set({ mentioningUser: user }),
}));
