'use client';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineImage, MdOutlineInfo } from 'react-icons/md';
import { BodyInfoTable } from './body-info-table';
import { FashionInfoTable } from './fashion-info-table';

interface TodayFitImageProps {
  image: string;
  fashionInfo?: {
    section: string;
    info: string;
    size: string;
  }[];
  bodyInfo?: {
    gender: string;
    height: string;
    weight: string;
  };
}

export const TodayFitImage = ({
  image,
  fashionInfo,
  bodyInfo,
}: TodayFitImageProps) => {
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

          {bodyInfo && (
            <div className="p-2 flex flex-col space-y-2">
              <BodyInfoTable bodyInfo={bodyInfo} />
              {fashionInfo && fashionInfo.length > 0 ? (
                <FashionInfoTable fashionInfo={fashionInfo} />
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
            alt="패션 이미지"
            fill
            sizes="400px"
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
};
