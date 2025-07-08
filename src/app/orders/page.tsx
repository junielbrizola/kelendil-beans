export const dynamic = 'auto';

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OrderList from '@/components/orders/OrderList';
import OrderListSkeleton from '@/components/ui/Skeleton/OrderListSkeleton';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function OrdersPage({ searchParams }: { searchParams: any }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/login?callbackUrl=/orders`);
  const userId = session?.user?.id;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meus Pedidos
      </Typography>
      <Suspense fallback={<OrderListSkeleton />}>
        <OrderList userId={userId} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
