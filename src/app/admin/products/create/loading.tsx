// src/app/admin/products/create/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import ProductFormSkeleton from '@/components/ui/Skeleton/ProductFormSkeleton';

export default function AdminCreateProductLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <ProductFormSkeleton />
    </Container>
  );
}
