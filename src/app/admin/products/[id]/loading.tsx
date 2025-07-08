'use client';
import React from 'react';
import Container from '@mui/material/Container';
import ProductEditSkeleton from '@/components/ui/Skeleton/ProductEditSkeleton';
import VariantsSkeleton from '@/components/ui/Skeleton/VariantsSkeleton';
import Box from '@mui/material/Box';

export default function AdminEditProductLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProductEditSkeleton />
      <Box mt={6}>
        <VariantsSkeleton />
      </Box>
    </Container>
  );
}
