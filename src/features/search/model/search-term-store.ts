import { create } from 'zustand';

interface SearchTermStore {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useSearchTermStore = create<SearchTermStore>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
