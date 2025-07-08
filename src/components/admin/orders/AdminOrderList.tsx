// src/components/admin/orders/AdminOrderList.tsx
'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ActionResult } from '@/actions/types';

type OrderSummary = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

interface Props {
  ordersResult: ActionResult<{
    orders: OrderSummary[];
    totalCount: number;
    page: number;
    pageSize: number;
  }>;
}

export default function AdminOrderList({ ordersResult }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number(searchParams.get('page') || (ordersResult.success ? ordersResult.data.page : 1))
  );

  if (!ordersResult.success) {
    return <Typography color="error">{ordersResult.error.message}</Typography>;
  }

  const { orders, totalCount, pageSize } = ordersResult.data;
  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', value.toString());
    router.push(`/admin/orders?${params.toString()}`);
    setPage(value);
  };

  if (orders.length === 0) {
    return <Typography>Nenhum pedido encontrado.</Typography>;
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID do Pedido</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(o => (
              <TableRow key={o.id} hover>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.userId}</TableCell>
                <TableCell align="right">R$ {o.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{o.status}</TableCell>
                <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/admin/orders/${o.id}`)}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} size="large" />
        </Box>
      )}
    </Box>
  );
}
