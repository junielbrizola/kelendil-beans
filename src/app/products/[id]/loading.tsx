// src/app/products/[id]/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import ProductDetailSkeleton from '@/components/ui/Skeleton/ProductDetailSkeleton';

export default function ProductDetailLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProductDetailSkeleton />
    </Container>
  );
}
