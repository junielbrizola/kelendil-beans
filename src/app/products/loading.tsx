// src/app/products/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import ProductListSkeleton from '@/components/ui/Skeleton/ProductListSkeleton';

export default function ProductsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductListSkeleton />
    </Container>
  );
}
