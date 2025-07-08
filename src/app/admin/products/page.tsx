// src/app/admin/products/page.tsx
export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AdminProductList from '@/components/admin/products/AdminProductList';
import AdminProductListSkeleton from '@/components/ui/Skeleton/AdminProductListSkeleton';
import { fetchProductsAction } from '@/actions/products/fetchProducts';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const fd = new FormData();
  // opcionalmente paginacao/filtro
  const productsResult = await fetchProductsAction(fd);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestão de Produtos</Typography>
        <Button variant="contained" href="/admin/products/create">
          + Novo Produto
        </Button>
      </Box>
      <Suspense fallback={<AdminProductListSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <AdminProductList productsResult={productsResult} />
      </Suspense>
    </Container>
  );
}
