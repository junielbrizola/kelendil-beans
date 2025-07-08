// src/components/admin/OrderList.tsx
'use server';
import React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchOrdersAction } from '@/actions/orders/fetchOrders';

export default async function AdminOrderList() {
  const formData = new FormData();
  const { success, data, error } = await fetchOrdersAction(formData);

  if (!success || !data) {
    return (
      <Typography color="error">
        {error?.message || 'Erro ao carregar pedidos.'}
      </Typography>
    );
  }

  if (data.orders.length === 0) {
    return <Typography>Nenhum pedido encontrado.</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID do Pedido</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.userId}</TableCell>
            <TableCell>R$ {order.totalAmount.toFixed(2)}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button
                component={Link}
                href={`/admin/orders/${order.id}`}
                size="small"
              >
                Ver
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
);
}
