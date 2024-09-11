import type { Metadata, Viewport } from 'next';
import { Nanum_Gothic, Roboto } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/app/_providers/auth-provider';
import { Toaster } from '@/shared/ui/toaster';
import QueryProviders from '@/app/_providers/query-provider';
import dynamic from 'next/dynamic';

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  variable: '--Roboto',
});

export const metadata: Metadata = {
  title: '핏미업',
  description:
    '핏미업에서 패션에 관한 다양한 정보들을 나누거나 자신의 패션을 뽐내보세요.',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
};

const Header = dynamic(
  () => import('@/wigets/header').then((mod) => mod.Header),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumGothic.className} ${roboto.variable}`}>
        <QueryProviders>
          <AuthProvider>
            <Header />
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
