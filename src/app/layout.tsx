import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';

import './globals.css';

export const metadata: Metadata = {
  title: '흑백 요리사 리뷰 작성기',
  description: '요리에 대한 심사를 안성재, 백종원 쉐프의 말투로 변환하여 평가합니다.',
  verification: {
    google: 'Lv6mEVE9dzaGiao-qDkBRxkRSI35vz8-Iv9gvRjG_oQ',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-black text-base antialiased">
        <div className="mx-auto flex w-full max-w-[480px] flex-grow flex-col px-4">
          <main className="flex flex-grow items-center justify-center">
            <h1 className="sr-only">흑백요리사 리뷰 작성기</h1>
            {children}
          </main>
          <div id="portal"></div>
          <Footer />
        </div>
      </body>
      <Analytics />
    </html>
  );
}
