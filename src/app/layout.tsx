// 전역 레이아웃 파일
import type { Metadata } from 'next';

import '@vapor-ui/core/styles.css';
import { Providers } from '@/app/providers';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants/app';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
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
