'use client';
import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function CheckoutLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={36} width="40%" />
      </Box>
      <Skeleton variant="text" width="40%" height={24} sx={{ mt: 4 }} />
      <Skeleton variant="rectangular" height={48} width="50%" sx={{ mt: 2 }} />
    </Container>
  );
}
