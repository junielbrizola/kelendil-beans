// src/app/admin/orders/[id]/page.tsx
export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AdminOrderDetails from '@/components/admin/orders/AdminOrderDetails';
import AdminOrderDetailsSkeleton from '@/components/ui/Skeleton/AdminOrderDetailsSkeleton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
  params: { id: string };
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Pedido (Admin)
      </Typography>
      <Suspense fallback={<AdminOrderDetailsSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <AdminOrderDetails orderId={params.id} />
      </Suspense>
    </Container>
  );
}
