import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';

const nanumGothic = localFont({
  src: [
    {
      path: './fonts/NanumGothic.ttf',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Fit Me Up',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanumGothic.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
