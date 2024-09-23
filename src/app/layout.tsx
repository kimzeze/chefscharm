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
      <body className="flex min-h-screen flex-col text-base antialiased">{children}</body>
    </html>
  );
}
