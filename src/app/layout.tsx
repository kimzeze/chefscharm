import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '안성재 쉐프 말투 변환기',
  description: '안성재 쉐프의 말투로 변환하여 보여주는 웹사이트입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-black text-base antialiased">
        <div className="mx-auto w-full max-w-[480px]">
          <main className="flex-grow">
            <h1 className="sr-only">흑백요리사 리뷰 작성기</h1>
            {children}
          </main>
          <div id="portal"></div>
        </div>
      </body>
    </html>
  );
}
