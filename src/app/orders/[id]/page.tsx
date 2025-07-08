// src/app/orders/[id]/page.tsx
export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OrderDetails from '@/components/orders/OrderDetails';
import OrderDetailsSkeleton from '@/components/ui/Skeleton/OrderDetailsSkeleton';
import { fetchOrderDetailsAction } from '@/actions/orders/fetchOrderDetails';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
  params: { id: string };
}

export default async function OrderDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/orders/${params.id}`);
  }

  const formData = new FormData();
  formData.append('orderId', params.id);
  const orderResult = await fetchOrderDetailsAction(formData);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Pedido
      </Typography>
      <Suspense fallback={<OrderDetailsSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <OrderDetails orderResult={orderResult} />
      </Suspense>
    </Container>
  );
}
