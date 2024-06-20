import { create } from 'zustand';
interface Store {
  category: string;
  setCategory: (category: string) => void;
}
export const useFormStore = create<Store>((set) => ({
  category: '',
  setCategory: (category) => set({ category }),
}));
