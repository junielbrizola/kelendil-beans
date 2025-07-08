'use client';
import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function OrderDetailLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Skeleton variant="rectangular" height={30} />
        <Skeleton variant="rectangular" height={30} />
        <Skeleton variant="rectangular" height={24} width="20%" />
        <Skeleton variant="rectangular" height={36} width="30%" />
      </Box>
    </Container>
  );
}
