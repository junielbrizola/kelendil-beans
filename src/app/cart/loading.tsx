'use client';
import React from 'react';
import Container from '@mui/material/Container';
import CartListSkeleton from '@/components/ui/Skeleton/CartListSkeleton';

export default function CartLoading() {
  return (
    <Container maxWidth="md" sx={{ py:4 }}>
      <CartListSkeleton />
    </Container>
  );
}
