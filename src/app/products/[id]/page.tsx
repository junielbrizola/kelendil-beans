// src/app/products/[id]/page.tsx
export const dynamic = 'auto';

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductDetail from '@/components/products/ProductDetail';
import ProductDetailSkeleton from '@/components/ui/Skeleton/ProductDetailSkeleton';

interface Props { params: { id: string } }

export default function ProductPage({ params: { id } }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Produto
      </Typography>
      <Suspense fallback={<ProductDetailSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <ProductDetail productId={id} />
      </Suspense>
    </Container>
  );
}
