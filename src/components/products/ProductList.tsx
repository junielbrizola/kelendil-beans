// src/components/products/ProductList.tsx
'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import type { ActionResult } from '@/actions/types';

type ProductData = {
  id: string;
  name: string;
  description?: string;
  type: 'COFFEE' | 'COCOA';
  imageUrl?: string;
};

interface Props {
  productsResult: ActionResult<{
    products: ProductData[];
    totalCount: number;
    page: number;
    pageSize: number;
  }>;
}

export default function ProductList({ productsResult }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [page, setPage] = useState(
    productsResult.success ? productsResult.data.page : 1
  );

  if (!productsResult.success) {
    return <Typography color="error">{productsResult.error.message}</Typography>;
  }

  const { products, totalCount, pageSize } = productsResult.data;
  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const query = new URLSearchParams(Array.from(params.entries()));
    query.set('page', value.toString());
    router.push(`/products?${query.toString()}`);
    setPage(value);
  };

  if (products.length === 0) {
    return <Typography>Nenhum produto encontrado.</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={4}>
        {products.map((p, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardActionArea onClick={() => router.push(`/products/${p.id}`)}>
                {p.imageUrl ? (
                  <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      style={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                      priority={idx < 4}
                    />
                  </Box>
                ) : (
                  <Box sx={{ height: 200, bgcolor: 'grey.200' }} />
                )}
                <CardContent>
                  <Typography variant="h6" noWrap gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {p.description || '—'}
                  </Typography>
                  <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button size="small">Ver Detalhes</Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} size="large" />
        </Box>
      )}
    </Box>
  );
}
