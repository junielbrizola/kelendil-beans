// src/app/layout.tsx
import React from 'react';
import { cookies } from 'next/headers';
import ThemeProviderRegistry from './theme-provider';
import Layout from '@/components/common/Layout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // SSR: lê preferência de tema do cookie
  const cookieStore = await cookies();
  const themeCookie = (cookieStore.get('themeMode')?.value as 'light' | 'dark') || 'light';

  return (
    <html lang="pt-BR">
      <head />
      <body>
        <ThemeProviderRegistry initialMode={themeCookie}>
          <Layout>
            {children}
          </Layout>
        </ThemeProviderRegistry>
      </body>
    </html>
  );
}
