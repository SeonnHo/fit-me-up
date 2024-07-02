'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineInfo, MdOutlineImage } from 'react-icons/md';

interface Props {
  image: string;
  fitInfo?: {
    category: string;
    value: string;
  }[];
}

export default function FitImage({ image, fitInfo }: Props) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <div className="relative w-full h-[500px]">
      {isShowInfo ? (
        <div className="flex flex-col h-full">
          <div className="flex justify-end">
            <Button
              variant="outline"
              type="button"
              className="text-sm flex justify-center items-center px-2 py-1 h-auto space-x-1 mt-2 mr-2"
              onClick={() => setIsShowInfo(false)}
            >
              <MdOutlineImage />
              <p className="text-xs">이미지</p>
            </Button>
          </div>
          {fitInfo ? (
            <div className="p-2">
              <table className="w-full">
                <tbody>
                  {fitInfo.map((info) => (
                    <tr key={info.category} className="border text-center">
                      <td className="border-r w-1/5 font-bold bg-zinc-100">
                        {info.category}
                      </td>
                      <td>{info.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-grow">
              <p className="font-bold text-center">
                해당 핏에 대한 정보가 없습니다.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <Image
            src={image}
            alt="핏이미지"
            fill
            priority
            className="w-full h-full object-cover"
          />
          <Button
            variant="outline"
            type="button"
            className="text-sm flex justify-center items-center absolute top-2 right-2 px-2 py-1 h-auto space-x-1"
            onClick={() => setIsShowInfo(true)}
          >
            <MdOutlineInfo />
            <p className="text-xs">핏 정보</p>
          </Button>
        </>
      )}
    </div>
  );
}
