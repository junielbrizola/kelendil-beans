// src/app/admin/orders/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import AdminOrderListSkeleton from '@/components/ui/Skeleton/AdminOrderListSkeleton';

export default function AdminOrdersLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminOrderListSkeleton />
    </Container>
  );
}
