import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostHeaderProps {
  title: string;
  createdAt: Date;
  authorId: string;
  author: {
    nickname: string;
    profileImageUrl: string | null;
  };
  viewCount: number;
}

export const PostHeader = ({
  title,
  createdAt,
  author,
  viewCount,
}: PostHeaderProps) => {
  return (
    <section className="p-4 flex flex-col space-y-4 border-b">
      <div className="flex space-x-2">
        <Avatar>
          <AvatarImage src={author.profileImageUrl!} alt="프로필이미지" />
          <AvatarFallback>{author.nickname.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-bold">{author.nickname}</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">
              {format(createdAt, 'yyyy. MM. dd. HH:mm', { locale: ko })}
            </span>
            <span className="text-xs">조회 {viewCount}</span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-medium break-all">{title}</h2>
    </section>
  );
};
