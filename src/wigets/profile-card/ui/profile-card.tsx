'use client';

import { useUserQuery } from '@/entities/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ProfileCard = () => {
  const { data: session, status } = useSession();
  const { user, isLoading, isFetching } = useUserQuery(session?.user.id!);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.back();
    }
  }, [status, router]);

  if (status === 'loading' || isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-md:w-screen max-md:px-2">
      <Card className="md:w-[600px] w-full max-md:border-none max-md:shadow-none">
        <CardContent className="p-6 max-md:p-3 flex flex-col items-start justify-center space-y-4">
          <div className="w-full flex justify-evenly items-center">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-20 h-20 max-md:w-14 max-md:h-14">
                <AvatarImage src={session?.user.image} alt="프로필 이미지" />
                <AvatarFallback>
                  {session?.user.nickname?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold max-md:text-sm">
                {session?.user.nickname}
              </h3>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <p className="text-sm text-muted-foreground max-md:text-xs">
                {user?.posts.length}
              </p>
              <p className="text-sm font-semibold max-md:text-xs">게시물</p>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <p className="text-sm text-muted-foreground max-md:text-xs">
                {user?.likePosts.length}
              </p>
              <p className="text-sm font-semibold max-md:text-xs">
                좋아하는 게시물
              </p>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <p className="text-sm text-muted-foreground max-md:text-xs">
                {user?.comments.length}
              </p>
              <p className="text-sm font-semibold max-md:text-xs">남긴 댓글</p>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full font-semibold max-md:text-sm"
            onClick={() => router.push('/mypage/edit')}
          >
            프로필 편집
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
