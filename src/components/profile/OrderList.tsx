// src/components/profile/OrderList.tsx
'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ActionResult } from '@/actions/types';

type OrderSummary = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

interface OrderListProps {
  ordersResult: ActionResult<{
    orders: OrderSummary[];
    totalCount: number;
    page: number;
    pageSize: number;
  }>;
}

export default function OrderList({ ordersResult }: OrderListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number(searchParams.get('page') || ordersResult.success ? ordersResult.data.page : 1)
  );

  if (!ordersResult.success) {
    return <Typography color="error">{ordersResult.error.message}</Typography>;
  }

  const { orders, totalCount, pageSize } = ordersResult.data;
  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', value.toString());
    router.push(`/profile?${params.toString()}`);
    setPage(value);
  };

  if (orders.length === 0) {
    return <Typography>Você ainda não fez nenhum pedido.</Typography>;
  }

  return (
    <Box>
      <List>
        {orders.map(o => (
          <React.Fragment key={o.id}>
            <ListItem
              secondaryAction={
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => router.push(`/orders/${o.id}`)}
                >
                  Ver detalhes
                </Button>
              }
            >
              <ListItemText
                primary={`Pedido #${o.id}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Data: {new Date(o.createdAt).toLocaleDateString()}
                    </Typography>
                    {' — '}
                    <Typography component="span" variant="body2">
                      Status: {o.status}
                    </Typography>
                    {' — '}
                    <Typography component="span" variant="body2">
                      Total: R$ {o.totalAmount.toFixed(2)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            size="large"
          />
        </Box>
      )}
    </Box>
  );
}
