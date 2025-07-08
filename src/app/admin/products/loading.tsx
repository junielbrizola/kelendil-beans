// src/app/admin/products/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import AdminProductListSkeleton from '@/components/ui/Skeleton/AdminProductListSkeleton';

export default function AdminProductsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminProductListSkeleton />
    </Container>
  );
}
