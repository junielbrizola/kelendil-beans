// src/app/admin/orders/[id]/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import AdminOrderDetailsSkeleton from '@/components/ui/Skeleton/AdminOrderDetailsSkeleton';

export default function AdminOrderDetailLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AdminOrderDetailsSkeleton />
    </Container>
  );
}
