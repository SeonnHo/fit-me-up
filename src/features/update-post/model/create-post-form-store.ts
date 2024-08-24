import { create } from 'zustand';

interface CreatePostFormStore {
  files: File[];
  filePathList: string[];
  setFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  addFilePath: (event: ProgressEvent<FileReader>) => void;
  removeFilePath: (index: number) => void;
  resetFilePath: () => void;
}

export const useCreatePostFormStore = create<CreatePostFormStore>((set) => ({
  files: [],
  filePathList: [],
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
