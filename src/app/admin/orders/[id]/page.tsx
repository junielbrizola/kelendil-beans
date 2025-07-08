// src/app/admin/orders/[id]/page.tsx
export const dynamic = 'auto';

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fetchOrderDetailsAction } from '@/actions/orders/fetchOrderDetails';
import OrderDetail from '@/components/orders/OrderDetails';
import OrderSkeleton from '@/components/ui/Skeleton/OrderSkeleton';

interface AdminOrderDetailPageProps {
  params: { id: string };
}

async function ServerOrderDetail({ id }: { id: string }) {
  const formData = new FormData();
  formData.append('orderId', id);
  const result = await fetchOrderDetailsAction(formData);

  if (!result.success || !result.data) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
        {result.error?.message || 'Erro ao carregar detalhes do pedido.'}
      </Typography>
    );
  }

  return <OrderDetail order={result.data} />;
}

export default function AdminOrderDetailPage({ params: { id } }: AdminOrderDetailPageProps) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Detalhes do Pedido
      </Typography>
      <Suspense fallback={<OrderSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <ServerOrderDetail id={id} />
      </Suspense>
    </Container>
  );
}
