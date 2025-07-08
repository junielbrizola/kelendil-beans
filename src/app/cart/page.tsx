export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CartList from '@/components/cart/CartList';
import CartListSkeleton from '@/components/ui/Skeleton/CartListSkeleton';
import { fetchCartAction } from '@/actions/cart/fetchCart'; // veja nota abaixo

export default async function CartPage() {
  // Server Action para buscar o carrinho do usuário logado
  const fd = new FormData();
  fd.append('userId', ''); // preencha com ID do usuário autenticado
  const cartResult = await fetchCartAction(fd);

  return (
    <Container maxWidth="md" sx={{ py:4 }}>
      <Typography variant="h4" gutterBottom>
        Seu Carrinho
      </Typography>
      <Suspense fallback={<CartListSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <CartList cartResult={cartResult} />
      </Suspense>
    </Container>
  );
}
