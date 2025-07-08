'use client';
import React from 'react';
import Container from '@mui/material/Container';
import ProductTableSkeleton from '@/components/ui/Skeleton/ProductTableSkeleton';

export default function AdminProductsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductTableSkeleton />
    </Container>
  );
}
