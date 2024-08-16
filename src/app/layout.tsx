import type { Metadata, Viewport } from 'next';
import { Nanum_Gothic, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/shared/header/header';
import AuthProvider from '@/app/_providers/auth-provider';
import { Toaster } from '@/shared/ui/toaster';
import ReactQueryProviders from '@/app/_providers/query-provider';

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
  title: 'Fit Me Up',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumGothic.className} ${roboto.variable}`}>
        <ReactQueryProviders>
          <AuthProvider>
            <Header />
            {children}
            <Toaster />
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
