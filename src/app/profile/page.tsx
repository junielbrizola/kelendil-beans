// src/app/profile/page.tsx
export const dynamic   = 'auto';
export const revalidate = 10;  // revalida a cada 10s

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OrderList from '@/components/profile/OrderList';
import OrderListSkeleton from '@/components/ui/Skeleton/OrderListSkeleton';
import { fetchOrdersAction } from '@/actions/orders/fetchOrders';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/profile`);
  }

  const fd = new FormData();
  fd.append('userId', session.user.id);
  // opcional: status, page, pageSize via searchParams
  const ordersResult = await fetchOrdersAction(fd);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meus Pedidos
      </Typography>
      <Suspense fallback={<OrderListSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <OrderList ordersResult={ordersResult} />
      </Suspense>
    </Container>
  );
}
