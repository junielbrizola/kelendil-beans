// src/app/orders/[id]/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import OrderDetailsSkeleton from '@/components/ui/Skeleton/OrderDetailsSkeleton';

export default function OrderDetailLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <OrderDetailsSkeleton />
    </Container>
  );
}
