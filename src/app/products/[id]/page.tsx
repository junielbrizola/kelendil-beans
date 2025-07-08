// src/app/products/[id]/page.tsx
export const dynamic    = 'auto';
export const revalidate = 30;

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductDetail from '@/components/products/ProductDetail';
import ProductDetailSkeleton from '@/components/ui/Skeleton/ProductDetailSkeleton';
import { fetchProductByIdAction } from '@/actions/products/fetchProductById';

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const fd = new FormData();
  fd.append('productId', params.id);
  const productResult = await fetchProductByIdAction(fd);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Produto
      </Typography>
      <Suspense fallback={<ProductDetailSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <ProductDetail productResult={productResult} />
      </Suspense>
    </Container>
  );
}
