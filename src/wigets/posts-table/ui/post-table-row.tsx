'use client';

import { TableCell, TableRow } from '@/shared/ui/table';
import { Prisma } from '@prisma/client';
import { FaImage } from 'react-icons/fa6';
import { format, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

type PostSummary = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    category: true;
    imageUrls: true;
    createdAt: true;
    viewCount: true;
    _count: {
      select: {
        comments: true;
      };
    };
    author: {
      select: {
        nickname: true;
      };
    };
  };
}>;

interface PostsTableRowProps {
  post: PostSummary;
  gender: string;
  board: string;
}

const formatDate = (date: Date) => {
  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: ko });
  } else {
    return format(date, 'yyyy. MM. dd.', { locale: ko });
  }
};

export const PostTableRow = ({ post, gender, board }: PostsTableRowProps) => {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/community/${gender}/${board}/${post.id}`)}
    >
      <TableCell className="flex items-center space-x-1 text-center p-2 xl:w-[600px]">
        <span className="line-clamp-1 break-all">{post.title}</span>
        {post.imageUrls.length > 0 && (
          <span className="shrink-0">
            <FaImage className="w-3 h-3 text-muted-foreground" />
          </span>
        )}
        {post._count.comments > 0 && (
          <span className="text-red-600 font-bold shrink-0">
            &#91;{post._count.comments}&#93;
          </span>
        )}
      </TableCell>
      <TableCell className="text-center p-2 w-[100px]">
        {post.author.nickname}
      </TableCell>
      <TableCell className="text-center p-2">
        {formatDate(post.createdAt)}
      </TableCell>
      <TableCell className="text-center p-2">{post.viewCount}</TableCell>
    </TableRow>
  );
};
