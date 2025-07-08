'use client';
import React from 'react';
import Container from '@mui/material/Container';
import CartSummarySkeleton from '@/components/ui/Skeleton/CartSummarySkeleton';

export default function CartLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CartSummarySkeleton />
    </Container>
  );
}
