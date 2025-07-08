'use client';
import React from 'react';
import Container from '@mui/material/Container';
import VariantTableSkeleton from '@/components/ui/Skeleton/VariantTableSkeleton';

export default function AdminVariantsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <VariantTableSkeleton />
    </Container>
  );
}
