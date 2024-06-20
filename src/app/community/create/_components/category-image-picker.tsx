'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

import { LuImagePlus, LuImage } from 'react-icons/lu';
import { toast } from '@/components/ui/use-toast';
import { useFormStore } from '@/store/use-form-store';

export default function CategoryImagePicker() {
  const { category, setCategory } = useFormStore();
  const [files, setFiles] = useState<File[]>();
  const [filePathList, setFilePathList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && inputRef.current.files) {
      if (inputRef.current.files.length > 5) {
        toast({
          title: '이미지 개수 초과',
          description: '이미지는 최대 5장까지 첨부 가능합니다.',
        });
        return;
      }

      setFilePathList([]);

      const fileList: File[] = [];

      for (const file of inputRef.current.files) {
        fileList.push(file);
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          setFilePathList((pathList) => [
            ...pathList,
            e.target?.result as string,
          ]);
        };
        reader.readAsDataURL(file);
      }

      setFiles(fileList);
    }
  };

  const handleDeleteFile = (index: number) => {
    setFilePathList((pathList) => pathList.filter((_, idx) => idx !== index));
  };

  return (
    <section className="flex flex-col">
      <section className="max-sm:p-4 py-4 flex space-x-2">
        <div className="flex flex-col w-full space-y-1">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="게시판 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="todayFit">오늘의 핏</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="pl-2">남성 커뮤니티</SelectLabel>
                <SelectItem value="manFree">자유게시판</SelectItem>
                <SelectItem value="manQuestion">질문게시판</SelectItem>
                <SelectItem value="manInfo">정보게시판</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="pl-2">여성 커뮤니티</SelectLabel>
                <SelectItem value="womanFree">자유게시판</SelectItem>
                <SelectItem value="womanQuestion">질문게시판</SelectItem>
                <SelectItem value="womanInfo">정보게시판</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {category === 'todayFit' && (
            <p className="text-xs text-zinc-400 pl-2">
              오늘의 핏 선택 시 사진 업로드는 1장만 가능합니다.
            </p>
          )}
        </div>
        <label
          htmlFor="addimage"
          className="h-[40px] w-[40px] border rounded flex justify-center items-center cursor-pointer"
        >
          <LuImagePlus className="size-6" />
        </label>
        <input
          id="addimage"
          type="file"
          className="hidden"
          multiple={category === 'todayFit' ? false : true}
          onChange={handleFileChange}
          ref={inputRef}
        />
      </section>
      {filePathList.length ? (
        <section className="flex space-x-4 overflow-scroll whitespace-nowrap max-sm:p-4 max-sm:pt-0 pb-4">
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
        </section>
      ) : (
        <section className="max-sm:p-4 max-sm:pt-0 pb-4">
          <div className="border-2 border-dashed w-[100px] h-[100px] flex justify-center items-center rounded-lg">
            <LuImage className="size-6" />
          </div>
        </section>
      )}
      <p className="text-xs text-zinc-400 max-sm:pl-4 pb-2">
        이미지는 최대 5장까지 첨부 가능합니다.
      </p>
    </section>
  );
}
