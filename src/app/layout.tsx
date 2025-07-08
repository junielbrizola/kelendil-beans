// src/app/layout.tsx
import React from 'react';
import { cookies } from 'next/headers';
import Layout from '@/components/common/Layout';
import ThemeProviderRegistry from './theme-provider';
import { headingFont, bodyFont } from '@/lib/fonts';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const themeModeCookie = (cookieStore.get('themeMode')?.value as 'light' | 'dark') || 'light';

  return (
    <html lang="pt-BR" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head />
      <body>
        <ThemeProviderRegistry initialMode={themeModeCookie}>
          <Layout>
            {children}
          </Layout>
        </ThemeProviderRegistry>
      </body>
    </html>
  );
}
