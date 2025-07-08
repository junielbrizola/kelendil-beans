// src/theme-provider.tsx
'use client';
import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {getTheme } from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';


export default function ThemeProviderRegistry({ initialMode, children }: any) {
  return (
    <AppRouterCacheProvider>
        <ThemeProvider theme={getTheme(initialMode)}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
