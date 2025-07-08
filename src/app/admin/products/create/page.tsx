// src/app/admin/products/create/page.tsx
export const dynamic    = 'auto';
export const revalidate = 0;

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProductForm from '@/components/admin/products/ProductForm';
import ProductFormSkeleton from '@/components/ui/Skeleton/ProductFormSkeleton';

export default async function AdminCreateProductPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Novo Produto</Typography>
        <Button variant="outlined" component={Link} href="/admin/products">
          Voltar
        </Button>
      </Box>
      <Suspense fallback={<ProductFormSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <ProductForm />
      </Suspense>
    </Container>
  );
}
