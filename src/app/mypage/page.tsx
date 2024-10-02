import { ActivityTabs } from '@/wigets/activity-tabs';
import { ProfileCard } from '@/wigets/profile-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핏미업 - 마이페이지',
  description: '회원님의 마이페이지 입니다.',
};

export default function MyPage() {
  return (
    <main className="flex flex-col space-y-4">
      <ProfileCard />
      <ActivityTabs />
    </main>
  );
}
