'use client';

import { MdOutlineSearch } from 'react-icons/md';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { Button } from '../ui/button';
import { MdOutlineClose } from 'react-icons/md';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  placeholder: string;
}

export default function SearchBar({ placeholder }: Props) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full h-[40px] flex items-center justify-end space-x-2">
      <div className="w-[300px] max-sm:w-full h-full flex items-center border rounded-md p-2 space-x-1">
        <label htmlFor="search">
          <MdOutlineSearch className="size-6" />
        </label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          className="w-full outline-none [&::-webkit-search-decoration]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden text-sm bg-white"
        />

        {inputValue && (
          <Button
            className="h-auto rounded-full p-1"
            type="button"
            variant="ghost"
            onClick={() => setInputValue('')}
          >
            <MdOutlineClose className="size-5 text-black/50 hover:text-black" />
          </Button>
        )}

        <Button className="h-auto py-1 px-2" type="button" variant="outline">
          <BsArrowReturnLeft className="size-5" />
        </Button>
      </div>
      <Button
        className="w-[40px] p-1 shrink-0"
        type="button"
        variant="outline"
        onClick={() => router.push('/community/create')}
      >
        <FaRegEdit className="size-5" />
      </Button>
    </div>
  );
}
