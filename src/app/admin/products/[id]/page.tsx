export const dynamic    = 'auto';
export const revalidate = 0; // sempre dinâmico em edição

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProductEditForm from '@/components/admin/products/ProductEditForm';
import VariantsSection from '@/components/admin/products/VariantsSection';
import ProductEditSkeleton from '@/components/ui/Skeleton/ProductEditSkeleton';
import VariantsSkeleton from '@/components/ui/Skeleton/VariantsSkeleton';

interface Props {
  params: { id: string };
}

export default async function AdminEditProductPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Editar Produto</Typography>
        <Button variant="outlined" component={Link} href="/admin/products">
          Voltar
        </Button>
      </Box>

      <Suspense fallback={<ProductEditSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <ProductEditForm productId={params.id} />
      </Suspense>

      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Variantes
        </Typography>
        <Suspense fallback={<VariantsSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <VariantsSection productId={params.id} />
        </Suspense>
      </Box>
    </Container>
  );
}
