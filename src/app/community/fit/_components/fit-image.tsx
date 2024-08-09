'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineInfo, MdOutlineImage } from 'react-icons/md';

interface Props {
  image: string;
  fitInfo?: {
    section: string;
    info: string;
    size: string;
  }[];
  bodyInfo?: {
    gender: string;
    height: number | undefined;
    weight: number | undefined;
  };
}

export default function FitImage({
  image,
  fitInfo,
  bodyInfo = { gender: '', height: 0, weight: 0 },
}: Props) {
  const [isShowInfo, setIsShowInfo] = useState(false);

  const translateGender = (gender: string): string => {
    const genderMap: Record<string, string> = {
      male: '남성',
      female: '여성',
    };

    return genderMap[gender] || '미기재';
  };

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
          {bodyInfo && (
            <div className="p-2 flex flex-col space-y-2">
              <table className="w-full">
                <tbody>
                  <tr className="border text-center">
                    <th className="border-r text-sm bg-zinc-100 w-1/3 p-2">
                      성별
                    </th>
                    <th className="border-r text-sm bg-zinc-100 w-1/3 p-2">
                      키
                    </th>
                    <th className="text-sm bg-zinc-100 w-1/3 p-2">몸무게</th>
                  </tr>
                  <tr className="border-x border-b text-center">
                    <td className="border-r text-sm p-2">
                      {translateGender(bodyInfo.gender)}
                    </td>
                    <td className="border-r text-sm p-2">
                      {bodyInfo.height === 0 ? '미기재' : bodyInfo.height}
                    </td>
                    <td className="text-sm p-2">
                      {bodyInfo.weight === 0 ? '미기재' : bodyInfo.weight}
                    </td>
                  </tr>
                </tbody>
              </table>
              {fitInfo && fitInfo.length > 0 ? (
                <table className="w-full">
                  <tbody>
                    {fitInfo.map((info) => (
                      <tr
                        key={info.section}
                        className="border text-center flex"
                      >
                        <td className="border-r w-1/5 font-bold bg-zinc-100 p-2 text-sm line-clamp-1">
                          <div className="line-clamp-1 break-all text-ellipsis">
                            {info.section}
                          </div>
                        </td>
                        <td className="w-3/5 p-2 text-sm border-r">
                          <div className="line-clamp-1 break-all text-ellipsis">
                            {info.info}
                          </div>
                        </td>
                        <td className="w-1/5 p-2 text-sm line-clamp-1">
                          <div className="line-clamp-1 break-all text-ellipsis">
                            {info.size}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center flex-grow">
                  <p className="font-bold text-center">
                    해당 핏에 대한 정보가 없습니다.
                  </p>
                </div>
              )}
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
