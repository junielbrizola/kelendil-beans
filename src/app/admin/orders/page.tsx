// src/app/admin/orders/page.tsx
export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AdminOrderList from '@/components/admin/orders/AdminOrderList';
import AdminOrderListSkeleton from '@/components/ui/Skeleton/AdminOrderListSkeleton';
import { fetchOrdersAction } from '@/actions/orders/fetchOrders';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
  searchParams: { status?: string; page?: string };
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const fd = new FormData();
  if (searchParams.status) fd.append('status', searchParams.status);
  if (searchParams.page)   fd.append('page', searchParams.page);

  const ordersResult = await fetchOrdersAction(fd);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestão de Pedidos</Typography>
        <Box display="flex" gap={2}>
          <TextField
            select
            size="small"
            defaultValue={searchParams.status || ''}
            onChange={e => {
              const url = new URL(window.location.href);
              if (e.target.value) url.searchParams.set('status', e.target.value);
              else url.searchParams.delete('status');
              url.searchParams.delete('page');
              window.location.assign(url.toString());
            }}
            sx={{ width: 160 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="PENDING">PENDENTES</MenuItem>
            <MenuItem value="CONFIRMED">CONFIRMADOS</MenuItem>
            <MenuItem value="SHIPPED">ENVIADOS</MenuItem>
            <MenuItem value="DELIVERED">ENTREGUES</MenuItem>
            <MenuItem value="CANCELLED">CANCELADOS</MenuItem>
          </TextField>
          <Button variant="contained" href="/admin">Voltar ao Dashboard</Button>
        </Box>
      </Box>

      <Suspense fallback={<AdminOrderListSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <AdminOrderList ordersResult={ordersResult} />
      </Suspense>
    </Container>
  );
}
