// src/app/page.tsx
export const dynamic = 'auto';

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { fetchProductsAction } from '@/actions/products/fetchProducts';
import ProductCard from '@/components/product/ProductCard';
import ProductListSkeleton from '@/components/ui/Skeleton/ProductListSkeleton';
import ProductFilter from '@/components/product/ProductFilter';

interface ProductPageProps {
  searchParams: {
    search?: string;
    type?: string;
    page?: string;
    pageSize?: string;
  };
}

async function ServerProductList({
  search,
  type,
  page,
  pageSize,
}: {
  search?: string;
  type?: string;
  page?: string;
  pageSize?: string;
}) {
  const fd = new FormData();
  if (search) fd.append('search', search);
  if (type) fd.append('type', type);
  fd.append('page', page || '1');
  fd.append('pageSize', pageSize || '10');

  const result = await fetchProductsAction(fd);
  if (!result.success || !result.data) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
        {result.error?.message || 'Erro ao carregar produtos.'}
      </Typography>
    );
  }

  const { products, totalCount, page: pg, pageSize: ps } = result.data;
  const totalPages = Math.ceil(totalCount / ps);

  // Passa totalPages via campo oculto para o filtro ler
  return (
    <>
      <Grid container spacing={3}>
        {products.map(p => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard
              id={p.id}
              name={p.name}
              description={p.description}
              imageUrl={p.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
      <input type="hidden" name="totalPages" value={totalPages} />
    </>
  );
}

export default function HomePage({ searchParams }: ProductPageProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nossos Produtos
      </Typography>
      <ProductFilter />
      <Suspense fallback={<ProductListSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <ServerProductList
          search={searchParams.search}
          type={searchParams.type}
          page={searchParams.page}
          pageSize={searchParams.pageSize}
        />
      </Suspense>
    </Container>
  );
}
