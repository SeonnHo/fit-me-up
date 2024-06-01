import Image from 'next/image';

interface Props {
  image: string;
  nickname: string;
  createAt: string;
  content: string;
}

export default function Comment({ image, nickname, createAt, content }: Props) {
  return (
    <li className="flex space-x-2 items-start border-y py-2 [&:first-child~li]:border-t-0">
      <Image
        src={image}
        alt="프로필이미지"
        width={40}
        height={40}
        className="rounded-full flex-grow-0 shrink-0"
      />
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2 items-center">
          <p className="text-sm font-bold">{nickname}</p>
          <p className="text-xs text-zinc-400">{createAt}</p>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </li>
  );
}
