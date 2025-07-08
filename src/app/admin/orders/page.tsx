// src/app/admin/orders/page.tsx
export const dynamic = 'auto';

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import AdminOrderList from '@/components/admin/OrderList';
import ProductSkeleton from '@/components/ui/Skeleton/ProductSkeleton'; // reused skeleton for table items
import Skeleton from '@mui/material/Skeleton';

export default function AdminOrdersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Pedidos</Typography>
      </Box>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 1 }} />
            ))}
          </Box>
        }
      >
        {/* @ts-expect-error Server Component */}
        <AdminOrderList />
      </Suspense>
    </Container>
  );
}
