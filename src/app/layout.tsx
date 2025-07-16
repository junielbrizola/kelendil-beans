/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react';
import { headingFont, bodyFont } from '@/lib/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { theme } from '@/theme';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  React.useEffect(() => {
    const handleKeyDown = (e: { ctrlKey: any; altKey: any; shiftKey: any; key: string; preventDefault: () => void; }) => {
      console.log({ e })
      if ((e.ctrlKey && e.altKey && e.shiftKey)) {
        console.log({ key: e.key })
        if (e.key === 'A') {
          e.preventDefault();
          router.push('/administrador');
        }
        if (e.key === 'P') {
          e.preventDefault();
          router.push('/administrador/pedidos');
        }
        if (e.key === 'C') {
          e.preventDefault();
          router.push('/administrador/cacaus');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);
  return (
    <html lang="pt-BR" className={`${headingFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head />
      <body>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
      </body>
    </html>
  );
}
