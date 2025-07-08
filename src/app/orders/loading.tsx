'use client';
import React from 'react';
import Container from '@mui/material/Container';
import OrderListSkeleton from '@/components/ui/Skeleton/OrderListSkeleton';

export default function OrdersLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <OrderListSkeleton />
    </Container>
  );
}
