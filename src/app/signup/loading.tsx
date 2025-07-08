// src/app/signup/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SignupLoading() {
  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Skeleton variant="text" height={40} width="60%" sx={{ mx: 'auto', mb: 2 }} />
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={36} width="40%" sx={{ mx: 'auto' }} />
      </Box>
    </Container>
  );
}
