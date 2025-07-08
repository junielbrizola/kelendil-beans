'use server';
import React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { fetchOrdersAction } from '@/actions/orders/fetchOrders';

interface OrderListProps {
  userId: string;
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function OrderList({ userId, searchParams }: OrderListProps) {
  const fd = new FormData();
  fd.append('userId', userId);
  fd.append('page', searchParams.page || '1');
  fd.append('pageSize', searchParams.pageSize || '10');

  const { success, data, error } = await fetchOrdersAction(fd);

  if (!success || !data) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
        {error?.message || 'Erro ao carregar pedidos.'}
      </Typography>
    );
  }

  const { orders, totalCount, page, pageSize } = data;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Total (R$)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Detalhes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o.id}>
              <TableCell>{o.id.slice(0, 8)}</TableCell>
              <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{o.totalAmount.toFixed(2)}</TableCell>
              <TableCell>{o.status}</TableCell>
              <TableCell>
                <Link href={`/orders/${o.id}`}>Ver</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={() => {}}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[pageSize]}
      />
    </>
  );
}
