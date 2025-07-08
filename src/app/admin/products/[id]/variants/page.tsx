export const dynamic = 'auto';

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';
import VariantTable from '@/components/admin/VariantTable';
import VariantTableSkeleton from '@/components/ui/Skeleton/VariantTableSkeleton';

interface VariantsPageProps {
  params: { id: string };
  searchParams: { page?: string; pageSize?: string };
}

export default async function AdminVariantsPage({ params: { id }, searchParams }: VariantsPageProps) {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== 'ADMIN') redirect('/');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Variantes do Produto
      </Typography>
      <Suspense fallback={<VariantTableSkeleton />}>
        <VariantTable productId={id} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
