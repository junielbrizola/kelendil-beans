export const dynamic    = 'auto';
export const revalidate = 0;

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutSkeleton from '@/components/ui/Skeleton/CheckoutSkeleton';

export default function CheckoutPage() {
  return (
    <Container maxWidth="sm" sx={{ py:4 }}>
      <Typography variant="h4" gutterBottom>
        Finalizar Compra
      </Typography>
      <Suspense fallback={<CheckoutSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <CheckoutForm />
      </Suspense>
    </Container>
  );
}
