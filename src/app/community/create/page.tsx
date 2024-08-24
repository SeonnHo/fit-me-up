import { PostForm } from '@/wigets/post-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핏미업 - 게시물 생성',
  description:
    '핏미업 게시물 생성 페이지입니다. 핏미업에서 여러 사람들과 패션에 관해 정보도 나누고 소통해요!',
};

export default function CommunityCreatePage() {
  return (
    <main className="flex flex-col w-full max-w-screen-sm">
      <PostForm />
    </main>
  );
}
