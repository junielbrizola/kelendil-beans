// src/components/common/LoadingSpinner.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
