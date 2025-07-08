// src/app/orders/failure/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function OrderFailureLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
      <Skeleton variant="text" width="60%" height={48} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Skeleton variant="rectangular" width={120} height={40} />
        <Skeleton variant="rectangular" width={120} height={40} />
      </Box>
    </Container>
  );
}
