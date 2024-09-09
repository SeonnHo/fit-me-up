'use client';

import Image from 'next/image';
import { useCreatePostFormStore } from '../model/create-post-form-store';
import { LuImage } from 'react-icons/lu';

export const ThumbnailList = () => {
  const { filePathList, removeFile, removeFilePath } = useCreatePostFormStore();

  const handleDeleteFile = (index: number) => {
    removeFilePath(index);
    removeFile(index);
  };

  if (filePathList.length > 0) {
    return (
      <div className="flex space-x-4 overflow-scroll whitespace-nowrap">
        {filePathList.map((filePath, index) => (
          <div
            key={filePath}
            className="w-[100px] h-[100px] border-2 rounded-lg cursor-pointer hover:bg-zinc-200 hover:opacity-20 relative shrink-0"
            onClick={() => handleDeleteFile(index)}
          >
            <Image
              src={filePath}
              alt="이미지"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div className="border-2 border-dashed w-[100px] h-[100px] flex justify-center items-center rounded-lg">
          <LuImage className="size-6" />
        </div>
      </div>
    );
  }
};
