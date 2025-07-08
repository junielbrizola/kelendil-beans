// src/app/checkout/loading.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import CheckoutSkeleton from '@/components/ui/Skeleton/CheckoutSkeleton';

export default function CheckoutLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CheckoutSkeleton />
    </Container>
  );
}
