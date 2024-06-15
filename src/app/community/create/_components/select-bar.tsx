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
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { LuImagePlus } from 'react-icons/lu';

export default function SelectBar() {
  const [selected, setSelected] = useState('');
  const [files, setFiles] = useState([] as any);

  const handleSelectedChange = (value: string) => {
    console.log(value);
    setSelected(value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <section className="max-sm:p-4 py-4 flex space-x-2">
      <div className="flex flex-col w-full space-y-1">
        <Select onValueChange={handleSelectedChange}>
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
        {selected === 'todayFit' && (
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
        multiple={selected === 'todayFit' ? false : true}
        onChange={handleFileChange}
      />
    </section>
  );
}
