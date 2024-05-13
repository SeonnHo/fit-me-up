import Image from 'next/image';
import mirrorImage from '/public/mirror.png';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const postNavigationTextList: {
    title: string;
    subtitle: string;
    href: string;
  }[] = [
    {
      title: '오늘의 핏',
      subtitle: '나의 핏을 자랑해요',
      href: '/community/fit',
    },
    {
      title: '남성 커뮤니티',
      subtitle: '오늘의 남성패션 이야기',
      href: '/community/man',
    },
    {
      title: '여성 커뮤니티',
      subtitle: '오늘의 여성패션 이야기',
      href: '/community/woman',
    },
  ];

  return (
    <main className="lg:max-w-screen-lg mx-auto h-screen flex justify-center items-center">
      <section className="w-full max-sm:mt-[100px]">
        <div className="relative">
          <Image
            src={mirrorImage}
            alt="거울이미지"
            className="opacity-40 sm:w-[500px] mx-auto max-sm:w-[300px]"
          />
          <h2 className="absolute top-1/2 left-1/2 font-bold text-center text-3xl max-sm:text-lg max-sm:w-full leading-normal -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_5px_10px_gray]">
            핏미업에서 더욱 더 핏하게
          </h2>
        </div>
        <div className="flex justify-around items-center my-8 max-md:flex-col max-md:gap-10">
          {postNavigationTextList.map((cardText) => (
            <Link
              key={cardText.title}
              href={cardText.href}
              className="px-6 py-4 flex justify-between items-center text-center rounded-md shadow-[0_0_10px_0] shadow-zinc-400 bg-white hover:bg-white/50 w-[210px]"
            >
              <div className="flex flex-col">
                <h3 className="text-left font-bold">{cardText.title}</h3>
                <p className="text-left text-xs text-zinc-400">
                  {cardText.subtitle}
                </p>
              </div>
              <FaArrowRight className="ml-4" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
