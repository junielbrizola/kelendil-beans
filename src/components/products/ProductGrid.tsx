// src/components/products/ProductGrid.tsx
'use client';
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';

export interface ProductData {
  id: string;
  name: string;
  description?: string;
  type: 'COFFEE' | 'COCOA';
  imageUrl?: string;
}

interface ProductGridProps {
  products: ProductData[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export default function ProductGrid({
  products,
  totalCount,
  page,
  pageSize
}: ProductGridProps) {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea component={Link} href={`/products/${p.id}`}>
                {p.imageUrl ? (
                  <Box sx={{ position: 'relative', width: '100%', height: 180 }}>
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={false}
                    />
                  </Box>
                ) : (
                  <CardMedia
                    component="div"
                    sx={{ height: 180, bgcolor: 'grey.200' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" noWrap gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {p.description || '—'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            size="large"
            onChange={(e, value) => {
              const url = new URL(window.location.href);
              url.searchParams.set('page', value.toString());
              window.location.assign(url.toString());
            }}
          />
        </Box>
      )}
    </>
  );
}
