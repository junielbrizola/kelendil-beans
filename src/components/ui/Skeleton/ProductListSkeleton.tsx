// src/components/ui/Skeleton/ProductListSkeleton.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function ProductListSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Skeleton variant="rectangular" height={180} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="rectangular" height={36} width="50%" sx={{ mt: 1 }} />
        </Grid>
      ))}
    </Grid>
  );
}
