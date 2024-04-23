import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
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
