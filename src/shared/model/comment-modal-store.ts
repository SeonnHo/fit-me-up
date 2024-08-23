import { create } from 'zustand';

interface CommentModalStore {
  isOpen: boolean;
  postId: string;
  category: string;
  onOpen: (postId: string, category: string) => void;
  onClose: () => void;
}

export const useCommentModalStore = create<CommentModalStore>((set) => ({
  isOpen: false,
  postId: '',
  category: '',
  onOpen: (postId, category) => {
    set({ isOpen: true, postId, category });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));
