// src/app/products/page.tsx
export const dynamic    = 'auto';
export const revalidate = 30;

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ProductList from '@/components/products/ProductList';
import ProductListSkeleton from '@/components/ui/Skeleton/ProductListSkeleton';
import { fetchProductsAction } from '@/actions/products/fetchProducts';

interface Props {
  searchParams: { search?: string; type?: string; page?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const fd = new FormData();
  if (searchParams.search) fd.append('search', searchParams.search);
  if (searchParams.type)   fd.append('type', searchParams.type);
  if (searchParams.page)   fd.append('page', searchParams.page);

  const productsResult = await fetchProductsAction(fd);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        component="form"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}
        action=""
        method="get"
      >
        <TextField
          name="search"
          label="Buscar produtos..."
          defaultValue={searchParams.search || ''}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
        />
        <TextField
          select
          name="type"
          label="Tipo"
          defaultValue={searchParams.type || ''}
          size="small"
          sx={{ width: 160 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="COFFEE">Café</MenuItem>
          <MenuItem value="COCOA">Cacau</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">
          Filtrar
        </Button>
      </Box>

      <Suspense fallback={<ProductListSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <ProductList productsResult={productsResult} />
      </Suspense>
    </Container>
  );
}
