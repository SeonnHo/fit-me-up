import { create } from 'zustand';

interface ValidationStore {
  isValidNickname: boolean;
  setIsValidNickname: (value: boolean) => void;
}

export const useValidationStore = create<ValidationStore>((set) => ({
  isValidNickname: false,
  setIsValidNickname: (value) => set({ isValidNickname: value }),
}));
