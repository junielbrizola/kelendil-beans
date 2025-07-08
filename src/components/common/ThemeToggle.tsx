// src/components/common/ThemeToggle.tsx
'use client';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '@/app/theme-provider';

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <Tooltip title={`Alternar para modo ${mode === 'light' ? 'escuro' : 'claro'}`}>
      <IconButton onClick={toggleColorMode} color="inherit" size="large">
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}
