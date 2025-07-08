// src/app/profile/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import OrderListSkeleton from '@/components/ui/Skeleton/OrderListSkeleton';

export default function ProfileLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <OrderListSkeleton />
    </Container>
  );
}
