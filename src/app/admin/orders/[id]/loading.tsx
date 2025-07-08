// src/app/admin/orders/[id]/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import OrderSkeleton from '@/components/ui/Skeleton/OrderSkeleton';

export default function AdminOrderDetailLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <OrderSkeleton />
    </Container>
  );
}
