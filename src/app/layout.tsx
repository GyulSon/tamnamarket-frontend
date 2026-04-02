// 전역 레이아웃 파일
import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants/app';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: '/manifest.webmanifest',
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <div className="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
