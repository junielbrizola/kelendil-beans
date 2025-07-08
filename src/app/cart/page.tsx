export const dynamic = 'auto';

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CartSummary from '@/components/cart/CartSummary';
import CartSummarySkeleton from '@/components/ui/Skeleton/CartSummarySkeleton';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/login?callbackUrl=/cart`);
  const userId = session.user.id;
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Seu Carrinho
      </Typography>
      <Suspense fallback={<CartSummarySkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CartSummary userId={userId} />
      </Suspense>
    </Container>
  );
}
