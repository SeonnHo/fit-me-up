import { cn } from '@/shared/lib/tailwind-merge';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PostImageCarouselProps {
  imageUrls: string[];
}

export const PostImageCarousel = ({ imageUrls }: PostImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (imageUrls.length <= 0) return;

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-4">
      <Carousel
        className="xl:w-[600px] lg:w-[500px] md:w-[400px] w-[300px]"
        setApi={setApi}
      >
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={url}>
              <div className="relative rounded-md border xl:size-[600px] lg:size-[500px] md:size-[400px] size-[300px]">
                <Image
                  src={url}
                  alt={`게시물 이미지 ${index}`}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="w-full flex lg:justify-center justify-start items-center space-x-2 overflow-scroll scrollbar-hide">
        {imageUrls.map((url, index) => (
          <div
            key={url}
            className={cn(
              'relative flex justify-center items-center w-[100px] h-[100px] rounded border bg-slate-50 shrink-0',
              current === index && 'border-black border-2'
            )}
            onClick={() => api?.scrollTo(index)}
          >
            <Image
              src={url}
              alt={`게시물 이미지 ${index}`}
              fill
              priority
              className="object-contain cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
