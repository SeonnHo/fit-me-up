'use client';

import { TableCell, TableRow } from '@/shared/ui/table';
import { Prisma } from '@prisma/client';
import { FaImage } from 'react-icons/fa6';
import { format, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { usePathname, useRouter } from 'next/navigation';
import { Separator } from '@/shared/ui/separator';

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
  isTablet: boolean;
}

const formatDate = (date: Date) => {
  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: ko });
  } else {
    return format(date, 'yyyy. MM. dd.', { locale: ko });
  }
};

export const PostTableRow = ({
  post,
  gender,
  board,
  isTablet,
}: PostsTableRowProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const formatCategoryName = (category: string, pathname: string) => {
    const categoryMap = {
      maleFree: '자유게시판',
      maleInfo: '정보게시판',
      maleQuestion: '질문게시판',
      femaleFree: '자유게시판',
      femaleInfo: '정보게시판',
      femaleQuestion: '질문게시판',
    };

    const genderPrefix =
      pathname === '/community'
        ? category.startsWith('male')
          ? '남성 '
          : '여성 '
        : '';

    return (
      genderPrefix + (categoryMap[category as keyof typeof categoryMap] || '')
    );
  };

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/community/${gender}/${board}/${post.id}`)}
    >
      {isTablet ? (
        <>
          <TableCell className="flex flex-col p-2">
            <div className="flex items-center space-x-2">
              {post.imageUrls.length > 0 && (
                <span className="shrink-0">
                  <FaImage className="w-3 h-3 text-green-700" />
                </span>
              )}
              <span className="line-clamp-1 break-all text-sm">
                {post.title}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {post.author.nickname}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs text-muted-foreground">
                {' '}
                {formatDate(post.createdAt)}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs text-muted-foreground">
                조회 {post.viewCount}
              </span>
              {['/community', '/community/male', '/community/female'].includes(
                pathname
              ) && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-xs text-muted-foreground">
                    {formatCategoryName(post.category, pathname)}
                  </span>
                </>
              )}
            </div>
          </TableCell>
          <TableCell className="text-red-500 p-2">
            &#91;{post._count.comments}&#93;
          </TableCell>
        </>
      ) : (
        <>
          {['/community', '/community/male', '/community/female'].includes(
            pathname
          ) && (
            <TableCell className="text-muted-foreground text-sm p-2 text-nowrap">
              {formatCategoryName(post.category, pathname)}
            </TableCell>
          )}
          <TableCell className="p-2 xl:w-[600px]">
            <div className="flex items-center space-x-1">
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
            </div>
          </TableCell>
          <TableCell className="text-center p-2 w-[100px] text-nowrap">
            {post.author.nickname}
          </TableCell>
          <TableCell className="text-center p-2 text-nowrap">
            {formatDate(post.createdAt)}
          </TableCell>
          <TableCell className="text-center p-2 text-nowrap">
            {post.viewCount}
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
