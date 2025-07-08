// src/app/orders/pending/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export default function OrderPendingLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
      <Skeleton variant="text" width="60%" height={48} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 4 }} />
      <Skeleton variant="rectangular" width={200} height={40} sx={{ mx: 'auto' }} />
    </Container>
  );
}
