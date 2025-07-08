// src/app/orders/success/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function OrderSuccessLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Skeleton variant="text" width="60%" height={48} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </Box>
    </Container>
  );
}
