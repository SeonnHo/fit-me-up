import { create } from 'zustand';
interface Store {
  category: string;
  files: File[];
  filePathList: string[];
  setCategory: (category: string) => void;
  setFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  addFilePath: (event: ProgressEvent<FileReader>) => void;
  removeFilePath: (index: number) => void;
  resetFilePath: () => void;
}
export const useFormStore = create<Store>((set) => ({
  category: '',
  files: [],
  filePathList: [],
  setCategory: (category) => set({ category }),
  setFiles: (files) => set({ files }),
  removeFile: (index) => {
    set((store) => ({
      files: store.files.filter((_, idx) => idx !== index),
    }));
  },
  addFilePath: (event) => {
    set((store) => ({
      filePathList: [...store.filePathList, event.target?.result as string],
    }));
  },
  removeFilePath: (index) => {
    set((store) => ({
      filePathList: store.filePathList.filter((_, idx) => idx !== index),
    }));
  },
  resetFilePath: () => set({ filePathList: [] }),
}));
