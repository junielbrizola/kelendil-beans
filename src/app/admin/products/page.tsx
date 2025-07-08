export const dynamic = 'auto';

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import ProductTable from '@/components/admin/ProductTable';
import ProductTableSkeleton from '@/components/ui/Skeleton/ProductTableSkeleton';

export default async function AdminProductsPage({ searchParams }: { searchParams: any }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') redirect('/');
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestão de Produtos
      </Typography>
      <Suspense fallback={<ProductTableSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <ProductTable searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
